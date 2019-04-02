import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import {getRandomDogs, getBreedImage} from './utils/getDogs';
import {Card} from './CardGrid';
import {random, cloneDeep} from 'lodash';

const DOGS_TO_DISPLAY = 6;

const loadDog = async (breed) => {
  const image = await getBreedImage(breed);
  return {breed, image};
}

const App = () => {
  const [currentDoggies, setCurrentDoggies] = useState([]);
  const [correctDoggieIndex, setCorrectDoggieIndex] = useState(0);
  const [dogsSelected, setDogsSelected] = useState(new Set());

  const resetSelectedDogs = () => {
    setDogsSelected(new Set());
  };

  const loadAllDogs = async () => {
    resetSelectedDogs();
    const randomDogs = await getRandomDogs(DOGS_TO_DISPLAY);
    Promise.all(
      randomDogs.map(breed => loadDog(breed))
    ).then((dogs) => {
      setCurrentDoggies(dogs);
      setCorrectDoggieIndex(random(DOGS_TO_DISPLAY - 1));
    });
  }

  useEffect(() => {
    loadAllDogs();
  }, []);

  const addSelectedDog = (dog) => {
    const dogsSelectedClone = cloneDeep(dogsSelected);
    dogsSelectedClone.add(dog);
    setDogsSelected(dogsSelectedClone);
  };

  const handleCardClick = (breed) => {
    const correctBreed = currentDoggies[correctDoggieIndex].breed;
    const isCorrectGuess = breed === correctBreed;
    addSelectedDog(breed);

    if (isCorrectGuess) {
      setTimeout(() => {
        loadAllDogs();
       }, 450);
    }
  }

  const correctDoggie = currentDoggies[correctDoggieIndex];

  return (
    <div className="App">
      <header className="Header-Title-Container">
        <h1 className="Header-Title">Doggie Name Game!</h1>
      </header>
      <section className="Space"/>
      {correctDoggie && (
        <Fragment>
          <div>{`Which dog is a ${correctDoggie.breed}?`}</div>
          <div className="Grid">
            {currentDoggies.map(
              (doggie) => (
                <Card
                  key={doggie.breed}
                  doggie={doggie}
                  handleClick={() => {handleCardClick(doggie.breed)}}
                  correctDoggie={correctDoggie}
                  isSelected={dogsSelected.has(doggie.breed)}
                />
              )
            )}
          </div>
        </Fragment>
        )
      }
    </div>
  );
}

export default App;

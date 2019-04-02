import {keys, once, random} from 'lodash';

const getAllBreedsJson = async () => {
  const breeds = await fetch('/api/breeds/list/all');
  const breedsJson = await breeds.json();

  if (breedsJson.status !== "success") {
    return null;
  }
  return keys(breedsJson.message); // list of all the breeds
}

const getAllBreeds = once(getAllBreedsJson);

export const getUniqueRandomIndex = (maxNumber, usedNumbers) => {
  let randomIndex = random(maxNumber);
  while (usedNumbers.indexOf(randomIndex) > -1) {
    randomIndex = random(maxNumber);
  }
  return randomIndex;
};

export const getRandomDogs = async (numDogs) => {
  const breeds = await getAllBreeds();
  const randomDogs = [];
  const usedNumbers = [];

  for (let dogIndex = 0; dogIndex < numDogs; dogIndex++) {
    const randomIndex = getUniqueRandomIndex(breeds.length - 1, usedNumbers);
    usedNumbers.push(randomIndex);
    randomDogs.push(breeds[randomIndex]);
  }

  return randomDogs;
};

export const getBreedImage = async (breed) => {
  const breedImage = await fetch(`/api/breed/${breed}/images/random`);
  const breedImageJson = await breedImage.json();
  return breedImageJson.message;
}
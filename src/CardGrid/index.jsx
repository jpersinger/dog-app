import React from 'react';

export const Card = ({
  doggie,
  handleClick,
  correctDoggie,
  isSelected
}) => {

  const cssString = (
    (isSelected && correctDoggie.breed === doggie.breed)? 'overlay Yes' :
    (isSelected && correctDoggie.breed !== doggie.breed)? 'overlay No'  :
    ''
  );

  return (
    <div className="Grid-card" onClick={handleClick}>
      {isSelected ? <p className="Auto">{doggie.breed}</p> : <img src={doggie.image} alt={doggie.breed}></img>}
      <div className={cssString}/>
    </div>
  );
}
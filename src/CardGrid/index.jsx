import React from 'react';

export const Card = ({
  doggie,
  handleClick,
  correctDoggie,
  isSelected
}) => {
  const cssString = !isSelected ?
    '' :
    correctDoggie.breed === doggie.breed ?
      'image__dog--correct' :
      'image__dog--incorrect';

  return (
    <div className="grid__card" onClick={handleClick}>
      <img className={`image__dog ${cssString}`} src={doggie.image} alt={doggie.breed}></img>
      {isSelected && <div className="grid__card-overlay">{doggie.breed}</div>}
    </div>
  );
}
import React from "react";

function Pet({ pet, onAdoptPet }) {
  const { gender, name, type, age, weight, id, isAdopted } = pet;
  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {/*'♀' OR '♂' */}
          {gender === 'male' ? '♂' : '♀'}
          {name}
        </span>
        <div className="meta">
          <span className="date">{type}</span>
        </div>
        <div className="description">
          <p>Age: {age}</p>
          <p>Weight: {weight}</p>
        </div>
      </div>
      <div className="extra content">
        {!isAdopted ? <button className="ui primary button" onClick={() => onAdoptPet(id)}>Adopt pet</button> : <button className="ui disabled button">Already adopted</button>}
      </div>
    </div>
  );
}

export default Pet;
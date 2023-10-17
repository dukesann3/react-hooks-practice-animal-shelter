import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  return (
    <div className="ui cards">
      {
        !pets ? <h2>Loading...</h2> : pets.map((pet) => {
          return <Pet pet={pet} key={pet.id} onAdoptPet={onAdoptPet}/>
        })
      }
    </div>
  )
}

export default PetBrowser;
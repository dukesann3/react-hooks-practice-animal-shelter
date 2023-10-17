import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]); //pets data doesn't change here...
  const [filters, setFilters] = useState({ type: "all" });

  const fetchAPI = 'http://localhost:3001/pets';

  useEffect(() => {
    fetch(fetchAPI)
      .then(response => response.json())
      .then((data) => {
        setPets(data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error('API could not be reached');
      })
  }, []);

  function onFindPetsClick() {
    //changes filter value when clicked...
    getPetsBasedOnFilter(filters);
  }

  function getPetsBasedOnFilter(param) {
    const fetchUrlWithParams = param === 'all' ? fetchAPI : fetchAPI + `?type=${param}`;
    fetch(fetchUrlWithParams)
      .then(response => response.json())
      .then(data => setPets(data));
  }

  function onChangeType(e) {
    setFilters(e.target.value);
  }

  //sets isAdopted for pet to 'true'
  function onAdoptPet(id){
    const patchRequestUrl = fetchAPI + `/${id}`;
    fetch(patchRequestUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isAdopted: true
      })
    })
    .then(response => response.json())
    .then(data => setPets(pets.map((pet) => {
      if(pet.id === id){
        console.log(data);
        return data;
      }
      return pet;
    })))
    .catch((error) => {
      console.log(error);
      throw new Error('Patch Request Failed');
    })
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
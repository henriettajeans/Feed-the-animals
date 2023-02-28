import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Animals } from './components/animals/animals';
import { Nav } from './components/nav/nav';
import { allAnimals } from './models/classAnimals';
import { IAnimal } from './models/IAnimal';

export type AnimalContext = {
  animals: allAnimals[];
  showAnimal(p: IAnimal): void;
};

function App() {
  const [animals, setAnimals] = useState<allAnimals[]>([]);

  const showAnimal = (animal: IAnimal) => {
    setAnimals([...animals, new allAnimals(animal, animal.id)]);
  };

  return (
    <div className="App">
      <Nav/>
      <Outlet context= {{ showAnimal }}></Outlet>
    </div>
  );
}

export default App;

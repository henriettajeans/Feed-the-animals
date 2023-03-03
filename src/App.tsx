import React, { useEffect, useState } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { IAnimalDetails } from './models/IAnimalDetails';
import { getAnimals } from './services/getZooAnimals';
import { Nav } from './components/nav/nav';

export interface IZooContext {
  animals: IAnimalDetails;
  animal: IAnimalDetails[];
  updateFeedTime(animal: IAnimalDetails):void;
}
function App() {
  const [animals, setAnimals] = useState<IAnimalDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(()=>{
    const getTheZoo = async () => {
      let animals = await getAnimals();
      setAnimals(animals);
      setIsLoading(true);
    }
    let dataFromLS = localStorage.getItem("animals");
    if(dataFromLS && !isLoading){
      setAnimals(JSON.parse(dataFromLS));
      setIsLoading(true);
      return;
    }
    else {
      if(!isLoading)
      getTheZoo();
    }
    localStorage.setItem("animals", JSON.stringify(animals));
  })

  const updateFeedTime = (animal:IAnimalDetails) => {
    let date = new Date();
    let curTime = date.getHours()+":"+date.getMinutes();
    let updatedList = animals.map((updated)=>animal.id===updated.id ? {...updated, lastFed: curTime, isFed:true}: updated);
    setAnimals(updatedList);
  }
  return (
  <>
      <div className="main">
        <Nav/>
          <Outlet context = {{animals, updateFeedTime}} />
      </div>
  </>
  )
}

export default App;

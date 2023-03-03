import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { IZooContext } from "../../App";
import { IAnimalDetails } from "../../models/IAnimalDetails";
import { getAnimals } from "../../services/getZooAnimals";
import { saveToLS } from "../../services/localStorage";

export const AnimalDetails =()=>{
    const [isFed, setIsFed] = useState(false);
  const [fedTime, setFedTime] = useState<Date | null>(null);
  const { id } = useParams();
        const { animals, updateFeedTime } = useOutletContext<IZooContext>();
        const [animal, setAnimals] = useState();

  useEffect(() => {
    const storedTime = localStorage.getItem(animals.id + animals.lastFed); // TODO: Same ID all the time now
    if (storedTime === null) {
      // Animal has never been fed
    } else {
      checkIfNeedsFood(storedTime);
    }
  }, []);

  const AnimalDataLoad =()=>{
    const [animals, setAnimals] = useState<IAnimalDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(()=>{
    const getTheZoo = async () => {
      let animalAPI = await getAnimals();
      setAnimals(animalAPI);
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
}

  const rightNow = new Date();
    function checkIfNeedsFood (lastFed: string) {
        const lastFedDate = new Date(lastFed);
    
            
        }
        const handleClick = (animal:IAnimalDetails) => {

            let loggedTime : any = window.localStorage.setItem(animal?.id!, JSON.stringify(rightNow));

            if (loggedTime.getHours() + 3 < rightNow.getHours()) {
            setIsFed(false);
            } else {
            setIsFed(true);
            }

            let curTime = rightNow.getHours()+":"+rightNow.getMinutes();
            updateFeedTime(animal);
            setIsFed(true);

            
            let updatedList = animal.map((updated: any)=>animal.id===updated.id ? {...updated, lastFed: curTime, isFed:true}: updated);
            setAnimals(updatedList);
            saveToLS(loggedTime);
            // localStorage.setItem(animals.lastFed, animals.id + new Date().toString()); 
            console.log("checking ls saving", updatedList)
        
                } 
        let html = animals.map((animal:IAnimalDetails) => {
                if(id==animal.id){
                    return (
                        <div className="" key={animal.id}>
                            <div className="">
                                <h3>Välkommen in till {animal.name}</h3>
                                <span>{animal.name} blev senast matad {animal.lastFed}</span>
                                
                            </div>
                            <div className="">
                                <img src={animal.imageUrl} alt={animal.name} className="component__img"/>
                                {animal.isFed ? 
                                <button className="notHungry" 
                                // disabled ={animal.isFed} 
                                onClick={()=>{handleClick(animal)}}>Djuret är mätt</button>:
                                <button className="isHungry"  onClick={()=>{handleClick(animal)}}>Mata djuret</button>}
                            </div>
                        </div>
                    )
                }
            })
        return (<>
            <article>
                                {html}
            </article>

        </>)
    }
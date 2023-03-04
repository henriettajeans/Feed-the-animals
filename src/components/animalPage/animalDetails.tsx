import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { IZooContext } from "../../App";
import { IAnimalDetails } from "../../models/IAnimalDetails";
import { getAnimals } from "../../services/getZooAnimals";

export const AnimalDetails = () => {
  const [isFed, setIsFed] = useState(false);
  const [fedTime, setFedTime] = useState("");
  const { id } = useParams();
  const { animals, updateFeedTime } = useOutletContext<IZooContext>();
  const [animal, setAnimals] = useState();

  useEffect(() => {
    const storedTime = localStorage.getItem(String(id)); // TODO: Same ID all the time now

    if (storedTime === null) {
      setFedTime("Djuret har aldrig matats")
    } else {
      const ts = Date.parse(storedTime);
      if (isNaN(ts)) {
        setFedTime("Djuret har aldrig matats")
        return;
      }
      checkIfNeedsFood(storedTime);
    }
  }, []);

  function checkIfNeedsFood(lastFed: string) {

    const lastFedDate = new Date(lastFed);
    console.log(lastFedDate);
    const rightNow = new Date();
    setFedTime(lastFedDate.getHours() + ":" + lastFedDate.getMinutes());

    const timeDiffInMs = rightNow.getTime() - lastFedDate.getTime();
    const timeDiffInSeconds = timeDiffInMs / 1000;
    const timeDiffInMinutes = timeDiffInSeconds / 60;
    const timeDiffInHours = timeDiffInMinutes / 60;

    if (timeDiffInHours > 3) {
      setIsFed(false);
    } else {
      setIsFed(true);
    }

  }
  const handleClick = (animal: IAnimalDetails) => {
    const rightNow = new Date();
    window.localStorage.setItem(`${id}`, rightNow.toString());
    setIsFed(true);
    let curTime = rightNow.getHours() + ":" + rightNow.getMinutes();
    setFedTime(curTime);
    updateFeedTime(animal);


  }
  let html = animals.map((animal: IAnimalDetails) => {
    if (id == animal.id) {
      return (
        <div className="" key={animal.id}>
          <div className="">
            <h3>Välkommen in till {animal.name}</h3>
            <span>{animal.name} blev senast matad {fedTime}</span>

          </div>
          <div className="">
            <img src={animal.imageUrl} alt={animal.name} className="component__img" />
            {animal.isFed ?
              <button className="notHungry"
                disabled={isFed}
                onClick={() => { handleClick(animal) }}>Djuret är mätt</button> :
              <button className="isHungry" onClick={() => { handleClick(animal) }}>Mata djuret</button>}
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
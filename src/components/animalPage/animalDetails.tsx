import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { IZooContext } from "../../App";
import { IAnimalDetails } from "../../models/IAnimalDetails";
import './animalDetails.scss';

export const AnimalDetails = () => {
  const [isFed, setIsFed] = useState(false);
  const [fedTime, setFedTime] = useState("");
  const { id } = useParams();
  const { animals, updateFeedTime } = useOutletContext<IZooContext>();

  useEffect(() => {
    const storedTime = localStorage.getItem(String(id));

    if (storedTime === null) {
      setFedTime(" - djuret har aldrig matats")
    } else {
      const ts = Date.parse(storedTime);
      if (isNaN(ts)) {
        setFedTime(" - djuret har aldrig matats")
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

    // const lastFedDate = new Date(lastFed);
    // const rightNow = new Date();
    setFedTime(lastFedDate.toLocaleDateString() + " " + lastFedDate.getHours() + ":" + lastFedDate.getMinutes());

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
    // let curTime = rightNow.getTime() 
    let curTime = rightNow.toLocaleDateString() + " " + rightNow.getHours() + ":" + rightNow.getMinutes();
    // let curTime = rightNow.getHours() + ":" + rightNow.getMinutes();
    setFedTime(curTime);
    updateFeedTime(animal);
  }

  let html = animals.map((animal: IAnimalDetails) => {
    if (id == animal.id) {
      return (
        <div className="animal-component" key={animal.id}>
          <h3 className="animal-component__title">Välkommen in till {animal.name}</h3>
          <article className="animal-component__flex">
            <div className="animal-component__flex__img">
              <img src={animal.imageUrl} alt={animal.name} className="animal-component__flex__img__src" />

            </div>
            <div className="animal-component__flex__column">
              <p className="animal-component__flex__column__timespan">{animal.name} blev senast matad {fedTime}</p>
              {animal.isFed ?
                <button className="animal-component__flex__column__not"
                  disabled={isFed}
                  onClick={() => { handleClick(animal) }}>Mata {animal.name}</button> :
                <button className="animal-component__flex__column__active" onClick={() => { handleClick(animal) }}>Mata djuret</button>}
              <p className="animal-component__flex__column__latin">Djurets latinska namn: <span className="animal-component__flex__column__latin__text">{animal.latinName}</span></p>
              <p className="animal-component__flex__column__desc">{animal.longDescription}</p>
            </div>
          </article>
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
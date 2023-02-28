import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  IAnimalIntro } from "../../models/IAnimal";
import { getAnimals } from "../../services/getAnimals";
import './animals.scss';

export const Animals =()=>{
    const [animals, setAnimals] = useState<IAnimalIntro[]>([]);
    useEffect(() => {
        const getData = async () => {
          let showAnimal = await getAnimals();
    
          setAnimals(showAnimal);
        }

        if(animals.length === 0) {
            getData();
        }
    });
    let html = animals.map ((animal) =>{
        return(
        <section className="component" key={animal.id}>
            <h1>{animal.name}</h1>
            <div className="component__img">
                <img src={animal.imageUrl} alt="Bilden saknas" className="component__img__src"/>
            </div>
            <Link to={`/animal/${animal.id}` } className="component__link">Mata</Link>
           
        </section>
        
        )
    });
    return(<div className="html-component">
        {html}
        <span>The animals were shown over this statement</span>
        </div>
    );
}
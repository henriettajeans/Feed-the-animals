import { Link, useOutletContext } from "react-router-dom";
import { IZooContext } from "../../App";
import { IAnimalDetails } from "../../models/IAnimalDetails";
import './zooAnimals.scss';

export const ZooAnimals =()=>{
    const {animals} = useOutletContext<IZooContext>();
   
    let animalsHtml = animals.map((animal: IAnimalDetails) => {
        return (
            <div>
            {/* // <div key= {animal.id} className="component" onClick={()=>{handleClick(animal)}}> */}
                <div className="component__img" key={animals.id}>
                    <img src={animals.imageUrl} alt={animal.name} className="component__img__src"/>
                </div>
                <h3>{animal.name}</h3>
                <p>{animal.shortDescription}</p>
                <Link to={`/animal/${animal.id}` } className="component__link">Mata</Link>
            </div>
        )
    })

    return (
    <div className="html-component">{animalsHtml}</div>
    )
}
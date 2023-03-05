
import { Link, useOutletContext } from "react-router-dom";
import { IZooContext } from "../../App";
import { IAnimalDetails } from "../../models/IAnimalDetails";
import { errorPic } from "../../services/defaultPic";
import './zooAnimals.scss';

export const ZooAnimals = () => {
    const { animals } = useOutletContext<IZooContext>();
    let zooHtml = animals.map((animal: IAnimalDetails) => {
        return (
            <article className="zoo-component">
                <div className="zoo-component__img" key={animals.id}>
                    <img src={animal.imageUrl} alt={animal.name} onError={errorPic} className="zoo-component__img__src" />
                </div>
                <h3 className="zoo-component__name">{animal.name}</h3>
                <p className="zoo-component__desc">{animal.shortDescription}</p>
                <section className="zoo-component__button">
                    <Link to={`/animal/${animal.id}`} className="zoo-component__button__link">Mata</Link>
                </section>
            </article>
        )
    })
    return (
        <div className="html-component">{zooHtml}</div>
    )
}
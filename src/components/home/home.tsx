import { Link, useOutletContext } from 'react-router-dom';
import { IZooContext } from '../../App';
import './home.scss';

export const Home = () => {
    const { animals } = useOutletContext<IZooContext>();
    return (<section className="home-component">
        <h1 className="home-component__title">Välkommen till vårt digitala zoo!</h1>
        <section className="home-component__container">
            <span className="home-component__container__text">Prova att mata våra onlinedjur här: </span>
            <Link to="/zoo" className="home-component__container__link">Djurparken</Link>
        </section>
    </section>)
}
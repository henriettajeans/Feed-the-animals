import { Link } from "react-router-dom"
import './nav.scss';

export const Nav = () => {

    return (
        <nav className="nav-container">
            <ul className="nav-container__list">
                <li className="nav-container__list__item">
                    <Link to="/" className="nav-container__list__item__link">Hem</Link></li>
                <li className="nav-container__list__item">
                    <Link to="/zoo" className="nav-container__list__item__link">Djurpark</Link></li>
            </ul>
        </nav>
    )
}

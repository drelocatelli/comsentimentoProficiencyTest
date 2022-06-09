import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar(props) {
    return(
        <div className="navbar">
            <figure className='logo' alt='logo' />
            <ul>
                <li><Link to="/admin">Inicio</Link></li>
                {props.children}
            </ul>
        </div>
    );
}
import {Link} from "react-router-dom"
import "./NavLinks.css"

export default function NavLinks({isLoggedIn, toggleLoginStatus}) {

    return (
        <div className="nav-links">
            <ul className="links">
                <li><Link to="/activity">Activity</Link></li>
                <li><Link to="/nutrition">Nutrition</Link></li>
                <li><Link to="/exercise">Exercise</Link></li>
                <li><Link to="/sleep">Sleep</Link></li>
                <li><Logio isLoggedIn={isLoggedIn}/></li>
                <li onClick={toggleLoginStatus()}><Link to={isLoggedIn?"": "/register"}>{isLoggedIn ? "Logout": "Register"}</Link></li>
            </ul>
        </div>
    )
}

function Logio({isLoggedIn}) {
    let isUserloggedIn = isLoggedIn;

    let label = '';
    let path = '';

    if(isUserloggedIn) {
        path = '/'
        label = ''
    } else {
        path = '/login'; label = 'Login'
    }

    return (
        <Link to={path}>{label}</Link>
    )
}


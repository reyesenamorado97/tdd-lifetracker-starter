import { Link } from "react-router-dom";
import "./NavLinks.css"


export default function NavLinks() {

    return (
    <div className="nav-links">
        <ul className="links">
            <Link to="/activity"><li>Activity</li></Link>
            <Link to="/exercise"><li>Exercise</li></Link>
            <Link to="/nutrition"><li>Nutrition</li></Link>
            <Link to="/sleep"><li>Sleep</li></Link>
            <Link to="/login"><li>Login</li></Link>
            <Link to="/register"><li className="btn secondary">Sign Up</li></Link>
        </ul>
    </div>
    )
}

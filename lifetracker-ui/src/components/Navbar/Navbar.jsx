import * as React from "react"
import "./NavBar.css"
import Logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks"

export default function Navbar({
    user,
    setUser,
    handleOnLogout,
    logoutError,
    setLogoutError,
    setError
}) {



    return (
        <nav className="navbar">
            <div className="content">
                <Link to="/">
                    <img className="logo" src={Logo} alt="Codepath" ></img>
                </Link>
                
                <NavLinks
                    user={user}
                    setUser={setUser}
                    handleOnLogout={handleOnLogout}
                    logoutError={logoutError}
                    setLogoutError={setLogoutError}
                    setError={setError}
                    
                />

            </div>
        </nav>
        
    )
}
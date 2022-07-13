import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import apiClient from "../../../services/apiClient"


import "./NavLinks.css"


export default function NavLinks({ user, setUser,
    setLogoutError,
    logoutError,
    setError

}) {
    const navigate = useNavigate()

    

    useEffect(() => {
        if (logoutError) {
            navigate("/login")
            setLogoutError(false);
            setError(null)
       // if ()

        }
    }, [logoutError,navigate])

    const handleOnLogout = async () => {
        await apiClient.logoutUser();
        setUser({});
        setLogoutError(true);
        setError(null)
      };


       return (
           <div className="nav-links">
                <ul className="links">
                    <Link to="/activity"><li>Activity</li></Link>
                    <Link to="/exercise"><li>Exercise</li></Link>
                    <Link to="/nutrition"><li>Nutrition</li></Link>
                    <Link to="/sleep"><li>Sleep</li></Link>

                    {user?.email === undefined ?
                       <Link to="/login"><li>Login</li></Link>
                       :
                       ""
                    }

                { user?.email === undefined ?
                    <Link to="/register"><li className="btn secondary">Sign Up</li></Link>
                :
                    <Link to="/login"><li className="btn secondary" onClick={handleOnLogout}>Logout</li></Link>

                }
            </ul>
        </div>
        )
}

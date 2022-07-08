import "./NutritionPage.css"
import NutritionFeed from "../NutritionFeed/NutritionFeed"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import NutritionNew from "components/NutritionNew/NutritionNew"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"



export default function NutritionPage({
    user,
    setUser,
    logoutError,
    setLogoutError,
    }) {
    
        const [errors, setErrors] = useState({});

    return (
        
        <div>
            {user?.email === undefined ?
                <AccessForbidden/>
                :
                < div className="nutrition-page" >
            
                    <div className="Banner">
                        <h1>Nutrition</h1>
                    </div>
                    <div className="content">
                        <div className="NutritionOverview">
                            <div className="header">
                                <h3>Overview</h3>
                                <Link to="/nutrition/create">
                  <button className="Button outline small outline aqua ">Record Nutrition</button>
                                </Link>
                            </div>
                            <div className="feed">
                                <NutritionFeed />
                            </div>
                        </div>
                    </div>
            
                </ div>
                
            }
        </div>
        
        
)}
import "./NutritionPage.css"
import NutritionFeed from "../NutritionFeed/NutritionFeed"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
export default function NutritionPage({
    user,
    setUser,
    logoutError,
    setLogoutError }) {
    

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
                                <button className="Button outline small outline aqua ">Record Nutrition</button>
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
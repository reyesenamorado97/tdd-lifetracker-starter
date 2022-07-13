
import "./ActivityFeed.css"
import { useState, useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { Link } from "react-router-dom"



export default function ActivityFeed({
    user,
    totalCaloriesPerDay,
    avgCaloriesPerCategory
 }) {

    const [errors, setErrors] = useState({});
    const [nutritions, setNutritions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [calories, setCalories] = useState([]);



    let totalCal = 0
    let maxCal = 0
    for (let i = 0; i < nutritions.length; i++){

        totalCal += nutritions[i].calories 
        
        if (nutritions[i].calories >= maxCal)   {
            maxCal = nutritions[i].calories
        }
        //console.log(nutritions[i].calories)
    }
    // console.log(totalCal)
    // console.log(maxCal)
    // console.log(new Date())



    useEffect(() => {
        const fetchNutrition = async () => {
          try {
              const { data } = await apiClient.listNutritionForUser(user);
            setNutritions(data.nutrition);
          } catch (err) {

            setErrors(err);
          }
    
        };
        fetchNutrition();
      }, []);



      useEffect(() => {
          const fetchCategories = async () => {
              try {
                  const { data } = await apiClient.getCategoriesForUser( user );
              //console.log(data)
  
              setCategories(data.categories);
            } catch (err) {
            }
      
          };
          fetchCategories();
        }, []);
    
    
        useEffect(() => {
            const fetchCalories = async () => {
                try {
                    const { data } = await apiClient.getDailyCalories( user );
    
                setCalories(data.dailyCalories);
              } catch (err) {
              }
        
            };
            fetchCalories();
          }, []);
    
    console.log(categories)


    return(

    <div className="activity-feed">
        <div className="actions">
            <h2 className="heading">Activity Feed</h2>
            <div className="buttons">
                
                
                <Link to="/nutrition/create">
                        <button className="Button outline small outline aqua ">
                            Record Nutrition
                        </button>
                </Link>
            </div>
        </div>
        <div className="stats">
            <div className="main">        
                    {calories.length != 0 ?
                        calories.map((day) => (
                        <div className="SummaryStat large aqua">
                            <div className="background">
                                    <p>Avg Calories on {day.date}</p>

                                    <h1>{day.totalCaloriesPerDay} Cal</h1>
                            </div>
                            </div>
                        ))
                        :
                        <div className="empty">
                        <h2>Nothing here yet.</h2>
                        </div>
                    }
            </div>
                    
                <h4>Category Stats</h4>
                <div className="more scroll">

                {categories.length != 0 ? 
                    categories.map((cat) => (
                        <div className="SummaryStat large teal">
                            <div className="background">
                                <p>{cat.category} Avg</p>
                                <h1>{cat.avgCaloriesPerCategory} Cal</h1>
                                                
                            </div>
                        </div>
                        
                    ))
                :
                <div className="empty">
                <h2>Nothing here yet.</h2>
                </div>
                
                    }
                </div>

            
        </div>
    </div>
)}
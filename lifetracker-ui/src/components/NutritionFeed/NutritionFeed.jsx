import "./NutritionFeed.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../../../services/apiClient";

export default function NutritionDetails({ user }) {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [nutritions, setNutritions] = useState([]);
  // Fetch nutrition

  useEffect(() => {
    const fetchNutrition = async () => {
      setFetching(true);
      try {
        const { data } = await apiClient.listNutritionForUser(user);

        setNutritions(data.nutrition);
      } catch (err) {
        setError(err);
      }

      setFetching(false);
    };
    fetchNutrition();
  }, []);
  return (

    <div className="NutritionFeed">
      {nutritions.length != 0 ?
        
        nutritions.map((food) => (
          <Link to={`id/${food.nutritionId}`}>
            <div className="card nutrition-card" key={food.nutritionId}>
              <div className="card-header">
                <span >
                  <img src={`${food.imageUrl}`} alt="Nutrition picture"></img>
                </span>
                <span>
                  <p className="title">{food.name}</p>
                </span>
              </div>
         
              <div className="card-stats">
                <div className="stat">
                  <p>Quantity</p>
                  <span>{food.quantity}</span>
                </div>
                <div className="stat">
                  <p>Calories</p>
                  <span>{food.calories}</span>
                </div>
              </div>
            <div className="card-meta">
              {/* credits: https://stackoverflow.com/questions/64409238/format-a-postgresql-create-timestamp-in-react-app */}
              <p className="time">{new Date(food.created_at).toLocaleDateString()} at {new Date(food.created_at).toLocaleTimeString() }</p>
              <small className="category">{food.category}</small>
              </div>
          </div>
          </Link>
          ))
        : 
        <div className="empty">
          
          <h2>Nothing here yet.</h2>
         </div>
         }
    </div>
  );
}
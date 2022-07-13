import { useParams } from "react-router-dom"
import apiClient from "../../../services/apiClient"
import { useState, useEffect } from "react"
import "./NutritionDetail.css"


export default function NutritionDetail({user}) {
    
    const [nutrition, setNutrition] = useState({})
    const { nutritionId } = useParams()
    
    async function fetchNutrition() {
        const { data, err } = await apiClient.fetchNutritionById(nutritionId)
        if (err) setError(err)
        if (data) {
            console.log(data)
            setNutrition(data.nutrition)
        }
    }

    useEffect(() => {
        fetchNutrition()
      }, []);

    return (
        <div className="nutrition-detail">
            <div className="nutrition-card">
                <div className="card-header">
                    <span>
                        <img src={`${nutrition.imageUrl}`} alt="food picture" />
                    </span>
                    <span>
                        <p className="title">{ nutrition.name}</p>
                    </span>
                </div>
                <div className="card-stats">
                    <div className="stat">
                        <p>Quantity</p>
                        <span>{nutrition.quantity}</span>
                    </div>
                    <div className="stat">
                        <p>Calories</p>
                        <span>{nutrition.calories}</span>
                    </div>
                </div>
                <div className="card-meta">
                    <p className="time">{new Date(nutrition.createdAt).toLocaleDateString()} at {new Date(nutrition.createdAt).toLocaleTimeString()}</p>
                    
                    <small className="category">{ nutrition.category}</small>
                </div>
            </div>
        </div>

    )
}
import * as React from "react"
import "./Landing.css"
import Watch from "../../assets/watch.svg";
import Fitness from "../../assets/fitness.svg"
import Food from "../../assets/food.svg"
import Rest from "../../assets/rest.svg"
import Planner from "../../assets/planner.svg"

export default function Landing() {
     
    return (
        <div  id="#/register" className="Landing">
            <div className="hero">
                <img src={Watch} alt="Smart Watch" />
                <h1>Life Tracker</h1>
                <p>Helping you take back control of your world</p>
            </div>
            <div className="tiles">
                <div className="tile">
                    <img src={Fitness} alt="Fitness" />
                    <p>Fitness</p>
                </div>
                <div className="tile">
                    <img src={Food} alt="Food" />
                    <p>Food</p>
                </div><div className="tile">
                    <img src={Rest} alt="Rest" />
                    <p>Rest</p>
                </div>
                <div className="tile"><img src={Planner} alt="Planner" />
                    <p>Planner</p>
                </div>
            </div>
        </div>

    )
 }
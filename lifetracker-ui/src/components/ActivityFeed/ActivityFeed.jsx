
import "./ActivityFeed.css"
export default function ActivityFeed({
    totalCaloriesPerDay,
    avgCaloriesPerCategory
 }) {

    return(

    <div className="activity-feed">
        <div className="actions">
            <h2 className="heading">Activity Feed</h2>
            <div className="buttons">
                <button className="Button outline small outline gold ">
                    Add Exercise</button>
                <button className="Button outline small outline blue ">
                    Log Sleep
                </button>
                <button className="Button outline small outline aqua ">
                    Record Nutrition
                </button>
            </div>
        </div>
        <div className="stats">
            <div className="main">
                <div className="SummaryStat large gold">
                    <div className="background">
                        <p>Total Exercise Minutes</p>
                        <h1>0</h1>
                    </div>
                </div>
                <div className="SummaryStat large purple">
                    <div className="background">
                        <p>Avg Sleep Hours</p>
                        <h1>0</h1>
                    </div>
                </div>
                <div className="SummaryStat large aqua">
                    <div className="background">
                        <p>Avg Daily Calories</p>
                        <h1>0</h1>
                    </div>
                </div>
            </div>
            <h4>More Stats</h4>
            <div className="more">
                <div className="SummaryStat small teal">
                    <div className="background">
                        <p>Maximum Hourly Calories</p>
                        <h1>0</h1>
                                        
                    </div>
                </div>
                <div className="SummaryStat small orange">
                    <div className="background">
                        <p>Avg Exercise Intensity</p>
                        <h1>0</h1>
                                        
                    </div>
                </div>
                <div className="SummaryStat small red">
                    <div className="background">
                        <p>Total Hours Slept</p>
                        <h1>0</h1>
                                        
                    </div>
                </div>
            </div>
        </div>
    </div>
)}
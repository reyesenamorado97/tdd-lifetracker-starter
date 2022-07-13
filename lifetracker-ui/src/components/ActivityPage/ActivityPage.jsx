import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import { useState, useEffect } from "react"
import ActivityFeed from "../ActivityFeed/ActivityFeed"
import apiClient from "../../../services/apiClient"

import "./ActivityPage.css"

export default function ActivityPage({
    user,
    setUser,
    logoutError,
    setLogoutError
}) {
    //const [isProcessing, setIsProcessing] = useState(false);
    
    return (
        <div>
            
            {user?.email === undefined ?
                
                < AccessForbidden
                    user={user}
                    setUser={setUser}
                    logoutError={logoutError}
                    setLogoutError={setLogoutError}
                />
                :
                
                <div className="activity-page">
                    <ActivityFeed user={user}/>
                </div>}
        </div>

    )

}
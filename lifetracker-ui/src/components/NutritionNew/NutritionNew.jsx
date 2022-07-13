import "./NutritionNew.css"
import AccessForbidden from "components/AccessForbidden/AccessForbidden"
import apiClient from "../../../services/apiClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NutritionForm from "../NutritionForm/NutritionForm"



export default function NutritionNew({
    user,
    setUser,
}) {
    


     
    
    return (

    <div>
            {user?.email === undefined ?
                <AccessForbidden user={user}  setUser={setUser} />
                :
                <NutritionForm/>
               
            }</div>

    )
}
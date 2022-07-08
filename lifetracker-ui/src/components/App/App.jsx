import * as React from "react"
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Landing from "../Landing/Landing"
import Register from "../Register/Register"
import { useState, useEffect, createContext } from "react"
import apiClient from "../../../../services/apiClient"

import NoPage from "../NoPage/NoPage"
import "./App.css"
import LoginPage from "components/LoginPage/LoginPage"
import ActivityPage from "components/ActivityPage/ActivityPage"
import NutritionPage from "components/NutritionPage/NutritionPage"
import NutritionNew from "components/NutritionNew/NutritionNew"
import NutritionDetail from "components/NutritionDetail/NutritionDetail"



export default function App() {

  const [user, setUser] = useState({});
  const [logoutError, setLogoutError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null)


  const userVal = {
    state: {
      user
    },
    setters: {
      setUser
    }
  };

  useEffect(() => {

    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if (error) setError(error)
    }
    const token = localStorage.getItem("lifetracker_token")
    if (token) {
      apiClient.setToken(token)
      fetchUser()
    }
  } , [])

  
  console.log(user)

  return (

    <div className="app">
      <React.Fragment>{
      
        <BrowserRouter>
          <Navbar user={user} setUser={setUser}
          logoutError={logoutError} setLogoutError={setLogoutError} setError={setError}
          />

          <main>
        <Routes>
          <Route path="/"element={
              <>
                  <Landing />
              </>
            }
              />
              
            <Route path="/activity" element={
            <>
                  <ActivityPage user={user} setUser={setUser} logoutError={logoutError} setLogoutError={setLogoutError} />
            </>
            }
            />
              
              <Route path="/nutrition" element={
            <>
                  <NutritionPage user={user} setUser={setUser} logoutError={logoutError} setLogoutError={setLogoutError} />
                  
            </>
            }
            />

              <Route path="/nutrition/create" element={
            <>
                  <NutritionNew user={user} setUser={setUser} logoutError={logoutError} setLogoutError={setLogoutError} />
                  
            </>
            }
              />
              
              <Route path="nutrition/id/:nutritionId" element={
            <>
                  <NutritionDetail user={user} setUser={setUser} logoutError={logoutError} setLogoutError={setLogoutError} />
                  
            </>
            }
            />
              
              <Route path="/login" element={
              <>
                  <LoginPage user={user} setUser={setUser} logoutError={logoutError} setLogoutError={setLogoutError}/>
              </>
            }
          />

          <Route path="/register" element={
              <>
                  <Register user={user} setUser={setUser}/>
              </>
            }
          />
         
        <Route path="*" element={<NoPage></NoPage>}> </Route>
        </Routes>
      </main>
    </BrowserRouter>
     
      
      
      
      
      
        
        
      }</React.Fragment>
    </div>
  )
}

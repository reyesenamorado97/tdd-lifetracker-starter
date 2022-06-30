import * as React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Landing from "../Landing/Landing"
import Register from "../Register/Register"


import NoPage from "../NoPage/NoPage"
import "./App.css"
import LoginPage from "components/LoginPage/LoginPage"
import ActivityPage from "components/ActivityPage/ActivityPage"

export default function App() {
  let tempBool = false

  return (
    <div className="app">
      <React.Fragment>{
      
      <BrowserRouter>
          <main>
        <Routes>
          <Route path="/"element={
              <>
                  <Navbar />
                  <Landing />
              </>
            }
              />
              
            <Route path="/activity" element={
            <>
                <Navbar />
                <ActivityPage />
            </>
            }
            />
              
              <Route path="/login" element={
              <>
                  <Navbar />
                  <LoginPage />
              </>
            }
          />

          <Route path="/register" element={
              <>
                  <Navbar />
                  <Register />
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

import "./AccessForbidden.css"
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../../services/apiClient";
import { useState, useEffect } from "react"

export default function AccessForbidden({
    user,
    setUser,
    logoutError,
    setLogoutError

}) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
      email: "",
      password: "",
    });

    const handleOnSubmit = async () => {
        setErrors((e) => ({ ...e, form: null }));
    
        const { data, error } = await apiClient.loginUser({
          email: form.email,
          password: form.password,
        });
        if (error) setErrors((e) => ({ ...e, form: error }));
        if (data?.user) {
          setUser(data.user);
            apiClient.setToken(data.token);
            setLogoutError(false)
        }
      };
  
    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (!event.target.value.includes("@") || event.target.value[0] == "@") {
                setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
          } else {
            setErrors((e) => ({ ...e, email: null }));
          }
        }
        
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
      };

    useEffect(() => {
      // if user is already logged in,
      // redirect them to the home page
      if (user?.email) {
        navigate("/activity");
      }
    }, [user, navigate]);

    return (
        <div id="#login" className="login-page">
        <div>
                <div className="login">
                    
                    <div className="card">
                    <h2>Login</h2>
                    
                   <p className="error">You need to be logged in to access that page!</p>
                   
                        
              {errors?.form ?
                <p className="error">{ errors.form} </p>
                : ""
              }
                    
                        <br />
                        <div className="form">
                            <div className="input-field">
                                <label>Email</label>
                            <input type="email" name="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
                            </div>
                            <div className="input-field">
                                <label>Password</label>
                            <input type="password" name="password" placeholder="password" value={form.password} onChange={handleOnInputChange}/>
                            </div>
                            <button className="btn" onClick={handleOnSubmit}>Login</button>
                        </div>
                        <div className="footer">
                            <p>Don't have an account? Sign up <Link to="/register">&nbsp;here.</Link>
                            </p>
                        </div>
                    </div>


                    <br />
                    <br />
            </div>
            
        
        </div>
    </div>
    

    )
}
import { Link } from "react-router-dom";
import "./Register.css"
import {useState, useEffect} from "react"


export default function Register(user, setUser) {
    
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (!event.target.value.includes("@")) {
                //console.log("not here")
                setEmailError(true)
            }
            else {
                //console.log("yes")
                setEmailError(false)

            }
        }

        if (event.target.name === "passwordConfirm") {
            if (event.target.value !== form.password) {
                //console.log("not here")
                setPasswordError(true)
            }
            else {
                //console.log("yes")
                setPasswordError(false)

            }
            
        }
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));

    }

    return (
        <div id="#register" className="Register">
            <div className="card">
                <h2>Register</h2>
                <br />
                <div className="form">
                    <div className="input-field lines">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter a valid email" onChange={handleOnInputChange} value={form.email}/>
                    </div>
                    {emailError ? 
                        <div className="error">
                            Invalid Email!
                        </div>
                        : ""
                    }
                    <div className="input-field">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="your_username" value={form.username} onChange={handleOnInputChange} />
                    </div>

                    <div className="split-input-field">
                        <div className="input-field lines" >
                            <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleOnInputChange} />
                        </div>
                        <div className="input-field">
                            <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleOnInputChange} />
                        </div>
                        
                    </div>

                    <div className="input-field">
                        <label >Password</label>
                        <input type="password" name="password" placeholder="Enter a secure password" value={form.password} onChange={handleOnInputChange} />
                    </div>

                    <div className="input-field">
                        <label >Confirm Password</label>
                        <input type="password" name="passwordConfirm" placeholder="Confirm your password" value={form.passwordConfirm} onChange={handleOnInputChange} />
                    </div>
                    {passwordError ? 
                        <div className="error">
                            Passwords do not match!
                        </div>
                        : ""
                    }

                    <button className="btn">Create Account</button>
                </div>
                
                <div className="footer">
                    <p>Already have an account? Login &nbsp;
                        <Link to="/login">here.</Link>
                    </p>
                </div>

            </div>
        </div>

)}
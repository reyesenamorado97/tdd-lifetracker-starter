import { Link } from "react-router-dom";
import "./Register.css"

export default function Register() {
    
    return (
        <div id="#register" className="Register">
            <div className="card">
                <h2>Register</h2>
                <br />
                <div className="form">
                    <div className="input-field lines">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter a valid email" value="" />
                    </div>
                    <div className="input-field">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="your_username" value="" />
                    </div>

                    <div className="split-input-field">
                        <div className="input-field lines" >
                            <input type="text" name="firstName" placeholder="First Name" value="" />
                        </div>
                        <div className="input-field">
                            <input type="text" name="lastName" placeholder="Last Name" value="" />
                        </div>
                        
                    </div>

                    <div className="input-field">
                        <label >Password</label>
                        <input type="password" name="password" placeholder="Enter a secure password" value="" />
                    </div>

                    <div className="input-field">
                        <label >Confirm Password</label>
                        <input type="password" name="passwordConfirm" placeholder="Confirm your password" value="" />
                    </div>

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
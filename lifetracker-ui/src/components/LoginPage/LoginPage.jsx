import { Link } from "react-router-dom";
import "./LoginPage.css"

export default function LoginPage() {

    let tempBool = false

    return (
        <div id="#login" className="login-page">
            <div>
            {!tempBool ? 
                    <div className="login">
                        
                        <div className="card">
                            <h2>Login</h2>
                            <br />
                            <div className="form">
                                <div className="input-field">
                                    <label>Email</label>
                                    <input type="email" name="email" placeholder="user@gmail.com" value="" />
                                </div>
                                <div className="input-field">
                                    <label>Password</label>
                                    <input type="password" name="password" placeholder="password" value=""/>
                                </div>
                                <button className="btn">Login</button>
                            </div>
                            <div className="footer">
                                <p>Don't have an account? Sign up <Link to="/register">&nbsp;here.</Link>
                                </p>
                            </div>
                        </div>


                        <br />
                        <br />
                </div>
                
            
            : <p>testing</p>
            }
            </div>
        </div>
        

    )
}
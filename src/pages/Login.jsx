import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth.jsx";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const URL = "https://mern01server-production.up.railway.app/api/auth/login";

export const Login = () => {
    const [user, setUser] = useState({
        
        email:"",
        
        password:"",
        
    });

    const navigate= useNavigate();

    // const {storeTokenInLS}
    const {storeTokenInLS} = useAuth();

    // State to store validation errors
    const [errors, setErrors] = useState([]);
    // State for general error messages
    const [generalError, setGeneralError] = useState("");
    const [generalPError, setGeneralPError] = useState("");  //wrong password error


    //handling hndleInput 
    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,
            //[name] --> dynamic ye kuchh bi ho sakta hai

        });

    };

    // handling the form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]); // Reset errors before each submission
        setGeneralError(""); // Reset general error
        setGeneralPError(""); // Reset general Password error
    
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
    
            if (response.ok) {
                const res_data = await response.json(); // Ensure response is parsed
                console.log("response from server", res_data);
                toast.success("Login Successful");
                storeTokenInLS(res_data.token); // Store token and update state
                setUser({ email: "", password: "" });
                navigate("/"); // Redirect after login
            } else {

                const err = await response.json();
                console.log(err.msg); // This will log "Invalid Password" 
                toast.error(err.msg);
               
                
                //Handle general errors
                if(err.msg === "Email does not exist")
                {
                    setGeneralError(err.msg);
                }
                if(err.msg === "Invalid password")
                {
                    setGeneralPError(err.msg);
                }

                
                // Set the errors from the backend validation to be displayed in UI
                setErrors(err.errors || []);
                
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };
    



    return <>
       <section>
         <main>
        <div className="section-login">
            <div className="container">
            <div className="login-image">
                    <img src="/images/Computer login-rafiki.png" 
                    alt="a boy is trying to login " 
                    width="500px" height="70%"/>
                </div>
            {/* lets tackle registration form */}
             <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                
                    <div className="input-box">
                        <label htmlFor="email">Email :</label>
                        <input type="text" className="input-field" id="email" name="email" 
                         placeholder="Enter your email"
                         required autoComplete="off" value={user.email}  onChange={handleInput} />
                         {errors.find(error => error.field === 'email') && (
                                            <span className="error-message">
                                                {errors.find(error => error.field === 'email').message}
                                            </span>
                                        )}

                                       {generalError && (
                                            <span className="error-message">
                                                {generalError}
                                            </span>
                                        )}
                    </div>
                    
                    <div className="input-box">
                        <label htmlFor="password">Password :</label>
                        <input type="password" className="input-field" id="password" name="password" 
                         placeholder="Enter your password"
                         required autoComplete="off" value={user.password}  onChange={handleInput} />
                         {errors.find(error => error.field === 'password') && (
                                            <span className="error-message">
                                                {errors.find(error => error.field === 'password').message}
                                            </span>
                                        )}

                                        {generalPError && (
                                            <span className="error-message">
                                                {generalPError}
                                            </span>
                                        )}
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-submit">Login Now</button>
                </form>

              </div>
              </div>
              
            </div>  
         </main>
      </section>
    </>
};
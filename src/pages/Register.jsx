import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import {useAuth} from "../store/auth.jsx";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    
    // const {storeTokenInLS}
    const {storeTokenInLS} = useAuth();




    // State to store validation errors
    const [errors, setErrors] = useState([]);
    // State for general error messages
    const [generalError, setGeneralError] = useState("");

    // Handling input
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]); // Reset errors before each submission
        setGeneralError(""); // Reset general error
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                toast.success("Registration Successful");
                const res_data = await response.json();
                console.log("response from server", res_data);

                storeTokenInLS(res_data.token);

                // Clear form and navigate to login
                setUser({ username: "", email: "", phone: "", password: "" });
                navigate("/Login");
            } else {
                
 
                const err = await response.json();
                console.log(err.msg); // This will log "Email already exist"
                toast.info(err.msg);

                //Handle general errors
                if(err.msg === "Email already exist") {
                    setGeneralError(err.msg);
                }

                // Set the errors from the backend validation to be displayed in UI
                setErrors(err.errors || []);
            }

        } catch (error) {
            console.log("register error", error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-hero">
                        <div className="container">
                            <div className="login-image">
                                <img src="/images/Sign up-rafiki.png"
                                    alt="a girl and a boy trying to register"
                                    width="500" height="400" />
                            </div>

                            {/* Registration form */}
                            <div className="login-form">
                                <h1 className="main-heading mb-3">Registration Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div className="input-box">
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            id="username"
                                            name="username"
                                            placeholder="Enter your username"
                                            required
                                            autoComplete="off"
                                            value={user.username}
                                            onChange={handleInput}
                                        />
                                        {errors.find(error => error.field === 'username') && (
                                            <span className="error-message">
                                                {errors.find(error => error.field === 'username').message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="input-box">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            required
                                            autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
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
                                        <label htmlFor="phone">Phone:</label>
                                        <input
                                            type="number"
                                            className="input-field"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter your phone"
                                            required
                                            autoComplete="off"
                                            value={user.phone}
                                            onChange={handleInput}
                                        />
                                        {errors.find(error => error.field === 'phone') && (
                                            <span className="error-message">
                                                {errors.find(error => error.field === 'phone').message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="input-box">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="input-field"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            required
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                        {errors.find(error => error.field === 'password') && (
                                            <span className="error-message">
                                                {errors.find(error => error.field === 'password').message}
                                            </span>
                                        )}
                                    </div>

                                    <br />
                                    <button type="submit" className="btn btn-submit btn-register">
                                        Register Now
                                    </button>
                                </form>

                                {/* Show all errors
                                {errors.length > 0 && (
                                    <div className="error-summary">
                                        <ul>
                                            {errors.map((error, index) => (
                                                <li key={index}>{error.field}: {error.message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

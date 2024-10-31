import { useState } from "react";
import "../index.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData);
    const [userData, setUserData] = useState(true);
    const { user } = useAuth();
    console.log(user);

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });

        setUserData(false);
    }

    // Handling handleInput
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://mern01-server-tzr9.onrender.com/api/form/contact", {
                method: "POST",
                headers: {
                    'content-Type': "application/json"
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                toast.success("Message Sent");
                if (user) {
                    setContact({
                        ...contact,
                        message: "", // clear only the message
                    });
                } else {
                    setContact(defaultContactFormData);
                }
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-contact">
                        <div className="container">
                            <div className="login-image">
                                <img src="/images/Contact us-rafiki.png"
                                     alt="a boy is trying to login "
                                     width="500" height="400" />
                            </div>
                            <div className="login-form">
                                <h1 className="main-heading mb-3"> Contact Us</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div className="input-box">
                                        <label htmlFor="username">Username :</label>
                                        <input type="text" className="input-field" id="username" name="username"
                                               placeholder="Enter your username"
                                               required autoComplete="off" value={contact.username} onChange={handleInput} />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="email">Email :</label>
                                        <input type="text" className="input-field" id="email" name="email"
                                               placeholder="Enter your email"
                                               required autoComplete="off" value={contact.email} onChange={handleInput} />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="message">Message :</label>
                                        <textarea className="input-field" id="message" name="message" rows="6" placeholder="Enter your message"
                                                  required autoComplete="off" value={contact.message} onChange={handleInput} />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Contact Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

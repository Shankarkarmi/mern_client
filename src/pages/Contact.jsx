import { useState } from "react";
import "../index.css";
import {useAuth} from "../store/auth";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const defaultContactFormData = {
    username:"",
    email:"",
    message:"",
};


export const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData);

    const [userData, setUserData] = useState(true);
    const { user } = useAuth();
    console.log(user);



    if(userData && user){
        setContact({
            username: user.username,
            email: user.email,
            message:"",
        });
        
        setUserData(false);
    }


    //handling hndleInput 
    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]:value,
            //[name] --> dynamic ye kuchh bi ho sakta hai

        });

    };

    // handling the form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //refresh ko rok ne k lia 
        
        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
                method: "POST", headers: {
                    'content-Type':"application/json" },
                    body: JSON.stringify(contact),
            });
            if(response.ok){
                toast.success("Message Sent");
                if (user) {
                    // If the user is logged in, reset only the message field
                    setContact({
                        ...contact, // keep username and email if user is not null
                        message: "", // clear only the message
                    });
                } else {
                    // If no user is logged in, reset all fields
                    setContact(defaultContactFormData);
                }
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }

    };

    return <>
    <section>
      <main>
          <div className="section-contact">
            
             <div className="container">
              {/* lets tackle registration form */}
              <div className="login-image">
                 <img src="/images/Contact us-rafiki.png" 
                 alt="a boy is trying to login " 
                 width="500" height="400"/>
                </div>   
             <div className="login-form">
             <h1 className="main-heading mb-3"> Contact Us</h1>
             <br/>
             <form onSubmit={handleSubmit}>
                 <div class="input-box">
                     <label htmlFor="email">Username :</label>
                     <input type="text" class="input-field" id="username" name="username" 
                      placeholder="Enter your username"
                      required autoComplete="off" value={contact.username}  onChange={handleInput} />
                 </div>
                 <div class="input-box">
                     <label htmlFor="email">Email :</label>
                     <input type="text" class="input-field" id="email" name="email" 
                      placeholder="Enter your email"
                      required autoComplete="off" value={contact.email}  onChange={handleInput} />
                 </div>                
                 <div class="input-box">
                     <label htmlFor="message">Message :</label>
                      <textarea class="input-field" id="message" name="message" rows="6" placeholder="Enter your message"
                      required autoComplete="off" value={contact.message}  onChange={handleInput} />
                 </div>
                 <br/>
                 <button type="submit" className="btn btn-submit">Contact Now</button>
               </form>
                </div>
                </div>
         </div>  
      </main>
   </section>
 </>
    
};
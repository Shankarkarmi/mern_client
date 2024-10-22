import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const[user, setuser] = useState("");
    const [ IsLoading, setIsLoading ]= useState(true);  //true matlab mera page abhi bi load ho rha hai mera contain mat dikhao
    const[services, setservices] = useState([]);
    const authorizationToken = `Bearer ${token}`;


    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken); // Update state to trigger re-render
    };

    const LogoutUser = () => {
        localStorage.removeItem("token");
        setToken(""); // Update state to trigger re-render
        setuser(null);
    };

    let isLoggedIn = !!token; // Determine if user is logged in

    const userAuthentication = async () => {
        if (!token) return;
        try {
            setIsLoading(true);
            const response = await fetch("https://mern01server-production.up.railway.app/api/auth/user", {
                method:"GET",
                headers:{
                    Authorization: authorizationToken , // Use backticks for string interpolation
                },
            });

            if(response.ok){
                const data = await response.json();
                console.log("user data ", data.userData);
                setuser(data.userData);
                setIsLoading(false);   
            }else{
                console.error("Failed to authenticate user , status :", response.status);
                setIsLoading(false); 
            }
            
        } catch (error) {
            console.error("Error fetching  user data",error);
        }
    };


    const getServices = async() => {
        try {

            const response = await fetch("https://mern01server-production.up.railway.app/api/data/service", {
                method: "GET",
            });

                if(response.ok){
                    const data = await response.json();
                    // console.log(data.msg);
                    setservices(data.msg);
                }

            
            
        } catch (error) {
            console.log(`Services fronted error: ${error}`);
        }
    }

    // Run only once when the component mounts
    useEffect(() => {
        getServices(); // Fetch services once
    }, []); // Empty dependency array means it runs only once

    // Run when the token changes
    useEffect(() => {
        userAuthentication(); // Authenticate user when token changes
    }, [token]); // Dependency on token means it runs when token changes


    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn , user , services, authorizationToken, IsLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};

import { NavLink , Link } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBlog } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { GiHummingbird } from "react-icons/gi";
import { useState } from "react";



import "./Navbar.css";

export const Navbar = () => {
    const { isLoggedIn } = useAuth(); // Get isLoggedIn from context
    const [isChecked, setIsChecked] = useState(false);

    const handleLinkClick = () => {
        setIsChecked(false);
    };


    return (
        <header>
            <div className="con">
                <Link className="logo-brand">
                
                <GiHummingbird />
                </Link>

                <input type="checkbox" id="check" name="" value="" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                
                   <label for="check" id="checkbtn">
                   <TiThMenu />
                    </label> 
                <nav  className="nex">
                    <ul>
                        <li><NavLink to="/" onClick={handleLinkClick}> Home </NavLink></li>
                        <li><NavLink to="/About" onClick={handleLinkClick}> About </NavLink></li>
                        <li><NavLink to="/Service" onClick={handleLinkClick}> Service </NavLink></li>
                        <li><NavLink to="/Contact" onClick={handleLinkClick}> Contact </NavLink></li>
                        {/* Conditional rendering based on login state */}
                        {isLoggedIn ? (
                            <li><NavLink to="/Logout" onClick={handleLinkClick}> Logout </NavLink></li>
                        ) : (
                            <>
                                <li><NavLink to="/Register" onClick={handleLinkClick}> Register </NavLink></li>
                                <li><NavLink to="/Login" onClick={handleLinkClick}> Login </NavLink></li>
                            </>
                        )}
                    </ul>

                    {/* <Link to="/" className="nav-toggle hover-link">
                         <TiThMenu />
                    </Link> */}

                </nav>
                <div className="menu">
                    <ul>
                    <li><NavLink to="/Service"> <FaBlog />log<IoMdArrowDropdown /> </NavLink>
                    <ul className="dropdown">
                        <li><NavLink to="/"> Home </NavLink></li>
                        <li><NavLink to="/About"> About </NavLink></li>
                        <li><NavLink to="/Service"> Service </NavLink></li>
                        <li><NavLink to="/Contact"> Contact </NavLink></li>
                    </ul>
                    </li>
                    </ul>
                    
                </div>
            </div>
        </header>
    );
};

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Contact} from "./pages/Contact";
import {Service} from "./pages/Service";
import {Register} from "./pages/Register";
import {Login } from "./pages/Login";
import {Navbar} from "./components/Navbar";
import { Logout } from "./pages/Logout";
import { AdminLayouts} from "./components/layouts/Admin-Layouts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminServices } from "./pages/Admin-Services";
import { Error } from "./pages/Error";

const App = () => {
  return ( 
    <>
        <BrowserRouter>
        <Navbar />
               <Routes>
                     <Route path="/" element={<Home/>} />
                     <Route path="/About" element={<About/>} />
                     <Route path="/Contact" element={<Contact/>} />
                     <Route path="/Service" element={<Service/>} />
                     <Route path="/Register" element={<Register/>} />
                     <Route path="/Login" element={<Login/>} />
                     <Route path="/Logout" element={<Logout/>} />
                     <Route path="*" element={<Error/>} />
                     <Route path="/admin" element={<AdminLayouts/>} >
                        <Route path="users" element={<AdminUsers/>}></Route>
                        <Route path="contact" element={<AdminContacts/>}></Route>
                        <Route path="service" element={<AdminServices/>}></Route>
                      </Route>
               </Routes>
        </BrowserRouter>
  </>
  );
};

export default App;

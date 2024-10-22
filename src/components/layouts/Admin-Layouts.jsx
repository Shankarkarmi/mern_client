import { NavLink, Outlet ,Navigate } from "react-router-dom";
import { GrUserSettings } from "react-icons/gr";
import { RiContactsLine } from "react-icons/ri";
import { GrServices } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";
import {useAuth} from "../../store/auth";







export const AdminLayouts = () => {
    
    const { user, IsLoading } = useAuth();
    console.log("admin layout",user);

    if(IsLoading) {
        return <div>Loading...</div>;
    }

    if(!user.isAdmin){
        return <Navigate to="/" />
    }
    return (
        <>
        <header className="admin">
            <div className="admin-container">
                <nav>
                    <ul>
                        <li> <NavLink to="/admin/users"><GrUserSettings style={{ fontSize: '18px', marginRight: '8px', verticalAlign: 'middle' }} />Users</NavLink></li>
                        <li><NavLink to="/admin/contact"><RiContactsLine style={{ fontSize: '18px', marginRight: '8px', verticalAlign: 'middle' }} />Contacts</NavLink></li>
                        <li><NavLink to="/admin/service"><GrServices style={{ fontSize: '18px', marginRight: '8px', verticalAlign: 'middle' }} />Services</NavLink></li>
                        <li><NavLink to="/admin/home"><IoHomeOutline style={{ fontSize: '18px', marginRight: '8px', verticalAlign: 'middle' }} />Home</NavLink></li>
                    </ul>
                </nav>
            </div>

        </header>
        <Outlet/>
        </>
    )
};
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(""); // Added state for error handling
    const { authorizationToken } = useAuth();

    const getAllServicesData = async () => {
        try {
            const response = await fetch("https://mern01-server-tzr9.onrender.com/api/data/service", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                console.log("Not ok");
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log(`services: ${data}`);
            setServices(data.msg);
        } catch (error) {
            console.error("Failed to fetch services", error);
            setError("Failed to load services. Try again later.");
        }
    };

    useEffect(() => {
        getAllServicesData();
    }, []); // Include authorizationToken as a dependency

    return (
        <>
            <section className="admin-users-section">
                <div className="contain">
                    <h1>Admin Services Data</h1> {/* Updated heading */}
                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
                </div>

                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Service</th>        {/* Updated header */}
                                <th>Description</th>    {/* Updated header */}
                                <th>Provider</th>         {/* Updated header */}
                                <th>Price</th>         {/* Updated header */}
                                <th>Update</th>        {/* Updated header */}
                                <th>Delete</th>        {/* Updated header */}
                            </tr>
                        </thead>
                        <tbody>
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        <h2>No Services Found</h2> {/* Updated message */}
                                    </td>
                                </tr>
                            ) : (
                                services.map((curService, index) => (
                                    <tr key={index} className="last">
                                        <td>{curService.service}</td>
                                        <td>{curService.description}</td>
                                        <td>{curService.provider}</td>
                                        <td>{curService.price}</td>
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

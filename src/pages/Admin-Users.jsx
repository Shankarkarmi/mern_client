import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(""); // Define error state

    const { authorizationToken } = useAuth();
    console.log(authorizationToken);

    const getAllUsersData = async () => {
        try {
            const response = await fetch("https://mern01server-production.up.railway.app/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`users ${data}`);
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            setError("Failed to load Users. Try again Later.");
        }
    };

    // Delete the user on delete button
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`https://mern01server-production.up.railway.app/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Deleted user: ${data}`);
            setUsers(users.filter(user => user._id !== id)); // Remove deleted user from UI
        } catch (error) {
            console.error("Failed to delete user", error);
            setError("Failed to delete user. Try again later.");
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <>
            <section className="admin-users-section">
                <div className="contain">
                    <h1>Admin Users Data</h1>
                </div>

                {error && <p className="error-message">{error}</p>} {/* Show error message */}

                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Delete</th>
                                <th>Update</th>
                                <th>Username</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5">
                                        <h2>No Users Found</h2>
                                    </td>
                                </tr>
                            ) : (
                                users.map((curUser, index) => {
                                    return (
                                        <tr key={index} className="last">
                                            <td>
                                                <button onClick={() => deleteUser(curUser._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                            <td>Edit</td>
                                            <td>{curUser.username}</td>
                                            <td>{curUser.phone}</td>
                                            <td>{curUser.email}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

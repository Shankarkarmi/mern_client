import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

import "../index.css";

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]); // Fixed typo in setContacts
    const [error, setError] = useState(""); // Added state for error handling

    const { authorizationToken } = useAuth();
    console.log(authorizationToken);

    const getAllContactsData = async () => {
        try {
            const response = await fetch("https://mern01server-production.up.railway.app/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });


            const result = await response.json();

            if(result.data || result.data.length === 0){
                console.log("No contcts found");
                setError("No contacts found in database");
            }else{
                setContacts(result.data);
            }

            if (!response.ok) {
                console.log("Not ok");
                throw new Error(`Error: ${response.status} ${response.statusText}`); // Fixed template string
            }
        } catch (error) {
            console.error("Failed to fetch contacts", error);
            setError("Failed to load contacts. Try again later."); // Fixed error message
        }
    };

      // Delete the user on delete button
      const deleteContact = async (id) => {
        try {
            const response = await fetch(`https://mern01server-production.up.railway.app/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            console.log("Response from server:", response.status, response.statusText); // Log response details
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Deleted contact: ${data}`);
            setContacts(contacts.filter(contacts => contacts._id !== id)); // Remove deleted user from UI
        } catch (error) {
            console.error("Failed to delete Contacts", error);
            setError("Failed to delete Contacts. Try again later.");
        }
    };


    useEffect(() => {
        getAllContactsData();
    }, []); // Dependency array should include authorizationToken

    return (
        <>
            <section className="admin-users-section">
                <div className="contain">
                    <h1>Admin Contacts Data</h1>
                </div>
                    <div className="error">
                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
                    </div>

                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        <h2>No Contacts Found</h2> {/* Display message for no contacts */}
                                    </td>
                                </tr>
                            ) : (
                                contacts.map((curContact, index) => {
                                    return (
                                        <tr key={index} className="last">
                                            <td>{curContact.username}</td>
                                            <td>{curContact.email}</td>
                                            <td>{curContact.message}</td>
                                            <td>Edit</td>
                                            <td>
                                                <button onClick={() => deleteContact(curContact._id)}>
                                                    Delete
                                                </button>
                                            </td>
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

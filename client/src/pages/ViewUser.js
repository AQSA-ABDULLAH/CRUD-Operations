import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./viewusers.module.css";
import Modal from '../components/Model'; // Ensure the correct path
import AddUser from '../components/AddUser';

export default function ViewUsers() {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [timeoutId, setTimeoutId] = useState(null); // Timeout ID for loading duration

    // Function to fetch user data
    const fetchUsers = async () => {
        setLoading(true); // Start loading

        // Set a timeout to ensure loading lasts at least 1 second
        const id = setTimeout(() => {
            setLoading(false); // Set loading to false after the timeout
        }, 1000); // Change this value to increase or decrease the loading time

        setTimeoutId(id); // Save timeout ID

        try {
            const res = await axios.get("http://localhost:5000/api/user/get-users");
            const contactUsData = res.data.data || [];
            setContacts(contactUsData);
        } catch (err) {
            console.error("Error fetching contact data: ", err);
        } finally {
            clearTimeout(timeoutId); // Clear the timeout
            setLoading(false); // End loading
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
        return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.heading}>USER MANAGEMENT</h1>
                <div className={styles.buttons}>
                    <button className={styles.addButton} onClick={openModal}>ADD NEW USER</button>
                </div>
            </header>

            {/* Show loading indicator while fetching data */}
            {loading ? (
                <div className={styles.loadingIndicator}>Loading...</div> // Loading message or spinner
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.table_header}>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((item, index) => (
                                    <tr key={index}>
                                        <td className={styles.contactID}>{item._id}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.age}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No user found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal for Adding User */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AddUser onClose={() => { closeModal(); fetchUsers(); }} /> {/* Refresh data on close */}
            </Modal>
        </div>
    );
}

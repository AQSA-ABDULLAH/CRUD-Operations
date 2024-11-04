import React, { useState } from 'react';
import axios from 'axios';
import styles from "./adduser.module.css"; // CSS file for styles

const AddUser = ({ onClose }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to be sent to the API
        const newUser = { userName, email, age };

        try {
            // Send POST request to the API
            const response = await axios.post("http://localhost:5000/api/user/create-user", newUser);
            console.log("User created successfully: ", response.data);

            // Reset form fields after successful submission
            setUserName('');
            setEmail('');
            setAge('');
            onClose(); // Close the modal after submission
        } catch (error) {
            console.error("Error creating user: ", error);
        }
    };

    return (
        <div>
            <div className={styles.form_header}>
                <button
                    className={styles.closeButton}
                    onClick={() => {
                        console.log('Close button clicked'); // Debugging log
                        onClose(); // Call onClose
                    }}
                >
                    X
                </button>
                <h2>Add New User</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="userName">Name:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
};

export default AddUser;

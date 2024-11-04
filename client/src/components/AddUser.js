import React, { useState } from 'react';
import axios from 'axios';
import styles from "./adduser.module.css"; // CSS file for styles

const AddUser = ({ onClose }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // New loading state for submission

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setErrorMessage('');

        // Validate inputs
        if (!userName || !email || !age) {
            setErrorMessage('All fields are required.');
            return;
        }

        // Validate age
        const ageNum = parseInt(age, 10);
        if (isNaN(ageNum) || ageNum <= 0) {
            setErrorMessage('Age must be a number greater than zero.');
            return;
        }

        // Prepare data to be sent to the API
        const newUser = { userName, email, age: ageNum }; // Store age as a number

        try {
            setIsSubmitting(true); // Set submitting state to true
            setLoading(true); // Set loading state to true

            // Send POST request to the API
            const response = await axios.post("http://localhost:5000/api/user/create-user", newUser);
            console.log("User created successfully: ", response.data);

            // Reset form fields after successful submission
            setUserName('');
            setEmail('');
            setAge('');
            onClose(); // Close the modal after submission
        } catch (error) {
            setErrorMessage('Failed to create user. Please try again later.'); // Set error message
            console.error("Error creating user: ", error);
        } finally {
            setLoading(false); // Reset loading state
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <div>
            <div className={styles.form_header}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
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
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="text"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                {errorMessage && <div className={styles.error}>{errorMessage}</div>} {/* Display error message */}

                <button type="submit" className={styles.submitButton} disabled={loading || isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'} {/* Show loading state */}
                </button>

                {isSubmitting && <div className={styles.loadingIndicator}>Loading...</div>} {/* Loading indicator after submission */}
            </form>
        </div>
    );
};

export default AddUser;


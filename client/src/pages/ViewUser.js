import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./viewusers.module.css";
import Modal from '../components/AddUser'; // Import the Modal component
import AddUser from '../components/AddUser';

export default function ViewUsers() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // GET USER DATA
  useEffect(() => {
    axios.get("http://localhost:5000/api/user/get-users")
      .then(res => {
        const contactUsData = res.data.data || [];
        setContacts(contactUsData);
      })
      .catch(err => {
        console.error("Error fetching contact data: ", err);
      });
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
      
      <div className={styles.tableContainer}>
        <h2 className={styles.sectionHeading}>Manage Users</h2>
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

      {/* Modal for Adding User */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddUser />
      </Modal>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmergencyContacts.css';

function EmergencyContacts() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // Fetch contacts when the component mounts
axios.get(`${process.env.REACT_APP_API_URL}/api/contacts`)
            .then(response => setContacts(response.data))
            .catch(error => console.error("Error fetching contacts:", error));
    }, []);

    const handleAddContact = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/api/contacts`, { name, phone })
            .then(response => {
                setContacts([...contacts, response.data]);
                setName('');
                setPhone('');
            })
            .catch(error => console.error("Error adding contact:", error));
    };

    const handleDeleteContact = (id) => {
        axios.delete(`http://localhost:5001/api/contacts/${id}`)
            .then(() => {
                setContacts(contacts.filter(contact => contact.id !== id));
            })
            .catch(error => console.error("Error deleting contact:", error));
    };

    return (
        <div className="contacts-container">
            <h2>Emergency Contacts</h2>
            <div className="contact-list">
                {contacts.map(contact => (
                    <div key={contact.id} className="contact-item">
                        <div className="contact-info">
                            <p className="contact-name">{contact.name}</p>
                            <p className="contact-phone">{contact.phone}</p>
                        </div>
                        <button onClick={() => handleDeleteContact(contact.id)} className="delete-btn">
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <form onSubmit={handleAddContact} className="add-contact-form">
                <h3>Add New Contact</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    required
                />
                <button type="submit" className="add-btn">Add Contact</button>
            </form>
        </div>
    );
}

export default EmergencyContacts;
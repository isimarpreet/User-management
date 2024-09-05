// EditUser.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EditUser.css'; // Import the CSS file

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    company: { name: '' },
    address: { street: '', city: '' }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
      navigate('/');
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  return (
    <div className="edit-user">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          name="address.street"
          value={user.address.street}
          onChange={handleChange}
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="address.city"
          value={user.address.city}
          onChange={handleChange}
        />
        <button type="submit">Update User</button>
      </form>
      <div className="button-container">
        <Link to="/">Back to List</Link>
      </div>
    </div>
  );
};

export default EditUser;

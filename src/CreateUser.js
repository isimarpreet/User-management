import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateUser.css'; // Import the CSS file

function CreateUser({ onCreate }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipcode: '',
    company: '',
    website: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
      console.log("User created:", response.data);
      if (onCreate) onCreate(response.data);
      navigate('/');
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <div className="create-user-container">
      <div className="create-user-form">
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" name="name" value={user.name} onChange={handleChange} />
          </label>
          <label>Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>
          <label>Phone:
            <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
          </label>
          <label>Address:
            <input type="text" name="address" value={user.address} onChange={handleChange} />
          </label>
          {/* Other fields */}
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;

import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import './UserDetails.css'; // Import the CSS file

import axios from 'axios';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
     <div className="user-details">
    <h1>User Details</h1>
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <td>{user.name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{user.email}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>{user.phone}</td>
        </tr>
        <tr>
        
        </tr>
        <tr>
          <th>Address</th>
          <td>{user.address.street}, {user.address.city}</td>
        </tr>
      </tbody>
    </table>
    <div className="button-container">
      <Link to={`/edit/${user.id}`}>Edit</Link>
      <Link to="/">Back to List</Link>
    </div>
  </div>
  );
}

export default UserDetails;

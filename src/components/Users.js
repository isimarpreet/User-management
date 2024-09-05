// src/components/Users.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './Users.css'; // Import the CSS file

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching users.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${editingUserId}`, newUser)
        .then((response) => {
          const updatedUsers = users.map((user) =>
            user.id === editingUserId ? response.data : user
          );
          setUsers(updatedUsers);
          setIsEditing(false);
          setNewUser({ name: "", email: "", phone: "" });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/users", newUser)
        .then((response) => {
          setUsers([...users, response.data]);
          setNewUser({ name: "", email: "", phone: "" });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleEditClick = (user) => {
    setIsEditing(true);
    setEditingUserId(user.id);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
  };

  const handleDeleteClick = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== userId));
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User List</h1>

      <h2>{isEditing ? "Update User" : "Create New User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newUser.phone}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? "Update User" : "Create User"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/user/${user.id}`}>View Details</Link> {/* Add Link Here */}
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

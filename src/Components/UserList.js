import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const UserList = () => {
  const [users, setUsers] = useState([]); // State for user list
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUsers(users.filter(user => user.id !== id)); // Remove from local state
        alert('User deleted successfully!');
      } catch (err) {
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="user-list">
      <h2>Users</h2>
      <Link to="/create" className="btn btn-primary">Add New User</Link>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link to={`/edit/${user.id}`} className="btn btn-secondary">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
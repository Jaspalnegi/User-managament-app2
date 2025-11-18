import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const UserForm = () => {
  const { id } = useParams(); // For edit mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEdit = !!id; // Check if editing

  // Fetch user data for edit
  useEffect(() => {
    if (isEdit) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
          setFormData({ name: response.data.name, email: response.data.email, phone: response.data.phone });
        } catch (err) {
          setError('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, isEdit]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, formData);
        alert('User updated successfully!');
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/users', formData);
        alert('User created successfully!');
      }
      navigate('/'); // Redirect to home
    } catch (err) {
      setError('Failed to save user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="user-form">
      <h2>{isEdit ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
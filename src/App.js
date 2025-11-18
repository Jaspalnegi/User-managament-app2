import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './Components/UserList';
import UserDetail from './Components/UserDetail';
import UserForm from './Components/UserForm';
import './styles.css'; // Import global styles

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>User Management App</h1>
        </header>
        <main>
          <Routes>
            {/* Home: List of users */}
            <Route path="/" element={<UserList />} />
            {/* Detailed view for a user */}
            <Route path="/user/:id" element={<UserDetail />} />
            {/* Create new user */}
            <Route path="/create" element={<UserForm />} />
            {/* Edit existing user */}
            <Route path="/edit/:id" element={<UserForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    const verifyEmail = async () => {
      if (!token) {
        setMessage('No token provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://ivoire-artisans-server.netlify.app/api/verify-email?token=${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response ? error.response.data.message : 'Error verifying email');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default App;

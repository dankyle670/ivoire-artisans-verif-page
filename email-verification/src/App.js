import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');
    console.log('Token from URL:', tokenFromUrl); // Debugging

    if (!tokenFromUrl) {
      setMessage('No token provided');
      setLoading(false);
    } else {
      setToken(tokenFromUrl);
      setLoading(false);
    }
  }, []);

  const handleVerification = async () => {
    setLoading(true);
    try {
      console.log('Verifying token:', token);
      const response = await axios.get(`https://ivoire-artisans-server.netlify.app/api/verify-email?token=${token}`);
      console.log('Verification response:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error verifying email:', error);
      setMessage(error.response ? error.response.data.message : 'Error verifying email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{message}</p>
          {token ? (
            <button onClick={handleVerification}>
              Verify Email
            </button>
          ) : (
            <p>No token available to verify.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

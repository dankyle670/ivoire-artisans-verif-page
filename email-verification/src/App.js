import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    setToken(token);

    if (!token) {
      setMessage('No token provided');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleVerification = async () => {
    try {
      const response = await axios.get(`https://ivoire-artisans-server.netlify.app/api/verify-email?token=${token}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error verifying email');
    }
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{message}</p>
          {token && (
            <button onClick={handleVerification}>
              Verify Email
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

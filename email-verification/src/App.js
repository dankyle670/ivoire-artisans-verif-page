import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmailToken = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = queryParams.get('token');
      console.log('Token from URL:', tokenFromUrl);

      if (!tokenFromUrl) {
        setMessage('No token provided. Please check your email link.');
        setLoading(false);
        return; // Ajoutez un return ici pour sortir de la fonction
      }

      try {
        const response = await axios.get(`https://ivoire-artisans-server.netlify.app/api/verify-email?token=${tokenFromUrl}`);
        console.log('Verification response:', response.data);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error verifying email:', error);
        setMessage(error.response ? error.response.data.message : 'Error verifying email. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmailToken();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{message}</p>
          {!loading && message && <a href="/">Go back to Home</a>} {/* Redirection vers la page d'accueil */}
        </div>
      )}
    </div>
  );
};

export default App;

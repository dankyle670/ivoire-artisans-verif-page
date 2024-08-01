import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Redirect to the deep link with the token
      window.location.href = `ivoireartisans://verify/email?token=${encodeURIComponent(token)}`;
    } else {
      // Handle invalid token case
      document.body.innerHTML = '<h1>Invalid verification link.</h1>';
    }
  }, []);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};

export default App;

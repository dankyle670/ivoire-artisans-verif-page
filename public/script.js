window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const messageElement = document.getElementById('message');
    const resultElement = document.getElementById('result');

    if (!token) {
      resultElement.textContent = "Token non trouvé dans l'URL.";
      return;
    }

    try {
      const response = await fetch(`https://ivoire-artisans-server.netlify.app/api/verify-email?token=${token}`);
      const data = await response.json();

      if (response.ok) {
        messageElement.textContent = "Votre email a été vérifié avec succès!";
        resultElement.textContent = data.message;
        resultElement.style.color = "green";
      } else {
        messageElement.textContent = "Échec de la vérification.";
        resultElement.textContent = data.message || "Une erreur est survenue lors de la vérification.";
        resultElement.style.color = "red";
      }
    } catch (error) {
      messageElement.textContent = "Erreur de connexion au serveur.";
      resultElement.textContent = "Veuillez réessayer plus tard.";
      resultElement.style.color = "red";
    }
  };

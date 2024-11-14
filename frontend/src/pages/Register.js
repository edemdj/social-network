import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Assurez-vous que le CSS est importé

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Message d'erreur pour les retours utilisateur
  const navigate = useNavigate();

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation basique des champs
    if (!username || !email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/login');  // Redirection vers la page de connexion
      } else {
        setErrorMessage(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Message d'erreur */}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;

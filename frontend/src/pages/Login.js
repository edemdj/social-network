import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Hook pour la redirection

    // Gestion de la soumission du formulaire de connexion
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Requête API pour la connexion
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user_id', data.user_id);  // Stocke l'ID utilisateur
                localStorage.setItem('token', data.token);  // Stocke le token d'authentification
                navigate('/');  // Redirection vers la page d'accueil après la connexion
            } else {
                setErrorMessage('Erreur de connexion. Veuillez vérifier vos identifiants.');  // Message d'erreur utilisateur
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Icône pour afficher ou masquer le mot de passe */}
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                        }}
                    >
                        <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                    </span>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Affichage du message d'erreur */}
                <button type="submit">Se connecter</button>
            </form>
            <p>Vous n'avez pas de compte? <a href="/register">Inscrivez-vous</a></p>
        </div>
    );
};

export default Login;

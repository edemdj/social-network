import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/login');
    };

    return <button onClick={handleLogout}>Se déconnecter</button>;
    
};

export default LogoutButton;
import React, { useState } from 'react';
import { searchPortfoliosByTheme } from '../services/portfolioService';

const PortfolioSearch = () => {
    // Définition des états pour le thème, les résultats et les erreurs
    const [theme, setTheme] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    // Liste des thèmes disponibles
    const themes = [
        'Développeur Frontend', 
        'Développeur Backend', 
        'Développeur Full Stack', 
        'Cybersécurité', 
        'Intelligence Artificielle', 
        'AR VR', 
        'Blockchain'
    ];

    // Fonction de gestion de la recherche
    const handleSearch = async () => {
        if (!theme) {
            setError('Veuillez sélectionner un thème.');
            return;
        }
        
        try {
            // Appel au service pour rechercher les portfolios par thème
            const data = await searchPortfoliosByTheme(theme);
            setResults(Array.isArray(data) ? data : []);
            setError('');
        } catch (error) {
            // Gestion des erreurs de réponse
            setError(error.response ? error.response.data : 'Une erreur est survenue');
            setResults([]);
        }
    };

    return (
        <div>
            <h2>Trouver des portfolios</h2>
            
            {/* Menu déroulant pour sélectionner un thème */}
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">Sélectionner un thème</option>
                {themes.map((theme) => (
                    <option key={theme} value={theme}>
                        {theme}
                    </option>
                ))}
            </select>

            {/* Bouton pour lancer la recherche */}
            <button onClick={handleSearch}>Rechercher</button>

            {/* Message d'erreur en cas de problème */}
            {error && <p className="error-message">{error}</p>}

            {/* Message si aucun résultat n'est trouvé */}
            {results.length === 0 && !error && theme && (
                <p>Aucun portfolio trouvé pour le thème sélectionné.</p>
            )}

            {/* Liste des résultats */}
            <ul>
                {results.map((portfolio) => (
                    <li key={portfolio.id} className="result-card">
                        <a href={portfolio.links} target="_blank" rel="noopener noreferrer">
                            {portfolio.links}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PortfolioSearch;

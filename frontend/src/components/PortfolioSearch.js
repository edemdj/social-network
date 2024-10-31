import React, { useState } from 'react';
import { searchPortfoliosByTheme } from '../services/portfolioService';
import Comments from './Comments';
const PortfolioSearch = () => {
    const [theme, setTheme] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const themes = ['Développeur Frontend', 'Développeur backend', 'Développeur Full Stack', 'Cybersécurité', 'Intelligence Artificielle', 'AR VR', 'Blockchain', ];

    const handleSearch = async () => {
        if (!theme) {
            setError('Veuillez sélectionner un thème.');
            return;
        }
        try {
            const data = await searchPortfoliosByTheme(theme);
            setResults(Array.isArray(data) ? data : []);
            setError('');
        } catch (error) {
            setError(error.response ? error.response.data : 'Une erreur est survenue');
            setResults([]);
        }
    };

    return (
        <div>
            <h2>Trouver des portfolios par thème</h2>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">Sélectionner un thème</option>
                {themes.map((theme) => (
                    <option key={theme} value={theme}>
                        {theme}
                    </option>
                ))}
            </select>
            <button onClick={handleSearch}>Rechercher</button>
            {error && <p>{error}</p>}
            {results.length === 0 && !error && theme && (
                <p>Aucun portfolio trouvé pour le thème sélectionné.</p>
            )}
            <ul>
                {results.map((portfolio) => (
                    <li key={portfolio.id}>
                        <a href={portfolio.links} target="_blank" rel="noopener noreferrer">
                            {portfolio.links}
                        </a>
                    </li>
                ))}
            </ul>
            <Comments portfolioId={1} userId={1} />
        </div>
    );
};

export default PortfolioSearch;
import React, { useState } from 'react';
import { searchPortfoliosByTheme } from '../services/portfolioService';

const PortfolioSearch = () => {
    const [theme, setTheme] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const themes = ['Art', 'Technologie', 'Science', 'Music', 'Literature', 'Sports', 'Nourriture', 'Santé', 'Business', 'Education', 'Bourse', 'Autre'];

    const handleSearch = async () => {
        try {
            const data = await searchPortfoliosByTheme(theme);
            setResults(Array.isArray(data) ? data : []); // Ensure data is an array
            setError('');
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
            setResults([]); // Set results to an empty array on error
        }
    };

    return (
        <div>
            <h2>Trouver des portfolios par thème</h2>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">Select a theme</option>
                {themes.map((theme) => (
                    <option key={theme} value={theme}>
                        {theme}
                    </option>
                ))}
            </select>
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            <ul>
            {results.map((portfolio) => (
                <li key={portfolio.id}>
                {portfolio.links} {/* Affiche le lien du portfolio */}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default PortfolioSearch;
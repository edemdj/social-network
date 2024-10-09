import React, { useState } from 'react';
import { searchPortfoliosByTheme } from '../services/portfolioService';

const PortfolioSearch = () => {
    const [theme, setTheme] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const data = await searchPortfoliosByTheme(theme);
            setResults(data);
            setError(''); // Clear any previous error
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
            setResults([]);
        }
    };

    return (
        <div>
            <h2>Search Portfolios by Theme</h2>
            <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Enter theme"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            <ul>
                {results.map((portfolio) => (
                    <li key={portfolio.id}>{portfolio.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PortfolioSearch;
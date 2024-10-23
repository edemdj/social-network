import axios from './axiosConfig';

export const searchPortfoliosByTheme = async (theme) => {
    try {
        const response = await axios.get('/portfolio/search', {
            params: { theme }, // Ajoute le paramètre theme à la requête
        });
        console.log(response.data);
        return response.data; // Renvoie les résultats de l'API
    } catch (error) {
        console.error('Erreur lors de la recherche des portfolios :', error);
        throw error; // Gestion des erreurs
    }
};

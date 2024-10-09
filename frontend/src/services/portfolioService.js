import axios from 'axios';

export const searchPortfoliosByTheme = async (theme) => {
    try {
        const response = await axios.get(`/api/portfolio/search`, {
            params: { theme }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
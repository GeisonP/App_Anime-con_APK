import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

function formatReleaseDate(original_date: string) {
    if (!original_date) return 'Ongoing';
    
    let months = [
        { id: 1, name: "enero" },
        { id: 2, name: "febrero" },
        { id: 3, name: "marzo" },
        { id: 4, name: "abril" },
        { id: 5, name: "mayo" },
        { id: 6, name: "junio" },
        { id: 7, name: "julio" },
        { id: 8, name: "agosto" },
        { id: 9, name: "septiembre" },
        { id: 10, name: "octubre" },
        { id: 11, name: "noviembre" },
        { id: 12, name: "diciembre" },
    ];

    let datePart = original_date.split('T')[0];
    let array_date = datePart.split("-");
    let year = array_date[0];
    let month_id = parseInt(array_date[1]);
    let day = array_date[2];

    let month = months.find(element => element.id === month_id);
    
    if (month) {
        return `${day} de ${month.name} de ${year}`;
    }
    return original_date;
}

export default {
    async getAnimes(page: number = 1, limit: number = 10) {
        try {
            const response = await axios.get(`${BASE_URL}/anime?page=${page}&limit=${limit}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching animes:', error);
            throw error;
        }
    },
    async getAnimeDetails(animeId: number) {
        try {
            const response = await axios.get(`${BASE_URL}/anime/${animeId}`);
            const anime = response.data.data;
            anime.aired.from = formatReleaseDate(anime.aired.from);
            anime.aired.to = anime.aired.to ? formatReleaseDate(anime.aired.to) : 'Ongoing';
            return anime;
        } catch (error) {
            console.error('Error fetching anime details:', error);
            throw error;
        }
    },
    async getGenres() {
        try {
            const response = await axios.get(`${BASE_URL}/genres/anime`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching genres:', error);
            throw error;
        }
    },
    async getAnimesByGenre(genreId: number, page: number = 1, limit: number = 10) {
        try {
            const response = await axios.get(`${BASE_URL}/anime?genres=${genreId}&page=${page}&limit=${limit}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching animes:', error);
            throw error;
        }
    }
};
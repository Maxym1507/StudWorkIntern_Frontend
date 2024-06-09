import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7159/api', // Замініть на вашу базову URL
});

export default api;

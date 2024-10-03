import axios from 'axios';
import { API_HOST, API_PORT } from '../config/config';
import { useAuth } from '@/hooks/useAuth';

const API_URLS = {
  portfolio: `${API_HOST}:${API_PORT}/api/portfolio`,
  valorizacionDiaria: (portfolioId: number) => `${API_HOST}:${API_PORT}/api/valorizacion-diaria/${portfolioId}`,
  activos: (portfolioId: number) => `${API_HOST}:${API_PORT}/api/activos/${portfolioId}`
};

const useApi = () => {
  const { getAccessTokenSilently } = useAuth();

  const getAuthHeaders = async () => {
    try {
      const token = await getAccessTokenSilently();
      return {
        Authorization: `Bearer ${token}`
      };
    } catch (error) {
      console.error("Error getting access token", error);
      return {};
    }
  };

  const fetchPortfolio = async () => {
    const headers = await getAuthHeaders();
    const response = await axios.get(API_URLS.portfolio, { headers });
    return response.data;
  };

  const fetchValorizacionDiaria = async (portfolioId: number) => {
    const headers = await getAuthHeaders();
    const response = await axios.get(API_URLS.valorizacionDiaria(portfolioId), { headers });
    return response.data;
  };

  const fetchActivos = async (portfolioId: number) => {
    const headers = await getAuthHeaders();
    const response = await axios.get(API_URLS.activos(portfolioId), { headers });
    return response.data;
  };

  return {
    fetchPortfolio,
    fetchValorizacionDiaria,
    fetchActivos
  };
};

export default useApi;


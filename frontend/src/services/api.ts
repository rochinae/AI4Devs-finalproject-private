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
      console.log("Getting access token...");
      const token = await getAccessTokenSilently();
      console.log("Access token received:", token ? "Token present" : "No token");
      return {
        Authorization: `Bearer ${token}`
      };
    } catch (error) {
      console.error("Error getting access token", error);
      return {};
    }
  };

  const fetchPortfolio = async () => {
    console.log("Fetching portfolio...");
    const headers = await getAuthHeaders();
    const response = await axios.get(API_URLS.portfolio, { headers });
    console.log("Portfolio response:", response.data);
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

  export const getAssetOperations = async (portfolioId: number, assetId: number): Promise<{
    assetName: string;
    assetTicker: string;
    operations: AssetOperation[];
  }> => {
    const response = await axios.get(`${API_HOST}:${API_PORT}/api/activos/${portfolioId}/${assetId}/operations`);
    return response.data;
  };

  return {
    fetchPortfolio,
    fetchValorizacionDiaria,
    fetchActivos
  };
};

export default useApi;

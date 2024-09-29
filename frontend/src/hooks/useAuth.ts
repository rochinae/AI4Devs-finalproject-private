import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from 'axios';

export const useAuth = () => {
  const { 
    isAuthenticated, 
    getAccessTokenSilently, 
    loginWithRedirect, 
    logout, 
    user 
  } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        }
      } catch (error) {
        console.error("Error getting access token", error);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const authenticatedRequest = async (url: string, options: any = {}) => {
    if (!accessToken) {
      throw new Error('No access token available');
    }
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
    return axios(url, { ...options, headers });
  };

  return {
    isAuthenticated,
    accessToken,
    user,
    login: loginWithRedirect,
    logout: () => logout({ returnTo: window.location.origin }),
    authenticatedRequest,
  };
};
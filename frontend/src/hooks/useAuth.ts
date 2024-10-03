import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

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

  return {
    isAuthenticated,
    accessToken,
    user,
    login: loginWithRedirect,
    logout: () => logout({ returnTo: window.location.origin }),
    getAccessTokenSilently,
  };
};
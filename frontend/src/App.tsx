import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import { Auth0Provider } from "@auth0/auth0-react";
import { auth0Config } from "./config/auth0";

export default function App() {
    return (
        <Auth0Provider
            domain={auth0Config.domain}
            clientId={auth0Config.clientId}
            authorizationParams={{
                redirect_uri: auth0Config.redirectUri,
                audience: auth0Config.audience,
            }}
        >
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Auth0Provider>
    )
}

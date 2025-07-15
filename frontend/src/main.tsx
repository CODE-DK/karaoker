import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { CustomThemeProvider } from "./shared/theme/ThemeContext";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import { SearchProvider } from "./features/search/context/SearchContext";
import { FavoritesProvider } from "./features/favorites/context/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <FavoritesProvider>
          <CustomThemeProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </CustomThemeProvider>
        </FavoritesProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>,
);

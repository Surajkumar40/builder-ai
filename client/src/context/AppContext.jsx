import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {
  // Auth states
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Check the session once when the app loads
  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const { data } = await api.get("/api/auth/me");
        if (!cancelled) setUser(data.user ?? null);
      } catch (error) {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoadingUser(false);
      }
    };

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        setLoadingUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {
  const navigate = useNavigate();

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

  // Auth actions
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      setUser(data.user);
      toast.success("Welcome back");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.error || "Invalid email or password";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setUser(data.user);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage =
        error.response?.data?.error || "Registration failed";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        setLoadingUser,
        login,
        register,
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
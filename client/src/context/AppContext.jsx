import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {
  const navigate = useNavigate();

  //  states
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState();
// States 
  const[projects, setProjects] = useState();
  const[loadingProject, setLoadingProject] = useState(true);
  const[activeProject, setActiveProject] = useState([])
  const[loadingActiveProject, setLoadingActiveProject] = useState(true);
  const[chatloading, setChatLoading] = useState(false);
  const[generatingProject, setGeneratingProject] = useState(false);
  const[activeFile, setActiveFile] = useState("/App.js");
  // const[showCode, setShowCode] = useState(false);
  


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

  const logout = async () => {
    try{
      await api.post("/api/auth/logout");
      setUser(null)
      setProjects([])
      setActiveProject(null)
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // Projects Actions
  const loadProjects = async () => {
    if(!user) return;
    try{
      const {data} = await api.get("/api/projects");
      setProjects(data.projects);
    } catch (error) {
      console.error("Failed to load projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoadingProject(false);
    }
  };
  
  const loadProject = async (id, silent = false)  => {
      if(!user) return;
      if(!silent) setLoadingActiveProject(true);
      try{
        const {data} = await api.get(`/api/projects/${id}`);
        setActiveProject(data.project);

        // Default file selection 
        const files = object.Keys(data.files)
        if(files. length > 0){
          setActiveFile((prev) => {
            if(files.includes(prev)) return prev;
            return files[0];
          }) }
      } catch (error) {
        console.error("Failed to load project:", error);
        toast.error("Failed to load project");
        navigate("/")
      } finally {
        if(!silent) setLoadingActiveProject(false);
      }
  }

  // Automatically poll active project status if it's generating
  useEffect(() => {
    if(activeProject?.id || !user) return;
const isOngoing = activeProject.status === "generating" || activeProject.status === "pending" || activeProject.status === "revising";

if(isOngoing){
  setChatLoading(true);
  const interval = setInterval(() => {
    loadProject(activeProject.id, true);
  }, 2000)
  return () => clearInterval(interval);
} else {
  setChatLoading(false);
}

  },[activeProject?.id, activeProject?.status, loadProject, user])

  const handleGenerate = useCallback(async (projectId, prompt) => {
    if(!user) return;
    setGeneratingProject(true);
    try{
      await api.post(`/api/projects/${projectId}/generate`, {prompt});
      toast.success("AI Agent is planning structure and generating code. This may take a few minutes...");
      navigate(`builder/${data.id}`);
    } catch (error) {
      console.error("Failed to generate project:", error);
      toast.error("Failed to generate project");
    } finally {
      setGeneratingProject(false);
    }
  }, [navigate, user]);


  const handleDelete = useCallback(async ( id) => {
    if(!user) return;
    setGeneratingProject(true);
    try{
      await api.delete(`/api/projects/${id}/generate`, {prompt});
      setProjects((prev) => prev.filter((project) => project.id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project");
    } 
  }, [user]);


  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        setLoadingUser,
        login,
        register,
        projects,
        loadingProject,
        activeProject,
        loadingActiveProject,
        chatloading,
        generatingProject,
        activeFile,
        showCode,
        loadProjects,
        loadProject,
        handleGenerate,
        handleDelete,

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
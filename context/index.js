
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  // Track whether authentication has been restored
  const [authLoaded, setAuthLoaded] = useState(false);

  const router = useRouter();

  // Restore authentication state from localStorage
  useEffect(() => {
    try {
      const auth = window.localStorage.getItem("auth");

      if (auth) {
        const parsedAuth = JSON.parse(auth);

        setState({
          user: parsedAuth.user || {},
          token: parsedAuth.token || "",
        });
      }
    } catch (error) {
      console.error("Error restoring authentication:", error);
      window.localStorage.removeItem("auth");
    } finally {
      setAuthLoaded(true);
    }
  }, []);

  // Configure Axios
  const token = state?.token || "";

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";

  // Handle unauthorized API responses
  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setState({
            user: {},
            token: "",
          });

          window.localStorage.removeItem("auth");

          if (router.pathname !== "/login") {
            router.push("/login");
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, [router]);

  return (
    <UserContext.Provider
      value={[state, setState, authLoaded]}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

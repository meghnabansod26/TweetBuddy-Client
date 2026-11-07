import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  const router = useRouter();

  // Restore authentication state after the browser loads
  useEffect(() => {
    try {
      const auth = window.localStorage.getItem("auth");

      if (auth) {
        setState(JSON.parse(auth));
      }
    } catch (error) {
      console.error("Error restoring authentication:", error);
      window.localStorage.removeItem("auth");
    }
  }, []);

  const token = state?.token || "";

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";

  // Register the response interceptor only once per effect lifecycle
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
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

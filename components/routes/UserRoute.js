
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { UserContext } from "../../context";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const [state, , authLoaded] = useContext(UserContext);

  useEffect(() => {
    if (!authLoaded) return;

    // Check whether the user is authenticated
    if (!state?.token) {
      setLoading(false);
      router.replace("/login");
      return;
    }

    let cancelled = false;

    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get("/current-user");

        console.log("Current user response:", data);

        if (!cancelled) {
          if (data.ok) {
            setOk(true);
          } else {
            router.replace("/login");
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);

        if (!cancelled) {
          router.replace("/login");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    getCurrentUser();

    return () => {
      cancelled = true;
    };
  }, [authLoaded, state?.token]);

  // Show loader while authentication is being checked
  if (!authLoaded || loading) {
    return (
      <SyncOutlined
        spin
        className="d-flex justify-content-center display-1 text-primary p-5"
      />
    );
  }

  // Render protected content only after successful authentication
  return ok ? <>{children}</> : null;
};

export default UserRoute;

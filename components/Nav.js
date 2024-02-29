import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Avatar } from "antd";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav className="nav d-flex justify-content-between nav-col">
      <Link href="/" legacyBehavior>
        <a
          className={`nav-link text-light logo ${current === "/" && "active"}`}
        >
          <Avatar src="/images/logo.png" />
          <strong> TweetBuddy</strong>
        </a>
      </Link>

      {state !== null ? (
        <>
          <div className="dropdown">
            <a
              className="btn dropdown-toggle text-light"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link href="/user/dashboard" legacyBehavior>
                  <a
                    className={`nav-link dropdown-item ${
                      current === "/user/dashboard" && "active"
                    }`}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/user/profile/update" legacyBehavior>
                  <a
                    className={`nav-link dropdown-item ${
                      current === "/user/profile/update" && "active"
                    }`}
                  >
                    Profile
                  </a>
                </Link>
              </li>

              {state.user.role === "Admin" && (
                <li>
                  <Link href="/admin" legacyBehavior>
                    <a
                      className={`nav-link dropdown-item ${
                        current === "/admin" && "active"
                      }`}
                    >
                      Admin
                    </a>
                  </Link>
                </li>
              )}

              <li>
                <a onClick={logout} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Link href="/login" legacyBehavior>
            <a
              className={`nav-link text-light ${
                current === "/login" && "active"
              }`}
            >
              <strong> Login</strong>
            </a>
          </Link>

          <Link href="/register" legacyBehavior>
            <a
              className={`nav-link text-light ${
                current === "/register" && "active"
              }`}
            >
              <strong> Register</strong>
            </a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;

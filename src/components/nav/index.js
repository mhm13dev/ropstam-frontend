import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Nav = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  function logout() {
    auth.setJwt("logged_out");
    auth.setUser(null);
    navigate("/");
  }

  return auth.user ? (
    <div className="app-container p-4">
      <nav className="flex space-x-4 text-indigo-500 justify-center items-center">
        <Link to="/dashboard" className="underline">
          Dashboard
        </Link>
        <Link to="/categories" className="underline">
          Categories
        </Link>
        <Link to="/cars" className="underline">
          Cars
        </Link>

        <button
          className="appearance-none text-red-500 px-3 py-1 border border-red-500 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
    </div>
  ) : null;
};

export default Nav;

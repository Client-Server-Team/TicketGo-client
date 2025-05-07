import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // true jika ada token, false jika tidak
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="navbar max-w-screen-xl mx-auto px-4 justify-between">
        <div className="flex-1 flex items-center gap-0">
          <Link to="/" className="btn btn-ghost text-3xl font-bold px-1">
          <img src="/logoweb.png" alt="logo.png" className="w-8 h-8" />
            TicketGo!
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Link
              to="/mytickets"
              className="text-sm text-base-content hover:underline"
            >
              My Tickets
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn text-sm bg-red-500 hover:bg-red-600 text-white border-none"
            >
              Logout <i className="bi bi-box-arrow-right ms-1"></i>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="btn text-sm bg-blue-500 hover:bg-blue-800 text-white border-none"
            >
              Login <i className="bi bi-box-arrow-in-right ms-1"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

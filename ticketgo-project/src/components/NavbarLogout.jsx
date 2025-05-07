import { Link, NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-screen-xl mx-auto px-4 justify-between">
        <div className="flex-1 flex items-center gap-0">
          <Link to="/" className="btn btn-ghost text-xl px-1">
            TicketGo!
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/mytickets"
            className="text-sm text-base-content hover:underline"
          >
            ✎ My Tickets
          </Link>
          <button
            className="btn text-sm bg-red-500 hover:bg-red-600 text-white border-none justify-center"
            onClick={handleLogout}
          >
            Logout <i className="bi bi-box-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

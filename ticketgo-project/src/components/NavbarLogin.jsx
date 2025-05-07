import { Link, NavLink, useNavigate } from "react-router";

export default function NavbarLogin() {
  const navigate = useNavigate();

  async function handleLogin() {
    navigate("/login");
  }

  return (
    <div className="bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="navbar max-w-screen-xl mx-auto px-4 justify-between">
        <div className="flex-1 flex items-center gap-0">
          <Link to="/" className="btn btn-ghost text-3xl font-bold px-1">
            TicketGo!
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/mytickets"
            className="text-sm text-base-content hover:underline"
          >
            My Tickets
          </Link>
          <button
            className="btn text-sm bg-blue-500 hover:bg-blue-800 text-white border-none justify-center"
            onClick={handleLogin}
          >
            Login <i className="bi bi-box-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

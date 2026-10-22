import { Link, NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Plus, LogOut } from "lucide-react";

function Navbar() {
  const { token, loggedUser } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInitial = () => {
    if (loggedUser?.name) {
      return loggedUser.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    navigate("/auth/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-lg font-bold">
          ShortLink
        </Link>
        {token && (
          <div className="hidden items-center gap-6 text-sm md:flex">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }
            >
              Analytics
            </NavLink>
            <NavLink
              to="/create-link"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }
            >
              Links
            </NavLink>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        {token ? (
          <>
            <Link
              to="/create-link"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Create New Link
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
              {loggedUser?.photo ? (
                <img
                  src={loggedUser.photo}
                  alt={loggedUser.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                getInitial()
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-gray-100 hover:text-slate-900"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Plus, LogOut } from "lucide-react";

function Navbar() {
  const { token, loggedUser } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getInitial = () => {
    if (loggedUser?.name) {
      return loggedUser.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleLogout = () => {
    dispatch({ type: "user/logout" });
    navigate("/auth/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
              className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 md:flex"
            >
              <Plus className="h-4 w-4" />
             Links
            </Link>

            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white md:flex">
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
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-gray-100 hover:text-slate-900 md:flex"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>

            <div className="relative md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {loggedUser?.photo ? (
                  <img
                    src={loggedUser.photo}
                    alt={loggedUser.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  getInitial()
                )}
              </button>

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={closeMenu}
                  ></div>
                  <div className="absolute right-0 top-12 z-50 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                    <div className="border-b border-gray-200 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">
                        {loggedUser?.name || "User"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {loggedUser?.email || "user@example.com"}
                      </p>
                    </div>

                    <div className="py-2">
                      <NavLink
                        to="/dashboard"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm ${
                            isActive
                              ? "bg-blue-50 font-semibold text-blue-600"
                              : "text-slate-700 hover:bg-gray-50"
                          }`
                        }
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/analytics"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm ${
                            isActive
                              ? "bg-blue-50 font-semibold text-blue-600"
                              : "text-slate-700 hover:bg-gray-50"
                          }`
                        }
                      >
                        Analytics
                      </NavLink>
                      <NavLink
                        to="/create-link"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm ${
                            isActive
                              ? "bg-blue-50 font-semibold text-blue-600"
                              : "text-slate-700 hover:bg-gray-50"
                          }`
                        }
                      >
                       Link
                      </NavLink>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 md:px-4"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 md:px-4"
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

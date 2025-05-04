import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useUserStore } from "@/stores/userStore/userInfoStore";
import {
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { megaMenuItems } from "@/contexts/MegaMenuConfig";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const user = useUserStore((state) => state.userInfo);
  const setUser = useUserStore((state) => state.setUser);
  const signOut = useUserStore((state) => state.clearAuth);
  const userRole = user?.role ?? "guest";
  const navigate = useNavigate();
  // Only show items the current role is allowed to see:
  const allowedItems = megaMenuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const handleLogout = () => {
    signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("user_Info");
    navigate("/login");
  }

  useEffect(() => {
    const h = () => {
      setMegaMenuOpen(false);
      setNotificationOpen(false);
      setProfileOpen(false);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Links */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              Logo
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMegaMenuOpen((o) => !o);
                    setNotificationOpen(false);
                    setProfileOpen(false);
                  }}
                  className="inline-flex items-center px-3 font-medium text-gray-700 pt-1 hover:text-primary"
                >
                  Menu
                  <ChevronDownIcon
                    className={`ml-1 h-4 w-4 transition-transform ${
                      megaMenuOpen ? "rotate-180 transform" : ""
                    }`}
                  />
                </button>
                {megaMenuOpen && (
                  <div className="absolute left-0 z-10 mt-2 w-screen max-w-md px-2 lg:max-w-3xl">
                    <div className="grid gap-6 p-6 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 lg:grid-cols-2 bg-background">
                      {allowedItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block p-3 rounded-md hover-bg-card transition"
                        >
                          <p className="font-medium text-primary">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm text-secondary">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <NavLink
                to="/"
                id="home"
                className={({ isActive }) =>
                  `inline-block px-3 py-1 border-b-2 text-primary
     ${
       isActive
         ? "border-indigo-500"
         : "border-transparent hover:text-primary"
     }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `inline-block px-3 py-1 border-b-2 text-primary
     ${
       isActive
         ? "border-indigo-500"
         : "border-transparent hover:text-primary"
     }`
                }
              >
                About
              </NavLink>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center">
            {/* theme switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-secondary hover:text-primary focus:outline-none"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* notifications */}
            <div className="relative ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationOpen((o) => !o);
                  setMegaMenuOpen(false);
                  setProfileOpen(false);
                }}
                className="p-1 rounded-full hover:text-primary focus:outline-none text-primary"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
              </button>
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-background py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-primary">
                      Notifications
                    </p>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {[1, 2, 3].map((n) => (
                      <Link
                        key={n}
                        to={`/notifications/${n}`}
                        className="block px-4 py-3 text-sm text-primary hover-bg-card"
                      >
                        Notification {n}
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/notifications"
                    className="block px-4 py-2 text-sm text-indigo-600 text-center hover-bg-card"
                  >
                    View all
                  </Link>
                </div>
              )}
            </div>
            {/* profile */}
            <div className="relative ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen((o) => !o);
                  setMegaMenuOpen(false);
                  setNotificationOpen(false);
                }}
                className="flex items-center focus:outline-none text-primary"
              >
                {/* <img
                  className="w-7 h-7 rounded-full "
                  src={
                    user.avatarUrl
                      ? user.avatarUrl
                      : "/assets/react.svg"
                  }
                /> */}
                <ChevronDownIcon
                  className={`ml-1 h-4 w-4 transition-transform ${
                    profileOpen ? "rotate-180 transform" : ""
                  }`}
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background rounded-md py-1 p-4 z-50 border border-gray-200 shadow-lg">
                  <span className="block px-4 py-2 text-sm text-primary font-medium border-b-1 border-gray-200">
                    {user ? `Hello, ${user.name}` : "Not logged in"}
                  </span>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-primary hover-bg-card"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-primary hover-bg-card"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-primary hover-bg-card"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>

            {/* mobile menu button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="p-2 rounded-md text-primary hover:text-primary focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background">
          {/* Mobile links (use same semantic classes) */}
          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-primary hover-bg-card"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 text-base font-medium text-primary hover-bg-card"
          >
            Products
          </Link>
        </div>
      )}
    </nav>
  );
}

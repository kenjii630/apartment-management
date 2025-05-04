// src/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BuildingOffice2Icon,
  TruckIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";
import { useUserStore } from "@/stores/userStore/userInfoStore";
export default function Sidebar({ open, setOpen }) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navItems = [
    { key: "home", to: "/", icon: HomeIcon, badge: null },
    { key: "rooms", to: "/rooms", icon: BuildingOffice2Icon, badge: 24 },
    { key: "parking", to: "/parking", icon: TruckIcon, badge: 12 },
    { key: "owners", to: "/owners", icon: UserGroupIcon, badge: null },
  ];

  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const signOut = useUserStore((state) => state.clearAuth);
  const handleLogout = () => {
    signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("user_Info");
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <>
      {/* Toggle Button */}
      <button
        type="button"
        className={`top-3 p-2 rounded-md absolute z-100 transform transition-transform
          ${open ? "translate-x-0 left-48" : "-translate-x-full left-14"}`}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <XMarkIcon className="h-6 w-6 text-primary" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-primary" />
        )}
      </button>
      <div
        className={`absolute items-center border-b-1 border-gray-200 top-15 w-64 z-100 dark:border-gray-700 transform transition-transform ${
          open ? "translate-x-0 hidden" : "-translate-x-full left-19"
        }`}
      ></div>

      <nav
        className={`top-20 rounded-md absolute z-100 transform transition-transform bg-background duration-700
            ${open ? "hidden" : "-translate-x-full left-15"}`}
      >
        {navItems.map(({ key, to, icon: Icon, badge }) => (
          <NavLink
            key={key}
            to={to}
            end
            className={({ isActive }) =>
              `group flex items-center p-2 mb-4 text-sm font-medium rounded-md text-primary ${
                {
                  true: "bg-blue-100 dark:bg-amber-200",
                  false: " hover:bg-blue-100 dark:hover:bg-gray-700",
                }[isActive]
              }`
            }
          >
            <Icon className="h-7 w-7 flex-shrink-0 stroke-gray-600 stroke-grey-300 group-hover:stroke-blue-600" />
            {/* <span className="ml-3 flex-1">{t(key)}</span> */}
            {/* {badge != null && (
                <span className="ml-2 inline-block rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5">
                  {badge}
                </span>
              )} */}
          </NavLink>
        ))}
      </nav>

      {/* backdrop on mobile */}
      {/* <div
        className={`fixed inset-0 z-100 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      /> */}
      <aside
        className={`
          h-full
          transform transition-transform shadow-md bg-background
          ${open ? "translate-x-0 w-64 block" : "-translate-x-full w-19"}
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center px-6 py-4 border-b-1 border-gray-200 dark:border-gray-700 transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full hidden"
          }`}
        >
          <h1 className="text-lg font-bold text-primary">{t("branding")}</h1>
        </div>

        {/* Navigation Items */}
        <nav
          className={`mt-4 flex-1 px-2 space-y-1 overflow-y-auto transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full hidden"
          }`}
        >
          {navItems.map(({ key, to, icon: Icon, badge }) => (
            <NavLink
              key={key}
              to={to}
              end
              className={({ isActive }) =>
                `group flex items-center px-4 py-2 text-sm font-medium rounded-md text-primary ${
                  {
                    true: "bg-blue-100 dark:bg-amber-200",
                    false: " hover:bg-blue-100 dark:hover:bg-gray-700",
                  }[isActive]
                }`
              }
            >
              <Icon className="h-7 w-7 flex-shrink-0 flex-shrink-0 stroke-gray-600 stroke-grey-300 group-hover:stroke-blue-600" />
              <span className="ml-3 flex-1">{t(key)}</span>
              {badge != null && (
                <span className="ml-2 inline-block rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div
          className={`absolute bottom-0 w-full px-6 py-4 border-t dark:border-gray-700 transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full hidden"
          }`}
        >
          {/* <NavLink
            to="/settings"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Cog6ToothIcon className="h-5 w-5" />
            <span className="ml-3">{t("settings")}</span>
          </NavLink> */}
          <div className="mt-4 flex items-center px-4">
            {/* <img
              src="/path/to/avatar.jpg"
              alt="Admin"
              className="h-8 w-8 rounded-full"
            /> */}
            <div className="">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {t("adminName")}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                admin@example.com
              </p>
            </div>
          </div>
          <div className="my-4 flex items-center justify-start pl-3">
            <button
              onClick={() => changeLanguage("en")}
              className={`px-2 py-1 rounded ${
                i18n.language === "en" ? "bg-main text-primary" : ""
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("zh")}
              className={`px-2 mr-3 py-1 rounded ${
                i18n.language.startsWith("zh") ? "bg-main text-primary" : ""
              }`}
            >
              中文
            </button>
            |{/* theme switch */}
            <button
              onClick={toggleTheme}
              className="p-1 px-2 ml-3 rounded bg-main text-primary hover:text-primary focus:outline-none "
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
          

          <button
            onClick={() => {
              handleLogout();
            }}
            className="mt-3 w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            <span className="ml-3">{t("logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

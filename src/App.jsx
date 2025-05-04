// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import routes from "../src/routes/index.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../src/components/SideBar.jsx";
import { useUserStore } from "../src/stores/userStore/userInfoStore";

function AppContent() {
  const setAuth = useUserStore((s) => s.setAuth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Rehydrate auth state on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh_token");
    const userInfo = localStorage.getItem("userInfo");
    if (token && userInfo) {
      setAuth({
        userInfo: JSON.parse(userInfo),
        token,
        refreshToken: refresh,
      });
    }
  }, [setAuth]);

  // determine if sidebar should show
  const hideSidebarOn = ["/login", "/register", "/forgot-password"];
  const showSidebar = !hideSidebarOn.includes(location.pathname);

  return (
    <div className="flex h-screen bg-main text-primary transition-colors">
      {showSidebar && (
        <div className="shadow-md bg-background">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
      )}
      <main
        className={`
          flex-1 overflow-auto transition-all duration-1000 ease-in-out
          ${showSidebar && sidebarOpen ? "ml-0" : "ml-0"}
        `}
      >
        <Routes>
          {routes.map((r, i) => (
            <Route key={i} path={r.path} element={r.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

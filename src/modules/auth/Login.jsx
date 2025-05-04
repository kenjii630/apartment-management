// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore/userInfoStore";
import { login, fetchProfile } from "@/services/authService";
import { request } from "@/services/request";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setAuth = useUserStore((s) => s.setAuth);
  const userInfo = useUserStore((s) => s.userInfo);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // inside handleSubmit in LoginPage.jsx
    try {
      // 1) Perform login and show toast
      const { data, error: loginErr } = await request(
        () => login({ email, password }),
        {
          isToast: true,
          successMessage: "Signed in!",
        }
      );
      if (loginErr) throw new Error(loginErr);

      const token = data.token;

      // 2) Persist tokens
      localStorage.setItem("token", token);
      // localStorage.setItem("refresh_token", refresh_token);

      // 3) Fetch the user’s profile
      const { data: profileData, error: profileErr } = await request(
        () => fetchProfile(), // default id=2 on ReqRes
        {
          isToast: false,
        } // no need for toast here
      );
      if (profileErr) throw new Error(profileErr);
      profileData.data.role = "admin";

      localStorage.setItem("user_Info", JSON.stringify(profileData.data));
      // 4) Store both in Zustand
      setAuth({
        userInfo: profileData.data,
        token,
        refresh_token: "data.refresh_token",
      });
      const user = useUserStore.getState();
      // 5) Navigate home
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-text text-center mb-6">
          Sign in to your account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 text-secondary transform -translate-y-1/2" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-4 py-2 bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <LockClosedIcon className="absolute left-3 top-1/2 h-5 w-5 text-secondary transform -translate-y-1/2" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-4 py-2 bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 bg-primary font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign In
          </button>
        </form>
        {/* Optional links */}
        <div className="mt-4 text-center text-sm text-secondary">
          <a href="/forgot-password" className="hover:text-primary">
            Forgot your password?
          </a>
          <span className="mx-2">|</span>
          <a href="/register" className="hover:text-primary">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

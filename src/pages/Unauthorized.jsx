// src/pages/Unauthorized.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
      <h1 className="text-4xl font-bold mb-4">403 – Forbidden</h1>
      <p className="mb-6">You don’t have permission to view this page.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded hover-bg-card"
      >
        Go Home
      </Link>
    </div>
  );
}

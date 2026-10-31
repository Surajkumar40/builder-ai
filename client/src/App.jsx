import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthLayout, GuestLayout } from "./pages/Layout";
import AuthPage from "./pages/AuthPage";
import BuilderPage from "./pages/BuilderPage";
import HomePage from "./pages/HomePage";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Guest routes */}
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
        </Route>

        {/* Protected routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder/:id" element={<BuilderPage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
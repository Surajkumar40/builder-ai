import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import LoginLeft from "../components/LoginLeft";
import { useAppContext } from "../context/AppContext";

const AuthPage = ({ mode }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, register } = useAppContext();

  const isLogin = mode === "login";

  // React reuses this component when you switch /login <-> /register,
  // so clear the old error and password when the mode changes.
  useEffect(() => {
    setError("");
    setPassword("");
    setShowPassword(false);
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email.trim(), password);
      } else {
        await register(name.trim(), email.trim(), password);
      }
      // login/register in the context already navigate to "/"
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-zinc-950 text-sm text-zinc-900 bg-transparent placeholder-zinc-300 transition-colors";
  const labelClass =
    "block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-white flex text-zinc-900 font-sans">
      {/* Left panel - branding */}
      <LoginLeft />

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-medium tracking-tight text-zinc-900 mb-1.5 font-sans">
              {isLogin ? "Sign in" : "Create an account"}
            </h1>
            <p className="text-sm text-zinc-400">
              {isLogin
                ? "Enter your credentials to access your website builder"
                : "Get started by entering your registration details."}
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 p-3 border border-red-200 bg-red-50 text-red-700 text-xs rounded"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {!isLogin && (
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                placeholder="your@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  minLength={isLogin ? undefined : 6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${inputClass} pr-8`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 flex items-center justify-center cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-medium rounded flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              {loading && <Loader2Icon size={16} className="animate-spin" />}
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            {isLogin ? (
              <>
                New to BuilderAI?{" "}
                <Link
                  to="/register"
                  className="text-zinc-900 font-medium hover:underline"
                >
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-zinc-900 font-medium hover:underline"
                >
                  Sign in here
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
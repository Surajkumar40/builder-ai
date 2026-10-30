import React from "react";

function LoginLeft() {
  return (
    <div
      className="hidden lg:flex lg:w-2/5 bg-zinc-900 bg-cover bg-center bg-no-repeat flex-col justify-between p-12 shrink-0 select-none"
      style={{ backgroundImage: "url('/bg-img.png')" }}
    >
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" className="size-10" />
        <span className="text-4xl font-medium text-white">Builder AI</span>
      </div>

      <div>
        <h2 className="text-3xl text-white font-medium leading-snug mb-3 tracking-tight">
          Build your presence on web
        </h2>
        <p className="text-zinc-300">
          Describe what you need, preview instantly, and customize your site in
          real-time. React with clean JSX, verified layouts, and instant code
          exports.
        </p>
        <p className="text-zinc-300 text-sm mt-12">
          Copyright {new Date().getFullYear()} BuilderAI
        </p>
      </div>
    </div>
  );
}

export default LoginLeft;
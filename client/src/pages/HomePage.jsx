import React from 'react'
import { useAppContext } from '../context/AppContext'
import PromptInput from '../components/PromptInput'

const HomePage = () => {


  const {user} = useAppContext()
  return (
    <div className="h-screen overflow-y-scroll text-white font-sans bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat">

      {/* Nav */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="size-6" />
          <span className="text-xl font-semibold tracking-tight ">BuilderAI </span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-zinc-300">
          <span className="text-zinc-400">Welcome, {user?.name}</span>    
          <button className="py-1.5 px-3 border-white/20 text-white hover:bg-white/10 text-z5 rounded-md cursor-pointer bg-transparent">
            Sign Out
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 mt-8 xl:mt-28">
        <div className=" w-full max-w-2xl  flex flex-col items-center">
          {/*Promo Badge*/}
          <div className="flex items-center gap-2 p-1.5 pr-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[13px] text-white/90">
            <span className="px-3 py-1 text-[11px] bg-red-700 rounded-full font-medium tracking-wider">PROMO</span>
            <span>Create your first project for free.</span>
          </div>
          {/*Titile*/}
          <h1 className="text-center text-4xl md:text-6xl font-medium mt-4 max-w-2xl text-white">
            Let's build something amazing together.</h1>
            <p className=" text-center text-sm md:text-base max-w-xl mt-4 text-white/65 leading-relaxed">
              Desecribe your idea and watch AI design, structure and launch your website instantly. No coding required.
            </p>
            {/*Prompt input with glassmorphic variants*/}

        <div className="w-full mt-6">
            <PromptInput
             onSubmit={() => {}}
             loading={false}
             plaqceholder="Create a portfolio website..."
             variant="glass"
             autoFocus
            />
        </div>
          
        </div>
      </div>
    </div>
  )
}

export default HomePage
import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import PromptInput from '../components/PromptInput'
import { homeTags } from '../assets/assets'

const HomePage = () => {
  const {
    user,
    projects,
    loadingProjects,
    generatingProject,
    loadProjects,
    handleGenerate,
    handleDelete,
    logout,
  } = useAppContext()

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  console.log({ loadingProjects, projects }) // remove once it works

  return (
    <div className="h-screen overflow-y-scroll text-white font-sans bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat">
      {/* Nav */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="size-6" />
          <span className="text-xl font-semibold tracking-tight">BuilderAI</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-zinc-300">
          <span className="text-zinc-400">Welcome, {user?.name}</span>
          <button
            onClick={logout}
            className="py-1.5 px-3 border border-white/20 text-white hover:bg-white/10 text-sm rounded-md cursor-pointer bg-transparent"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center px-6 pb-20 mt-8 xl:mt-28">
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Promo Badge */}
          <div className="flex items-center gap-2 p-1.5 pr-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[13px] text-white/90">
            <span className="px-3 py-1 text-[11px] bg-red-700 rounded-full font-medium tracking-wider">
              PROMO
            </span>
            <span>Create your first project for free.</span>
          </div>

          {/* Title */}
          <h1 className="text-center text-4xl md:text-6xl font-medium mt-4 max-w-2xl text-white">
            Let's build something amazing together.
          </h1>
          <p className="text-center text-sm md:text-base max-w-xl mt-4 text-white/65 leading-relaxed">
            Describe your idea and watch AI design, structure and launch your website instantly. No coding required.
          </p>

          {/* Prompt input */}
          <div className="w-full mt-6">
            <PromptInput
              onSubmit={handleGenerate}
              loading={generatingProject}
              placeholder="Create a portfolio website..."
              variant="glass"
              autoFocus
            />
          </div>

          {/* Scrolling marquee tags */}
          <div className="masked-marquee w-full mt-4 max-w-2xl overflow-hidden py-1">
            <div className="animate-marquee flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-3 pr-3 shrink-0" aria-hidden={copy === 1}>
                  {(homeTags ?? []).map((tag, i) => (
                    <button
                      key={`${copy}-${i}`}
                      onClick={() => handleGenerate(tag)}
                      disabled={generatingProject}
                      className="px-4 py-1.5 border rounded-full text-sm text-white bg-white/10 border-white/25 hover:bg-white/20 transition cursor-pointer shrink-0 font-medium whitespace-nowrap"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* All Projects */}
          <div className="mt-12 w-full">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <p className="text-xs font-medium uppercase text-zinc-100 tracking-widest">
                All Projects
              </p>
              <span className="text-xs text-zinc-100 font-normal">
                {projects?.length ?? 0} {projects?.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            {loadingProjects ? (
              <p className="text-sm text-white/60">Loading projects...</p>
            ) : !projects?.length ? (
              <p className="text-sm text-white/60">No projects yet. Create one above.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {projects.map((project, index) => {
                  const id = project.$id ?? project._id ?? project.id ?? index
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md"
                    >
                      <span className="text-sm font-medium truncate">
                        {project.name || project.title || 'Untitled project'}
                      </span>
                      <button
                        onClick={() => handleDelete(id)}
                        className="text-xs text-red-300 hover:text-red-200 cursor-pointer bg-transparent"
                      >
                        Delete
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
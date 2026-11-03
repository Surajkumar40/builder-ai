import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import PromptInput from '../components/PromptInput'
import { homeTags } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Clock, Trash2, ArrowRight } from 'lucide-react'
import moment from 'moment'

// TEMP: set to false to use your real projects
const SHOW_SAMPLE = true

const sampleProjects = [
  { $id: '1', name: 'Portfolio website', $createdAt: '2026-11-03T06:00:00Z', $updatedAt: '2026-11-03T09:30:00Z' },
  { $id: '2', name: 'Restaurant landing page', $createdAt: '2026-11-02T11:00:00Z', $updatedAt: '2026-11-02T20:15:00Z' },
  { $id: '3', name: 'Fitness tracker dashboard', $createdAt: '2026-10-10T14:20:00Z', $updatedAt: '2026-10-20T17:45:00Z' },
  { $id: '4', name: 'Blog with dark mode', $createdAt: '2026-10-01T07:30:00Z', $updatedAt: '2026-10-11T12:00:00Z' },
]

const HomePage = () => {

  const navigate = useNavigate()
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

  const list = SHOW_SAMPLE ? sampleProjects : projects
  const isLoading = SHOW_SAMPLE ? false : loadingProjects

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
                {list?.length ?? 0} {list?.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            {isLoading ? (
              <p className="text-sm text-white/60">Loading projects...</p>
            ) : !list?.length ? (
              <p className="text-sm text-white/60">No projects yet. Create one above.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {list.map((project, index) => {
                  const id = project.$id ?? project._id ?? project.id ?? index
                  const rawDate =
                    project.$updatedAt ?? project.updatedAt ?? project.$createdAt ?? project.createdAt
                  const time = rawDate ? moment(rawDate) : null
                  return (
                    <div
                      key={id}
                      className="group flex items-center gap-4 px-4 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md hover:bg-white/15 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-medium truncate">
                          {project.name || project.title || 'Untitled project'}
                        </span>
                        {time?.isValid() && (
                          <span
                            title={time.format('DD MMM YYYY, hh:mm A')}
                            className="flex items-center gap-1 mt-1 text-xs text-white/60"
                          >
                            <Clock size={12} />
                            {time.fromNow()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(id)
                        }}
                        className="p-1.5 rounded-md text-red-300 hover:text-red-200 hover:bg-white/10 cursor-pointer bg-transparent shrink-0 transition md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100"
                        aria-label="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/builder/${id}`)
                        }}
                        className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 cursor-pointer bg-transparent shrink-0 transition"
                        aria-label="Open in builder"
                      >
                        <ArrowRight size={18} />
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
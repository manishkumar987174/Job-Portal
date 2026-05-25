import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()

  const searchJobHandler = (e) => {
    if (e) e.preventDefault()
    dispatch(setSearchedQuery(query))
  }

  const handleQuickTagClick = (tag) => {
    setQuery(tag)
    dispatch(setSearchedQuery(tag))
  }

  const popularTags = [
    { label: 'React Developer', color: 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/25' },
    { label: 'UI/UX Designer', color: 'bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/25' },
    { label: 'Data Scientist', color: 'bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/25' },
    { label: 'DevOps Engineer', color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25' }
  ]

  return (
    <section className="relative text-center py-20 px-6 overflow-hidden bg-gradient-to-b from-[#0e0724] to-[#080216] border-b border-purple-950/40">
      {/* Decorative Glow */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-[50%] w-[600px] h-[300px] bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(124,58,237,0.15)] ">
           India's #1 AI-Powered Job Portal
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">Dream Career</span> <br className="hidden sm:inline" />
          & Get Hired Fast
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300/80 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Connect with top companies, discover life-changing opportunities, and land your perfect job with AI-powered matching.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={searchJobHandler}
          className="flex flex-col sm:flex-row max-w-2xl mx-auto mt-8 gap-3 bg-purple-950/20 p-2.5 rounded-xl border border-purple-500/25 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
        >
          <div className="flex-1 flex items-center gap-2 px-3">
            <svg
              className="w-5 h-5 text-purple-400/60 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Job title, skills, or company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-2 bg-transparent text-white placeholder-purple-300/40 outline-none text-sm font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] active:scale-[0.98] transition-all text-sm shrink-0"
          >
            Search Jobs
          </button>
        </form>

        {/* Interactive Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {popularTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => handleQuickTagClick(tag.label)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${tag.color}`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Key Visual Stats */}
        <div className="grid grid-cols-3 max-w-xl mx-auto mt-14 pt-8 border-t border-purple-950/30 gap-4 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">50K+</div>
            <div className="text-[10px] md:text-xs text-purple-200/60 font-semibold tracking-wider uppercase mt-1">💼 Jobs Posted</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">200K+</div>
            <div className="text-[10px] md:text-xs text-purple-200/60 font-semibold tracking-wider uppercase mt-1">👤 Candidates</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">95%</div>
            <div className="text-[10px] md:text-xs text-purple-200/60 font-semibold tracking-wider uppercase mt-1">📈 Placement Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection


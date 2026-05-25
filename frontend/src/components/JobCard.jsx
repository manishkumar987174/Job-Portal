import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-[#120a2e]/45 border border-purple-950/40 rounded-xl p-5 cursor-pointer hover:bg-[#1a103f]/65 hover:border-purple-500/35 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transform hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Company Header */}
        <div className="flex items-center gap-3 mb-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-brand-cyan text-sm shrink-0 uppercase shadow-inner">
            {job?.company?.name?.substring(0, 2) || "JB"}
          </div>
          <div>
            <h4 className="text-xs font-bold text-brand-cyan tracking-wider uppercase">{job?.company?.name}</h4>
            <p className="text-[10px] text-purple-300/60 font-semibold">Verified Employer</p>
          </div>
        </div>

        {/* Job Title */}
        <h2 className="text-lg font-extrabold text-white leading-snug tracking-tight hover:text-brand-cyan transition-colors line-clamp-1">{job?.title}</h2>
        
        {/* Description */}
        <p className="text-sm text-gray-300/80 mt-2 line-clamp-2 leading-relaxed">{job?.description}</p>
      </div>

      {/* Badges and Tags */}
      <div className="flex flex-wrap gap-2 mt-4 text-[10px] font-bold tracking-wide uppercase">
        <span className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2.5 py-1 rounded-md">
          💼 {job?.jobType}
        </span>
        <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-md">
          💰 {job?.salary} LPA
        </span>
        <span className="bg-pink-500/10 border border-pink-500/20 text-pink-300 px-2.5 py-1 rounded-md">
          📍 {job?.location}
        </span>
      </div>
    </div>
  )
}

export default JobCard

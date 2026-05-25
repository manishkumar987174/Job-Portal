import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { btnCls } from '@/utils/formClasses'

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)
  const [isApplied, setIsApplied] = useState(false)
  const { id: jobId } = useParams()
  const dispatch = useDispatch()

  const handleApplyClick = () => {
    if (!user) {
      toast.error('Login required to apply for this job')
      return
    }
    if (user.role !== 'student') {
      toast.error('Only students can apply for jobs')
      return
    }
    if (isApplied) return
    applyJobHandler()
  }

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      })
      if (res.data.success) {
        setIsApplied(true)
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Apply failed')
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(
            res.data.job.applications?.some((a) => a.applicant === user?._id) || false
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-[#120a2e]/45 border border-purple-950/40 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          {/* Company Details */}
          <p className="text-xs font-extrabold text-brand-cyan tracking-wider uppercase">{singleJob?.company?.name || "Company"}</p>
          <h1 className="text-3xl font-extrabold text-white mt-1 leading-snug tracking-tight">{singleJob?.title}</h1>
          <p className="text-purple-300/60 font-semibold text-sm mt-1.5 flex items-center gap-1">
            <span>📍</span> {singleJob?.location}
          </p>

          {/* Styled Pill Tags */}
          <div className="flex flex-wrap gap-2.5 mt-5 text-[11px] font-bold tracking-wide uppercase">
            <span className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-3 py-1.5 rounded-lg">
              💼 {singleJob?.jobType}
            </span>
            <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-lg">
              💰 {singleJob?.salary} LPA
            </span>
            <span className="bg-pink-500/10 border border-pink-500/20 text-pink-300 px-3 py-1.5 rounded-lg">
              👥 {singleJob?.position} openings
            </span>
          </div>

          <h2 className="text-lg font-bold text-white mt-8 mb-3 border-b border-purple-950/40 pb-2">Job Description</h2>
          <p className="text-sm text-gray-300/90 leading-relaxed font-medium">{singleJob?.description}</p>
          
          <div className="text-xs text-purple-300/50 font-semibold mt-6 flex gap-4">
            <span>📅 Posted: {singleJob?.createdAt?.split('T')[0]}</span>
            <span>•</span>
            <span>👥 Applicants: {singleJob?.applications?.length || 0}</span>
          </div>

          {user?.role !== 'recruiter' && (
            <button
              type="button"
              onClick={handleApplyClick}
              disabled={user?.role === 'student' && isApplied}
              className={`mt-8 w-full sm:w-auto px-8 py-3 rounded-lg text-white font-bold transition-all ${
                user?.role === 'student' && isApplied 
                  ? 'bg-purple-900/30 border border-purple-800/30 text-purple-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] cursor-pointer'
              }`}
            >
              {user?.role === 'student' && isApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobDescription

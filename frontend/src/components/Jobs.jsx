import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const Jobs = () => {
  useGetAllJobs()
  const dispatch = useDispatch()

  useEffect(() => {
    // Clear search queries so the user sees all jobs
    dispatch(setSearchedQuery(''))
  }, [dispatch])

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="pt-8">
          <LatestJobs />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Jobs

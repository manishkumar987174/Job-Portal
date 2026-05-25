import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import { inputCls, btnCls } from '@/utils/formClasses'

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input, dispatch])

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-8 px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <input
            className={inputCls + ' w-48'}
            placeholder="Filter jobs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="button" className={btnCls} onClick={() => navigate('/admin/jobs/create')}>
            Post Job
          </button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs

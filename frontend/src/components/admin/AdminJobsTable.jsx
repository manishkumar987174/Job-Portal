import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tableCls, thCls, tdCls } from '@/utils/formClasses'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      )
    })
    setFilterJobs(filtered)
  }, [allAdminJobs, searchJobByText])

  return (
    <table className={tableCls}>
      <thead>
        <tr>
          <th className={thCls}>Company</th>
          <th className={thCls}>Job Title</th>
          <th className={thCls}>Date</th>
          <th className={thCls}>Action</th>
        </tr>
      </thead>
      <tbody>
        {filterJobs?.map((job) => (
          <tr key={job._id}>
            <td className={tdCls}>{job?.company?.name}</td>
            <td className={tdCls}>{job?.title}</td>
            <td className={tdCls}>{job?.createdAt?.split('T')[0]}</td>
            <td className={tdCls}>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
              >
                Applicants
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AdminJobsTable

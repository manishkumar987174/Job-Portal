import React from 'react'
import { useSelector } from 'react-redux'
import { tableCls, thCls, tdCls } from '@/utils/formClasses'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job)

  if (!allAppliedJobs?.length) {
    return <p className="text-sm text-gray-600">You have not applied to any job yet.</p>
  }

  return (
    <table className={tableCls}>
      <thead>
        <tr>
          <th className={thCls}>Date</th>
          <th className={thCls}>Job</th>
          <th className={thCls}>Company</th>
          <th className={thCls}>Status</th>
        </tr>
      </thead>
      <tbody>
        {allAppliedJobs.map((appliedJob) => (
          <tr key={appliedJob._id}>
            <td className={tdCls}>{appliedJob?.createdAt?.split('T')[0]}</td>
            <td className={tdCls}>{appliedJob.job?.title}</td>
            <td className={tdCls}>{appliedJob.job?.company?.name}</td>
            <td className={tdCls}>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase border ${
                  appliedJob?.status === 'rejected'
                    ? 'bg-red-500/10 border-red-500/20 text-red-300'
                    : (appliedJob?.status || '').toLowerCase() === 'pending'
                      ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300'
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                }`}
              >
                {appliedJob?.status || 'pending'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AppliedJobTable

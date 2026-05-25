import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { getResumeViewUrl } from '@/utils/resumeUrl'
import { btnOutlineCls } from '@/utils/formClasses'

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { user } = useSelector((store) => store.auth)

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto my-6 px-4">
        <div className="bg-brand-peach border-2 border-brand-sky rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio || 'No bio added'}</p>
            </div>
            <button type="button" onClick={() => setOpen(true)} className={btnOutlineCls}>
              Edit
            </button>
          </div>
          <p className="mt-3 text-sm">Email: {user?.email}</p>
          <p className="text-sm">Phone: {user?.phoneNumber}</p>
          <div className="mt-3">
            <p className="font-medium text-sm">Skills</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {user?.profile?.skills?.length
                ? user.profile.skills.map((item, i) => (
                    <span key={i} className="bg-brand-sky px-2 py-0.5 rounded text-xs">
                      {item}
                    </span>
                  ))
                : 'NA'}
            </div>
          </div>
          <p className="mt-3 text-sm">
            Resume:{' '}
            {user?.profile?.resume ? (
              <a
                href={getResumeViewUrl(user.profile.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                View resume
              </a>
            ) : (
              'Not uploaded'
            )}
          </p>
        </div>
        <div className="mt-6 bg-brand-peach border-2 border-brand-sky rounded-lg p-4">
          <h2 className="font-bold mb-3 text-white">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile

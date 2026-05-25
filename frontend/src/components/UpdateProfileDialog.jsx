import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { inputCls, btnCls, labelCls } from '@/utils/formClasses'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((store) => store.auth)
  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map((skill) => skill) || '',
    file: null,
  })
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('bio', input.bio)
    formData.append('skills', input.skills)
    if (input.file instanceof File) formData.append('file', input.file)

    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-brand-peach border-2 border-brand-sky rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-lg mb-4">Update Profile</h2>
        <form onSubmit={submitHandler} className="space-y-2">
          <label className={labelCls}>Name</label>
          <input name="fullname" className={inputCls} value={input.fullname} onChange={changeEventHandler} />
          <label className={labelCls}>Email</label>
          <input name="email" type="email" className={inputCls} value={input.email} onChange={changeEventHandler} />
          <label className={labelCls}>Phone</label>
          <input name="phoneNumber" className={inputCls} value={input.phoneNumber} onChange={changeEventHandler} />
          <label className={labelCls}>Bio</label>
          <input name="bio" className={inputCls} value={input.bio} onChange={changeEventHandler} />
          <label className={labelCls}>Skills (comma separated)</label>
          <input name="skills" className={inputCls} value={input.skills} onChange={changeEventHandler} />
          <label className={labelCls}>Resume (PDF)</label>
          <input name="file" type="file" accept="application/pdf" className={inputCls} onChange={fileChangeHandler} />
          <button type="submit" disabled={loading} className={`w-full mt-2 ${btnCls}`}>
            {loading ? 'Please wait...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfileDialog

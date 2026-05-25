import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { inputCls, btnCls, btnOutlineCls, labelCls } from '@/utils/formClasses'
import Req from '../Req'

const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)
  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  })
  const { singleCompany } = useSelector((store) => store.company)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (input.file) formData.append('file', input.file)

    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/companies')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: singleCompany.file || null,
    })
  }, [singleCompany])

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto my-8 px-4">
        <button type="button" className={btnOutlineCls + ' mb-4'} onClick={() => navigate('/admin/companies')}>
          ← Back
        </button>
        <form onSubmit={submitHandler} className="bg-brand-peach border-2 border-brand-sky rounded-lg p-6">
          <h1 className="font-bold text-xl mb-4">Company Setup</h1>
          <label className={labelCls}>
            Company Name <Req />
          </label>
          <input name="name" className={inputCls} value={input.name} onChange={changeEventHandler} required />
          <label className={labelCls}>Description</label>
          <input name="description" className={inputCls} value={input.description} onChange={changeEventHandler} />
          <label className={labelCls}>Website</label>
          <input name="website" className={inputCls} value={input.website} onChange={changeEventHandler} />
          <label className={labelCls}>Location</label>
          <input name="location" className={inputCls} value={input.location} onChange={changeEventHandler} />
          <label className={labelCls}>Logo</label>
          <input accept="image/*" type="file" className={inputCls} onChange={changeFileHandler} />
          <button type="submit" disabled={loading} className={`w-full mt-4 ${btnCls}`}>
            {loading ? 'Please wait...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CompanySetup

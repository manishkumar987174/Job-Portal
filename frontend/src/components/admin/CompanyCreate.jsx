import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { inputCls, btnCls, btnOutlineCls, labelCls } from '@/utils/formClasses'
import Req from '../Req'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error('Company name is required')
      return
    }
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      )
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        navigate(`/admin/companies/${res?.data?.company?._id}`)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto my-10 px-4">
        <h1 className="font-bold text-2xl">Company Name</h1>
        <p className="text-gray-600 text-sm mb-4">You can change details later.</p>
        <label className={labelCls}>
          Company Name <Req />
        </label>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. TCS, Infosys"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <div className="flex gap-2 mt-6">
          <button type="button" className={btnOutlineCls} onClick={() => navigate('/admin/companies')}>
            Cancel
          </button>
          <button type="button" className={btnCls} onClick={registerNewCompany}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate

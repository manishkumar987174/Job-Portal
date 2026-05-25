import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { inputCls, btnCls } from '@/utils/formClasses'

const Companies = () => {
  useGetAllCompanies()
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input, dispatch])

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-8 px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <input
            className={inputCls + ' w-48'}
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="button" className={btnCls} onClick={() => navigate('/admin/companies/create')}>
            New Company
          </button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies

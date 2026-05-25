import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tableCls, thCls, tdCls } from '@/utils/formClasses'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filtered)
  }, [companies, searchCompanyByText])

  return (
    <table className={tableCls}>
      <thead>
        <tr>
          <th className={thCls}>Name</th>
          <th className={thCls}>Date</th>
          <th className={thCls}>Action</th>
        </tr>
      </thead>
      <tbody>
        {filterCompany?.map((company) => (
          <tr key={company._id}>
            <td className={tdCls}>{company.name}</td>
            <td className={tdCls}>{company.createdAt?.split('T')[0]}</td>
            <td className={tdCls}>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => navigate(`/admin/companies/${company._id}`)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CompaniesTable

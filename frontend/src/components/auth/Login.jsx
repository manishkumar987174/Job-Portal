import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { inputCls, btnCls, labelCls } from '@/utils/formClasses'
import Req from '../Req'

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' })
  const { loading, user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed')
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto my-10 px-4">
        <form
          onSubmit={submitHandler}
          className="bg-brand-peach border-2 border-brand-sky rounded-lg p-6"
        >
          <h1 className="font-bold text-xl mb-4">Login</h1>
          <label className={labelCls}>
            Email <Req />
          </label>
          <input
            type="email"
            name="email"
            className={inputCls}
            value={input.email}
            onChange={changeEventHandler}
            required
          />
          <label className={labelCls}>
            Password <Req />
          </label>
          <input
            type="password"
            name="password"
            className={inputCls}
            value={input.password}
            onChange={changeEventHandler}
            required
          />
          <p className={`${labelCls} mt-2`}>
            Role <Req />
          </p>
          <div className="my-2 flex gap-4 text-sm">
            <label className="flex items-center gap-1">
              <input type="radio" name="role" value="student" onChange={changeEventHandler} required />
              Student
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="role" value="recruiter" onChange={changeEventHandler} required />
              Recruiter
            </label>
          </div>
          <button type="submit" disabled={loading} className={`w-full ${btnCls}`}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
          <p className="text-sm mt-3">
            New user? <Link to="/signup" className="underline">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { inputCls, btnCls, labelCls } from "@/utils/formClasses";
import Req from "../Req";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });
  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        setRegisteredEmail(input.email);
        setShowOtpVerify(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const otpVerifyHandler = async (e) => {
    e.preventDefault();
    try {
      setVerifying(true);
      const res = await axios.post(`${USER_API_END_POINT}/verify-otp`, {
        email: registeredEmail,
        otp: otp
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const resendOtpHandler = async () => {
    try {
      toast.info("Sending new OTP...");
      const res = await axios.post(`${USER_API_END_POINT}/resend-otp`, {
        email: registeredEmail
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  if (showOtpVerify) {
    return (
      <div>
        <Navbar />
        <div className="max-w-md mx-auto my-14 px-4">
          <form
            onSubmit={otpVerifyHandler}
            className="bg-brand-peach border border-brand-sky rounded-2xl p-8 backdrop-blur-md shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/25 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                ✉️
              </div>
              <h1 className="font-extrabold text-2xl text-white tracking-tight">Verify Your Email</h1>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                We've sent a 6-digit verification code to <br />
                <span className="font-bold text-brand-cyan">{registeredEmail}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className={`${labelCls} text-center block`}>
                Enter 6-Digit OTP <Req />
              </label>
              <input
                type="text"
                name="otp"
                maxLength="6"
                placeholder="••••••"
                className="w-full text-center border-2 border-brand-light/60 rounded-xl px-4 py-3 bg-brand-dark/45 text-2xl font-black text-white tracking-[8px] placeholder-gray-500 focus:border-brand-blue outline-none transition-all my-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>

            <button
              type="submit"
              disabled={verifying || otp.length !== 6}
              className={`w-full py-3 rounded-lg text-white font-bold tracking-wide uppercase transition-all duration-300 ${
                verifying || otp.length !== 6
                  ? 'bg-purple-905/30 border border-purple-800/30 text-purple-400/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] cursor-pointer'
              }`}
            >
              {verifying ? "Verifying..." : "Verify & Continue"}
            </button>

            <div className="text-center mt-6 text-sm text-gray-400 font-medium">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={resendOtpHandler}
                className="text-brand-cyan hover:underline font-bold bg-transparent border-none cursor-pointer"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto my-10 px-4">
        <form
          onSubmit={submitHandler}
          className="bg-brand-peach border-2 border-brand-sky rounded-lg p-6"
        >
          <h1 className="font-bold text-xl mb-4">Sign Up</h1>
          <label className={labelCls}>
            Full Name <Req />
          </label>
          <input
            name="fullname"
            className={inputCls}
            value={input.fullname}
            onChange={changeEventHandler}
            required
          />
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
            Phone <Req />
          </label>
          <input
            name="phoneNumber"
            className={inputCls}
            value={input.phoneNumber}
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
              <input
                type="radio"
                name="role"
                value="student"
                onChange={changeEventHandler}
                required
              />
              Student
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="recruiter"
                onChange={changeEventHandler}
                required
              />
              Recruiter
            </label>
          </div>
          {}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 ${btnCls}`}
          >
            {loading ? "Please wait..." : "Signup"}
          </button>
          <p className="text-sm mt-3">
            Have account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

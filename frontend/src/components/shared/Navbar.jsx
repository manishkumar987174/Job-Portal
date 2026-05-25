import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  const linkClass = "hover:text-brand-cyan text-gray-200 transition-colors font-semibold text-sm";

  return (
    <nav className="bg-[#0a051b]/80 border-b border-brand-light/20 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          Job-Portal
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          {user?.role === "recruiter" ? (
            <>
              <Link to="/" className={linkClass}>
                Home
              </Link>
              <Link to="/jobs" className={linkClass}>
                Jobs
              </Link>
              <Link to="/admin/companies" className={linkClass}>
                Companies
              </Link>
              <Link to="/admin/jobs" className={linkClass}>
                My Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={linkClass}>
                Home
              </Link>
              <Link to="/jobs" className={linkClass}>
                Jobs
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 border border-brand-blue/50 rounded bg-brand-dark/30 hover:bg-brand-blue/20 text-white font-medium transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 bg-gradient-to-r from-brand-blue to-brand-cyan rounded text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {user?.role === "student" && (
                <Link to="/profile" className={linkClass}>
                  Profile
                </Link>
              )}
              <span className="text-gray-300 font-semibold bg-brand-light/30 px-3 py-1 rounded-full text-xs">
                👤 Hi, {user?.fullname?.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={logoutHandler}
                className="px-3 py-1.5 border border-red-500/40 rounded bg-red-950/20 hover:bg-red-900/30 text-red-300 text-xs font-bold transition-all cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

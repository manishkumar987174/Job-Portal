import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { getResumeViewUrl } from "@/utils/resumeUrl";
import { tableCls, thCls, tdCls } from "@/utils/formClasses";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
      );
      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <table className={tableCls}>
        <thead>
          <tr>
            <th className={thCls}>Name</th>
            <th className={thCls}>Email</th>
            <th className={thCls}>Phone</th>
            <th className={thCls}>Resume</th>
            <th className={thCls}>Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants?.applications?.map((item) => (
            <tr key={item._id}>
              <td className={tdCls}>
                <button
                  type="button"
                  className="text-left underline text-brand-cyan hover:text-brand-cyan/80 transition-colors cursor-pointer font-bold"
                  onClick={() => {
                    setSelectedApplicant(item.applicant);
                    setModalOpen(true);
                  }}
                >
                  {item?.applicant?.fullname}
                </button>
              </td>
              <td className={tdCls}>{item?.applicant?.email}</td>
              <td className={tdCls}>{item?.applicant?.phoneNumber}</td>
              <td className={tdCls}>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-brand-cyan hover:text-brand-cyan/80 transition-colors underline font-bold"
                    href={getResumeViewUrl(item.applicant.profile.resume)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "NA"
                )}
              </td>
              <td className={tdCls}>
                <button
                  type="button"
                  className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold rounded-md transition-all mr-2 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                  onClick={() => statusHandler("Accepted", item._id)}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="text-xs px-3 py-1.5 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold rounded-md transition-all cursor-pointer shadow-[0_0_10px_rgba(244,63,94,0.15)]"
                  onClick={() => statusHandler("Rejected", item._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && selectedApplicant && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-brand-peach border-2 border-brand-sky rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-lg mb-2">
              {selectedApplicant.fullname}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedApplicant.profile?.bio || "No bio"}
            </p>
            <div className="mt-3">
              <p className="font-medium text-sm">Skills</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedApplicant.profile?.skills?.length
                  ? selectedApplicant.profile.skills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-brand-sky px-2 py-0.5 rounded text-xs"
                      >
                        {s}
                      </span>
                    ))
                  : "NA"}
              </div>
            </div>
            <p className="mt-3">
              Resume:{" "}
              {selectedApplicant.profile?.resume ? (
                <a
                  href={getResumeViewUrl(selectedApplicant.profile.resume)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-cyan hover:text-brand-cyan/80 transition-colors underline font-bold"
                >
                  View
                </a>
              ) : (
                "Not uploaded"
              )}
            </p>

            <div className="mt-4 flex gap-2">
              {user && user._id === selectedApplicant._id && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      navigate("/profile");
                    }}
                    className="px-3 py-1 bg-white border rounded"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const res = await axios.get(
                          `${USER_API_END_POINT}/logout`,
                          { withCredentials: true },
                        );
                        if (res.data.success) {
                          dispatch(setUser(null));
                          toast.success(res.data.message);
                          setModalOpen(false);
                        }
                      } catch (err) {
                        toast.error(
                          err?.response?.data?.message || "Logout failed",
                        );
                      }
                    }}
                    className="px-3 py-1 bg-white border rounded"
                  >
                    Logout
                  </button>
                </>
              )}
             
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicantsTable;

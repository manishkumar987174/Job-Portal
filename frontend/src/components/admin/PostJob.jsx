import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { inputCls, btnCls, labelCls } from "@/utils/formClasses";
import Req from "../Req";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    domain: "",
    experience: "",
    position: "",
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ["title", "Title"],
    ["description", "Description"],
    ["requirements", "Requirements"],
    ["salary", "Salary (LPA)"],
    ["location", "Location"],
    ["jobType", "Job Type"],
    ["domain", "Domain"],
    ["experience", "Experience"],
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto my-8 px-4">
        <form
          onSubmit={submitHandler}
          className="bg-brand-peach border-2 border-brand-sky rounded-lg p-6"
        >
          <h1 className="font-bold text-xl mb-4">Post New Job</h1>
          {fields.map(([name, label]) => (
            <div key={name}>
              <label className={labelCls}>
                {label} <Req />
              </label>
              {name === "description" ? (
                <textarea
                  name={name}
                  className={inputCls}
                  value={input[name]}
                  onChange={changeEventHandler}
                  required
                />
              ) : name === "domain" ? (
                <select
                  name={name}
                  className={inputCls}
                  value={input[name]}
                  onChange={changeEventHandler}
                  required
                >
                  <option value="">Select domain</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>MERN Developer</option>
                  <option>Data Scientist</option>
                  <option>DevOps Engineer</option>
                  <option>Machine Learning</option>
                  <option>AI Engineer</option>
                  <option>Cybersecurity</option>
                  <option>Product Manager</option>
                  <option>UX/UI Designer</option>
                  <option>Video Editor</option>
                </select>
              ) : (
                <input
                  name={name}
                  className={inputCls}
                  value={input[name]}
                  onChange={changeEventHandler}
                  required
                />
              )}
            </div>
          ))}
          <label className={labelCls}>
            Positions <Req />
          </label>
          <input
            type="number"
            name="position"
            className={inputCls}
            value={input.position}
            onChange={changeEventHandler}
            required
            min="1"
          />
          {companies.length > 0 ? (
            <>
              <label className={labelCls}>
                Company <Req />
              </label>
              <select
                className={inputCls}
                value={input.companyId}
                onChange={(e) =>
                  setInput({ ...input, companyId: e.target.value })
                }
                required
              >
                <option value="">Select company</option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <p className="text-sm text-red-600 my-2">
              Pehle company register karo
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !input.companyId}
            className={`w-full mt-4 ${btnCls}`}
          >
            {loading ? "Please wait..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;

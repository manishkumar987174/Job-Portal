import React, { useMemo, useState } from "react";
import JobCard from "./JobCard";
import { useSelector, useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const LatestJobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [domain, setDomain] = useState("");
  const dispatch = useDispatch();

  const handleClearFilters = () => {
    setDomain("");
    dispatch(setSearchedQuery(""));
  };

  const handleDomainSelect = (selectedDomain) => {
    // If clicking already selected domain, clear it. Otherwise, set it.
    if (domain.toLowerCase() === selectedDomain.toLowerCase()) {
      setDomain("");
    } else {
      setDomain(selectedDomain);
    }
  };

  const jobs = useMemo(() => {
    if (!searchedQuery?.trim()) return allJobs;
    const q = searchedQuery.toLowerCase();
    return allJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q),
    );
  }, [allJobs, searchedQuery]);

  const displayed = useMemo(() => {
    const base = jobs;
    if (!domain) return base;
    return base.filter(
      (j) => (j.domain || "").toLowerCase() === domain.toLowerCase(),
    );
  }, [jobs, domain]);

  const categories = [
    {
      name: "Frontend Developer",
      iconBg: "bg-sky-500/10 border-sky-500/20 text-sky-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      name: "Backend Developer",
      iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      name: "Full Stack Developer",
      iconBg: "bg-violet-500/10 border-violet-500/20 text-violet-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      name: "MERN Developer",
      iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      name: "Data Scientist",
      iconBg: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: "DevOps Engineer",
      iconBg: "bg-slate-500/10 border-slate-500/20 text-slate-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      name: "Machine Learning",
      iconBg: "bg-pink-500/10 border-pink-500/20 text-pink-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      name: "AI Engineer",
      iconBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: "Cybersecurity",
      iconBg: "bg-rose-500/10 border-rose-500/20 text-rose-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      name: "Product Manager",
      iconBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      name: "UX/UI Designer",
      iconBg: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      name: "Video Editor",
      iconBg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* Category Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-3.5 py-1.5 rounded-full border border-brand-cyan/20">
          Browse by Category
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 tracking-tight">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Top Job Categories</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">
          Find opportunities across the most in-demand tech and creative fields
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-14">
        {categories.map((cat) => {
          const isSelected = domain.toLowerCase() === cat.name.toLowerCase();
          return (
            <div
              key={cat.name}
              onClick={() => handleDomainSelect(cat.name)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] select-none ${
                isSelected
                  ? "bg-gradient-to-b from-[#1c0f49] to-[#0c0525] border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                  : "bg-[#130d2f]/35 border-purple-950/40 hover:border-purple-500/25 hover:bg-[#130d2f]/70"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-3 ${cat.iconBg}`}>
                {cat.icon}
              </div>
              <span className={`text-[11px] font-bold tracking-tight uppercase leading-snug ${
                isSelected ? "text-brand-cyan" : "text-gray-300"
              }`}>
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Filter Status Badge */}
      {(searchedQuery || domain) && (
        <div className="flex items-center justify-between mb-8 p-4 bg-purple-950/20 border border-purple-500/20 rounded-xl backdrop-blur-sm">
          <div className="text-sm font-semibold text-gray-200">
            {searchedQuery && (
              <span className="mr-4">
                🔍 Search: <span className="text-brand-cyan">"{searchedQuery}"</span>
              </span>
            )}
            {domain && (
              <span>
                📁 Domain: <span className="text-brand-blue">"{domain}"</span>
              </span>
            )}
            <span className="ml-3 text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">
              {displayed.length} jobs found
            </span>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-lg hover:bg-purple-500/25 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Latest / Filtered Jobs Header */}
      <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 mb-8 tracking-tight flex items-center gap-2.5 border-b border-purple-950/30 pb-3">
        <span>{domain || searchedQuery ? "Filtered Results" : "Latest & Hot Job Openings"}</span>
      </h3>

      {/* Jobs Grid or Empty State */}
      {displayed.length === 0 ? (
        <div className="text-center py-16 px-6 bg-[#130d2f]/30 border border-purple-500/15 rounded-2xl max-w-lg mx-auto shadow-2xl backdrop-blur-sm">
          <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl shadow-inner animate-bounce">
            🔍
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">No job is available</h3>
          <p className="text-sm text-gray-300/80 mb-6 leading-relaxed">
            We couldn't find any job postings in the <span className="font-semibold text-brand-cyan">"{domain || searchedQuery}"</span> category right now. Don't worry, new opportunities are posted daily!
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all text-xs cursor-pointer"
          >
            View All Available Jobs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayed.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestJobs;

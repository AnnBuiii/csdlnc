import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI, recommendationAPI } from '../services/api';
import authStore from '../store/authStore';

const renderLocation = (location) => {
  if (!location) return null;
  if (typeof location === 'string') return location;
  return [location.city, location.district, location.address].filter(Boolean).join(', ');
};

const formatSalary = (min, max, currency = 'VND') => {
  if (!min && !max) return null;
  const fmt = (n) => n?.toLocaleString('vi-VN');
  if (min && max) return `${fmt(min)} – ${fmt(max)} ${currency}`;
  if (min) return `From ${fmt(min)} ${currency}`;
  return `Up to ${fmt(max)} ${currency}`;
};

const JobCard = ({ job, onClick }) => {
  const company = job.companyInfo?.name || job.companyName || '—';
  const location = renderLocation(job.location);
  const salary = formatSalary(job.salary?.min, job.salary?.max, job.salary?.currency);
  const initial = company.charAt(0).toUpperCase();
  const skills = job.requirements?.skills?.slice(0, 3) || [];
  const jobTypes = Array.isArray(job.jobType) ? job.jobType : job.jobType ? [job.jobType] : [];

  return (
    <div
      onClick={onClick}
      className="card-hover flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        {job.companyInfo?.logoUrl ? (
          <img src={job.companyInfo.logoUrl} alt={company}
            className="w-11 h-11 rounded-lg object-cover border flex-shrink-0" />
        ) : (
          <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-lg flex-shrink-0">
            {initial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-base text-gray-900 leading-tight line-clamp-2">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{company}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {jobTypes.map((t) => <span key={t} className="badge-primary">{t}</span>)}
        {job.level && <span className="badge bg-purple-100 text-purple-700">{job.level}</span>}
      </div>

      <div className="space-y-1 text-sm text-gray-500">
        {location && <p className="flex items-center gap-1.5">📍 <span className="truncate">{location}</span></p>}
        {salary && <p className="flex items-center gap-1.5 text-secondary font-medium">💰 {salary}</p>}
        {job.deadline && (
          <p className="flex items-center gap-1.5">
            📅 Deadline: {new Date(job.deadline).toLocaleDateString('vi-VN')}
          </p>
        )}
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {skills.map((s, i) => <span key={i} className="badge bg-gray-100 text-gray-600">{s.name}</span>)}
        </div>
      )}

      <div className="mt-auto pt-2 border-t border-gray-50">
        <button className="w-full btn-primary text-sm py-2">View Details</button>
      </div>
    </div>
  );
};

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRec, setLoadingRec] = useState(false);
  const [showRecommended, setShowRecommended] = useState(false);
  const [searchParams, setSearchParams] = useState({
    q: '', location: '', jobType: '', experience: '', salaryMin: '', salaryMax: '', page: 1, limit: 12,
  });
  const navigate = useNavigate();
  const { isAuthenticated, user } = authStore();
  const recommendRef = useRef(null);

  useEffect(() => { fetchJobs(); }, [searchParams]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.searchJobs(searchParams);
      setJobs(response.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setLoadingRec(true);
      const response = await recommendationAPI.getJobRecommendations({ limit: 10 });
      setRecommendedJobs(response.data || []);
      setShowRecommended(true);
      setTimeout(() => recommendRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoadingRec(false);
    }
  };

  const handleSearch = (e) => { e.preventDefault(); setSearchParams({ ...searchParams, page: 1 }); };
  const handleInputChange = (e) => setSearchParams({ ...searchParams, [e.target.name]: e.target.value });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Find Your Dream Job</h1>
        <p className="text-gray-500">{loading ? 'Loading…' : `${jobs.length} jobs available`}</p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="card mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="form-label">Keyword</label>
            <input type="text" name="q" className="form-input" placeholder="Job title, skills…"
              value={searchParams.q} onChange={handleInputChange} />
          </div>
          <div>
            <label className="form-label">Location</label>
            <input type="text" name="location" className="form-input" placeholder="City…"
              value={searchParams.location} onChange={handleInputChange} />
          </div>
          <div>
            <label className="form-label">Job Type</label>
            <select name="jobType" className="form-input" value={searchParams.jobType} onChange={handleInputChange}>
              <option value="">Any type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="form-label">Level</label>
            <select name="experience" className="form-input" value={searchParams.experience} onChange={handleInputChange}>
              <option value="">Any level</option>
              <option value="intern">Intern</option>
              <option value="junior">Junior</option>
              <option value="middle">Middle</option>
              <option value="senior">Senior</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="form-label">Min Salary (VND)</label>
            <input type="number" name="salaryMin" className="form-input" placeholder="e.g. 10000000"
              value={searchParams.salaryMin} onChange={handleInputChange} />
          </div>
          <div>
            <label className="form-label">Max Salary (VND)</label>
            <input type="number" name="salaryMax" className="form-input" placeholder="e.g. 50000000"
              value={searchParams.salaryMax} onChange={handleInputChange} />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
          <button type="submit" className="btn-primary">Search Jobs</button>
          {isAuthenticated && user?.role === 'candidate' && (
            <button type="button" onClick={fetchRecommendations} disabled={loadingRec} className="btn-secondary">
              {loadingRec ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Finding…</>
              ) : '✨ Suggested for Me'}
            </button>
          )}
          {(searchParams.q || searchParams.location || searchParams.jobType || searchParams.experience) && (
            <button type="button" className="btn-ghost"
              onClick={() => setSearchParams({ q: '', location: '', jobType: '', experience: '', salaryMin: '', salaryMax: '', page: 1, limit: 12 })}>
              Clear filters
            </button>
          )}
        </div>
      </form>

      {/* Recommended jobs */}
      {isAuthenticated && user?.role === 'candidate' && showRecommended && (
        <div ref={recommendRef} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">✨ Suggested for You</h2>
            <span className="text-sm text-gray-500">{recommendedJobs.length} matched</span>
          </div>
          {recommendedJobs.length === 0 ? (
            <div className="card text-center py-8 text-gray-500">
              No suggestions yet. Add more skills to your profile for better matches.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendedJobs.map((job) => (
                <div key={job.jobId} className="relative">
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className="badge-primary shadow">
                      {job.matchedSkills} skill{job.matchedSkills !== 1 ? 's' : ''} matched
                    </span>
                  </div>
                  <JobCard job={job} onClick={() => navigate(`/jobs/${job.jobId}`)} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Jobs grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl font-semibold mb-1">No jobs found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard key={job.jobId || job._id} job={job} onClick={() => navigate(`/jobs/${job.jobId}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobAPI, recommendationAPI } from "../services/api";
import authStore from "../store/authStore";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    q: "",
    location: "",
    jobType: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    page: 1,
    limit: 12,
  });
  const navigate = useNavigate();
  const { isAuthenticated, user } = authStore();

  useEffect(() => {
    fetchJobs();
    if (isAuthenticated && user?.role === "candidate") {
      fetchRecommendations();
    }
  }, [searchParams, isAuthenticated, user]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.searchJobs(searchParams);
      setJobs(response.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await recommendationAPI.getJobRecommendations({
        limit: 5,
      });
      setRecommendedJobs(response.data || []);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ ...searchParams, page: 1 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const renderLocation = (location) => {
    if (!location) return "Unknown";
    if (typeof location === "string") return location;
    return [location.address, location.district, location.city]
      .filter(Boolean)
      .join(", ");
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Your Dream Job</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="form-label">Keyword</label>
            <input
              type="text"
              name="q"
              className="form-input"
              placeholder="Job title, skills..."
              value={searchParams.q}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="City, country..."
              value={searchParams.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Job Type</label>
            <select
              name="jobType"
              className="form-input"
              value={searchParams.jobType}
              onChange={handleInputChange}
            >
              <option value="">Any</option>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="form-label">Experience</label>
            <select
              name="experience"
              className="form-input"
              value={searchParams.experience}
              onChange={handleInputChange}
            >
              <option value="">Any</option>
              <option value="intern">Intern</option>
              <option value="fresher">Fresher</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="form-label">Min Salary</label>
            <input
              type="number"
              name="salaryMin"
              className="form-input"
              placeholder="0"
              value={searchParams.salaryMin}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Max Salary</label>
            <input
              type="number"
              name="salaryMax"
              className="form-input"
              placeholder="999999"
              value={searchParams.salaryMax}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn-primary mt-4">
          Search
        </button>
      </form>

      {isAuthenticated &&
        user?.role === "candidate" &&
        recommendedJobs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map((job) => (
                <div
                  key={job.jobId}
                  className="card hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/jobs/${job.jobId}`)}
                >
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-muted mb-3">{job.companyName}</p>
                  <p className="text-sm text-muted">📍 {job.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted text-lg">No jobs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.jobId}
              className="card hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/jobs/${job.jobId}`)}
            >
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-muted mb-3">{job.companyName}</p>

              <div className="mb-4 space-y-2">
                <p className="text-sm">📍 {renderLocation(job.location)}</p>
                <p className="text-sm">
                  💰 {job.salaryMin?.toLocaleString()} -{" "}
                  {job.salaryMax?.toLocaleString()} VND
                </p>
                <p className="text-sm">
                  ⏰ Deadline: {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>

              <p className="text-sm text-muted line-clamp-2 mb-4">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.requiredSkills?.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="badge-primary">
                    {skill}
                  </span>
                ))}
              </div>

              <button className="w-full btn-primary">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

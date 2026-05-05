import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyAPI, jobAPI } from '../services/api';
import authStore from '../store/authStore';

export default function Company() {
  const navigate = useNavigate();
  const { user } = authStore();
  const [activeTab, setActiveTab] = useState('jobs');
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalInterviews: 0,
    newApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    industry: '',
    size: '',
    location: '',
  });

  useEffect(() => {
    fetchCompanyData();
    fetchJobs();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await companyAPI.getProfile();
      setCompany(response.data);
      setFormData(response.data || {});

      // Mock stats calculation
      setStats({
        totalJobs: response.data?.jobsCount || 0,
        totalApplications: response.data?.applicationsCount || 0,
        totalInterviews: response.data?.interviewsCount || 0,
        newApplications: response.data?.newApplicationsCount || 0,
      });
    } catch (err) {
      console.error('Error fetching company:', err);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getCompanyJobs({ limit: 20 });
      setJobs(response.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveCompany = async (e) => {
    e.preventDefault();
    try {
      await companyAPI.updateProfile(formData);
      setCompany(formData);
      setEditing(false);
      alert('Company profile updated!');
    } catch (err) {
      alert(err.message || 'Failed to update');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Company Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-3xl font-bold text-primary">{stats.totalJobs}</p>
          <p className="text-muted">Active Jobs</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-secondary">{stats.totalApplications}</p>
          <p className="text-muted">Applications</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-accent">{stats.totalInterviews}</p>
          <p className="text-muted">Interviews</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-danger">{stats.newApplications}</p>
          <p className="text-muted">New Applications</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-6">
        <div className="flex gap-4 border-b">
          {['jobs', 'profile', 'candidates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold transition ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted hover:text-dark'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <button
            onClick={() => navigate('/create-job')}
            className="btn-primary"
          >
            + Post New Job
          </button>

          {jobs.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-muted">No jobs posted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.jobId} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-muted">{job.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{job.applicationsCount || 0}</p>
                      <p className="text-sm text-muted">Applications</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="btn-primary text-sm" onClick={() => navigate(`/jobs/${job.jobId}`)}>
                      View
                    </button>
                    <button className="btn-outline text-sm">Edit</button>
                    <button className="btn-outline text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Company Profile</h2>
            <button
              onClick={() => setEditing(!editing)}
              className={editing ? 'btn-secondary' : 'btn-primary'}
            >
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div>
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-input"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Website</label>
                  <input
                    type="url"
                    name="website"
                    className="form-input"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="form-label">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    className="form-input"
                    value={formData.industry}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Company Size</label>
                  <input
                    type="text"
                    name="size"
                    className="form-input"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-input"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {company && (
                <>
                  <p><strong>Name:</strong> {company.name}</p>
                  <p><strong>Description:</strong> {company.description}</p>
                  <p><strong>Website:</strong> {company.website || 'Not provided'}</p>
                  <p><strong>Industry:</strong> {company.industry || 'Not provided'}</p>
                  <p><strong>Size:</strong> {company.size || 'Not provided'}</p>
                  <p><strong>Location:</strong> {company.location || 'Not provided'}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'candidates' && (
        <div className="text-center card py-12">
          <p className="text-muted">Candidates management coming soon</p>
        </div>
      )}
    </div>
  );
}

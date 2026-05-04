import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';
import authStore from '../store/authStore';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = authStore();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJobDetail();
    fetchRelatedJobs();
  }, [id]);

  const fetchJobDetail = async () => {
    try {
      const response = await jobAPI.getJobDetail(id);
      setJob(response.data);
    } catch (err) {
      console.error('Error fetching job:', err);
    }
  };

  const fetchRelatedJobs = async () => {
    try {
      const response = await jobAPI.getRelatedJobs(id);
      setRelatedJobs(response.data || []);
    } catch (err) {
      console.error('Error fetching related jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await applicationAPI.applyJob({ jobId: id });
      alert('Application submitted successfully!');
    } catch (err) {
      alert(err.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  const renderLocation = (location) => {
    if (!location) return 'Unknown';
    if (typeof location === 'string') return location;
    return [location.address, location.district, location.city].filter(Boolean).join(', ');
  };

  const safeArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.trim().length) return [value];
    return [];
  };

  if (loading || !job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Job Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
            <p className="text-muted text-lg mb-4">{job.companyName}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-light rounded-lg">
              <div>
                <p className="text-sm text-muted">Location</p>
                <p className="font-semibold">{renderLocation(job.location)}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Salary</p>
                <p className="font-semibold">
                  {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} VND
                </p>
              </div>
              <div>
                <p className="text-sm text-muted">Job Type</p>
                <p className="font-semibold">{job.jobType || 'Full-time'}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Deadline</p>
                <p className="font-semibold">
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose max-w-none mb-6">
              {job.description}
            </div>

            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              {safeArray(job.requirements).map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {safeArray(job.requiredSkills).map((skill, idx) => (
                <span key={idx} className="badge-primary">
                  {skill}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Benefits</h2>
            <ul className="list-disc list-inside space-y-2">
              {safeArray(job.benefits).map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card mb-6 sticky top-4">
            <button
              onClick={handleApply}
              disabled={applying}
              className="w-full btn-primary disabled:opacity-50 mb-4"
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
            <button className="w-full btn-outline">Save Job</button>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4">About Company</h3>
            <p className="text-muted">{job.companyDescription}</p>
            <button className="w-full btn-secondary mt-4">View Company</button>
          </div>
        </div>
      </div>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedJobs.map((relJob) => (
              <div
                key={relJob.jobId}
                className="card hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/jobs/${relJob.jobId}`)}
              >
                <h3 className="text-xl font-bold mb-2">{relJob.title}</h3>
                <p className="text-muted mb-3">{relJob.companyName}</p>
                <p className="text-sm text-muted">
                  💰 {relJob.salaryMin?.toLocaleString()} - {relJob.salaryMax?.toLocaleString()} VND
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

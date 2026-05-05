import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationAPI, jobAPI } from '../services/api';

const STATUS_OPTIONS = ['submitted', 'reviewing', 'interview', 'offered', 'accepted', 'rejected'];

const STATUS_COLORS = {
  submitted: 'bg-blue-100 text-blue-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-purple-100 text-purple-800',
  offered: 'bg-green-100 text-green-800',
  accepted: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function JobApplications() {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [pipeline, setPipeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchAll();
  }, [jobId, filterStatus]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [jobRes, appsRes, pipeRes] = await Promise.all([
        jobAPI.getJobDetail(jobId),
        applicationAPI.getApplicationsByJob(jobId, filterStatus ? { status: filterStatus } : {}),
        applicationAPI.getJobPipeline(jobId),
      ]);
      setJob(jobRes.data);
      setApplications(appsRes.data || []);
      setPipeline(pipeRes.data || []);
    } catch (err) {
      console.error('Error loading applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    setUpdatingId(applicationId);
    try {
      await applicationAPI.updateApplicationStatus(applicationId, newStatus);
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationId ? { ...a, status: newStatus } : a))
      );
      // refresh pipeline counts
      const pipeRes = await applicationAPI.getJobPipeline(jobId);
      setPipeline(pipeRes.data || []);
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getPipelineCount = (status) => {
    const entry = pipeline.find((p) => p.status === status);
    return entry ? parseInt(entry.count) : 0;
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
      <button onClick={() => navigate('/my-jobs')} className="btn-outline mb-6">
        &larr; Back to My Jobs
      </button>

      <h1 className="text-3xl font-bold mb-2">{job?.title}</h1>
      <p className="text-muted mb-8">{job?.companyName || job?.companyInfo?.name}</p>

      {/* Pipeline stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        {STATUS_OPTIONS.map((s) => (
          <div
            key={s}
            className={`card text-center cursor-pointer transition hover:shadow-md ${filterStatus === s ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
          >
            <p className="text-2xl font-bold">{getPipelineCount(s)}</p>
            <p className="text-xs text-muted capitalize">{s}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium">Filter by status:</span>
        <select
          className="form-input w-auto"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <span className="text-sm text-muted">{applications.length} application(s)</span>
      </div>

      {/* Applications list */}
      {applications.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-muted">No applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="card">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{app.full_name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[app.status] || 'bg-gray-100 text-gray-800'}`}>
                      {app.status}
                    </span>
                  </div>
                  {app.phone && <p className="text-sm text-muted mb-1">Phone: {app.phone}</p>}
                  {app.location && (
                    <p className="text-sm text-muted mb-1">
                      Location: {typeof app.location === 'string' ? app.location : [app.location.address, app.location.city].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {app.summary && (
                    <p className="text-sm mt-2 line-clamp-2">{app.summary}</p>
                  )}
                  {app.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {app.skills.slice(0, 5).map((skill, i) => (
                        <span key={i} className="badge-primary text-xs">{skill}</span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted mt-2">
                    Applied: {new Date(app.applied_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2 min-w-[180px]">
                  <label className="text-sm font-medium">Change Status</label>
                  <select
                    className="form-input"
                    value={app.status}
                    disabled={updatingId === app.id}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  {updatingId === app.id && (
                    <p className="text-xs text-muted">Updating...</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';
import authStore from '../store/authStore';

const renderLocation = (location) => {
  if (!location) return 'Not specified';
  if (typeof location === 'string') return location;
  return [location.address, location.district, location.city].filter(Boolean).join(', ') || 'Not specified';
};

const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`toast fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium max-w-sm ${toast.type === 'success' ? 'bg-secondary' : 'bg-danger'}`}>
      <span>{toast.type === 'success' ? '✓' : '✕'}</span>
      {toast.msg}
    </div>
  );
};

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = authStore();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => { fetchJobDetail(); fetchRelatedJobs(); }, [id]);

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
    if (!isAuthenticated) { navigate('/login'); return; }
    setApplying(true);
    try {
      await applicationAPI.applyJob({ jobId: id });
      setApplied(true);
      showToast('success', 'Application submitted successfully!');
    } catch (err) {
      showToast('error', err.message || 'Failed to apply. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading || !job) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  const company = job.companyInfo?.name || '—';
  const salary = job.salary?.min
    ? `${job.salary.min.toLocaleString('vi-VN')} – ${job.salary.max?.toLocaleString('vi-VN')} ${job.salary.currency || 'VND'}`
    : 'Negotiable';
  const jobTypes = Array.isArray(job.jobType) ? job.jobType : job.jobType ? [job.jobType] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toast toast={toast} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="card">
            <div className="flex items-start gap-4 mb-5">
              {job.companyInfo?.logoUrl ? (
                <img src={job.companyInfo.logoUrl} alt={company}
                  className="w-16 h-16 rounded-xl object-cover border flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary font-bold text-2xl flex items-center justify-center flex-shrink-0">
                  {company.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-gray-500 mt-0.5">{company}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {jobTypes.map((t) => <span key={t} className="badge-primary">{t}</span>)}
                  {job.level && <span className="badge bg-purple-100 text-purple-700">{job.level}</span>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl text-sm">
              <div>
                <p className="text-gray-400 text-xs mb-1">Location</p>
                <p className="font-semibold text-gray-700">{renderLocation(job.location)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Salary</p>
                <p className="font-semibold text-secondary">{salary}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Level</p>
                <p className="font-semibold text-gray-700">{job.level || '—'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Deadline</p>
                <p className="font-semibold text-gray-700">
                  {job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Job Description</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</div>
          </div>

          {/* Requirements */}
          {(job.requirements?.skills?.length > 0 || job.requirements?.education || job.requirements?.yearsOfExperience) && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              {job.requirements?.skills?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.skills.map((skill, i) => (
                      <span key={i} className={`badge ${skill.isRequired ? 'badge-primary' : 'bg-gray-100 text-gray-600'}`}>
                        {skill.name}{skill.isRequired ? ' *' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {job.requirements?.yearsOfExperience?.min !== undefined && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Experience:</span> {job.requirements.yearsOfExperience.min}
                  {job.requirements.yearsOfExperience.max ? `–${job.requirements.yearsOfExperience.max}` : '+'} years
                </p>
              )}
              {job.requirements?.education && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Education:</span> {job.requirements.education}
                </p>
              )}
              {job.requirements?.languageRequirements?.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Languages:</span> {job.requirements.languageRequirements.join(', ')}
                </p>
              )}
            </div>
          )}

          {/* Benefits */}
          {job.benefits?.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Benefits</h2>
              <ul className="space-y-2">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="w-5 h-5 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card sticky top-20">
            {user?.role === 'candidate' || !isAuthenticated ? (
              <>
                {applied ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">🎉</div>
                    <p className="font-semibold text-secondary">Application Submitted!</p>
                    <p className="text-sm text-gray-500 mt-1">We'll notify you of any updates.</p>
                  </div>
                ) : (
                  <button onClick={handleApply} disabled={applying} className="w-full btn-primary py-3 text-base">
                    {applying ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Applying…</>
                    ) : 'Apply Now'}
                  </button>
                )}
                {!isAuthenticated && (
                  <p className="text-xs text-gray-400 text-center mt-2">You need to sign in to apply</p>
                )}
              </>
            ) : null}

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-500">
              <p className="flex items-center gap-2">👁 {job.viewCount ?? 0} views</p>
              <p className="flex items-center gap-2">📝 {job.applicationCount ?? 0} applications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related jobs */}
      {relatedJobs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedJobs.map((j) => (
              <div key={j.jobId} className="card-hover" onClick={() => navigate(`/jobs/${j.jobId}`)}>
                <h3 className="font-bold mb-1">{j.title}</h3>
                <p className="text-sm text-gray-500">{j.companyInfo?.name || j.companyName}</p>
                {(j.salary?.min || j.salaryMin) && (
                  <p className="text-sm text-secondary mt-2">
                    💰 {(j.salary?.min || j.salaryMin)?.toLocaleString('vi-VN')} VND
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

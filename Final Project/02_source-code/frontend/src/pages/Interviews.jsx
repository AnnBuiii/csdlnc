import { useEffect, useState } from 'react';
import { interviewAPI } from '../services/api';
import authStore from '../store/authStore';

const STATUS_CONFIG = {
  scheduled:  { label: 'Scheduled',  color: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-400'    },
  completed:  { label: 'Completed',  color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400' },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700',      dot: 'bg-red-400'     },
};

const STATUS_OPTIONS = [
  { value: 'all',       label: 'All Interviews' },
  { value: 'scheduled', label: 'Scheduled'      },
  { value: 'completed', label: 'Completed'      },
  { value: 'cancelled', label: 'Cancelled'      },
];

const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    time: d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
};

export default function Interviews() {
  const { user } = authStore();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => { fetchInterviews(); }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const isRecruiter = user?.role === 'recruiter';
      const response = isRecruiter
        ? await interviewAPI.getCompanyInterviews()
        : await interviewAPI.getInterviews();
      setInterviews(response.data || []);
    } catch (err) {
      setError('Failed to load interviews.');
      console.error('Error fetching interviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === 'all' ? interviews : interviews.filter((i) => i.status === filter);

  const getStatusCfg = (status) =>
    STATUS_CONFIG[status] || { label: status, color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Interviews</h1>
          <p className="text-gray-500 text-sm mt-1">
            {user?.role === 'recruiter' ? 'Interviews scheduled by your company' : 'Your upcoming and past interviews'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 whitespace-nowrap">Filter:</label>
          <select
            className="form-input py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="card mb-4 border border-red-200 bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">📅</div>
          <p className="text-xl font-semibold mb-1">No interviews found</p>
          <p className="text-gray-500 text-sm">
            {filter === 'all'
              ? 'No interviews scheduled yet.'
              : `No "${getStatusCfg(filter).label.toLowerCase()}" interviews.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((interview) => {
            const cfg = getStatusCfg(interview.status);
            const dt = formatDateTime(interview.scheduledDate);
            return (
              <div key={interview.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Date block */}
                  <div className="flex-shrink-0 w-14 text-center bg-primary/5 rounded-xl p-2">
                    <p className="text-xl font-bold text-primary leading-none">
                      {interview.scheduledDate ? new Date(interview.scheduledDate).getDate() : '—'}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {interview.scheduledDate
                        ? new Date(interview.scheduledDate).toLocaleString('default', { month: 'short' })
                        : ''}
                    </p>
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{interview.jobTitle || 'Interview'}</h3>
                        {user?.role === 'recruiter' && interview.candidateName && (
                          <p className="text-sm text-gray-500">Candidate: {interview.candidateName}</p>
                        )}
                        {user?.role === 'candidate' && interview.interviewerName && (
                          <p className="text-sm text-gray-500">Interviewer: {interview.interviewerName}</p>
                        )}
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-gray-500">
                      {dt.time !== '—' && <span>🕐 {dt.date} at {dt.time}</span>}
                      {interview.duration && <span>⏱ {interview.duration} min</span>}
                      {interview.type && <span>📋 {interview.type}</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

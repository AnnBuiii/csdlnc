import { useEffect, useState } from 'react';
import { interviewAPI } from '../services/api';

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInterviews();
  }, [filter]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await interviewAPI.getInterviews();
      const interviewsData = response.data || [];
      setInterviews(
        filter === 'all'
          ? interviewsData
          : interviewsData.filter((interview) => interview.status === filter)
      );
    } catch (err) {
      console.error('Error fetching interviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      scheduled: 'badge-primary',
      completed: 'badge-secondary',
      cancelled: 'badge-danger',
    };
    return colors[status] || 'badge-primary';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Interviews</h1>

      {/* Filters */}
      <div className="card mb-6 flex gap-3 flex-wrap">
        {['all', 'scheduled', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-dark hover:bg-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Interviews Table */}
      {interviews.length === 0 ? (
        <div className="text-center py-12 card">
          <p className="text-muted text-lg">No interviews found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{interview.jobTitle}</h3>
                  <p className="text-muted">{interview.candidateName}</p>
                </div>
                <span className={`badge ${getStatusBadge(interview.status)}`}>
                  {interview.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted">Scheduled</p>
                  <p className="font-semibold">
                    {new Date(interview.scheduledDate).toLocaleDateString()} at{' '}
                    {new Date(interview.scheduledDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted">Duration</p>
                  <p className="font-semibold">{interview.duration} minutes</p>
                </div>
                <div>
                  <p className="text-muted">Type</p>
                  <p className="font-semibold">{interview.type}</p>
                </div>
                <div>
                  <p className="text-muted">Interviewer</p>
                  <p className="font-semibold">{interview.interviewerName}</p>
                </div>
              </div>

              <button className="btn-primary text-sm">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

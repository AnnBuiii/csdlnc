import { useEffect, useState } from 'react';
import { applicationAPI } from '../services/api';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getApplications({
        status: filter === 'all' ? undefined : filter,
        limit: 20,
      });
      setApplications(response.data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      applied: 'bg-blue-100 text-blue-800',
      interviewed: 'bg-purple-100 text-purple-800',
      accepted: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
      <h1 className="text-4xl font-bold mb-8">My Applications</h1>

      {/* Filters */}
      <div className="card mb-6 flex gap-3 flex-wrap">
        {['all', 'applied', 'interviewed', 'accepted', 'rejected'].map((status) => (
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

      {/* Applications Table/List */}
      {applications.length === 0 ? (
        <div className="text-center py-12 card">
          <p className="text-muted text-lg">No applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{app.jobTitle}</h3>
                  <p className="text-muted">{app.companyName}</p>
                </div>
                <span className={`badge ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted">Applied</p>
                  <p className="font-semibold">{new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted">Location</p>
                  <p className="font-semibold">{app.location}</p>
                </div>
                <div>
                  <p className="text-muted">Salary</p>
                  <p className="font-semibold">
                    {app.salaryMin?.toLocaleString()} - {app.salaryMax?.toLocaleString()} VND
                  </p>
                </div>
                <div>
                  <p className="text-muted">Cover Letter</p>
                  <p className="font-semibold">{app.coverLetter ? 'Yes' : 'No'}</p>
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

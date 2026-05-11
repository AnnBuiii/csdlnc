import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applicationAPI } from "../services/api";

const STATUS_OPTIONS = [
  { value: "all", label: "All Applications" },
  { value: "submitted", label: "Submitted" },
  { value: "reviewing", label: "Under Review" },
  { value: "interview", label: "Interview" },
  { value: "offered", label: "Offered" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_CONFIG = {
  submitted: { label: "Submitted",    color: "bg-blue-100 text-blue-800",     dot: "bg-blue-400"    },
  reviewing: { label: "Under Review", color: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-400"  },
  interview: { label: "Interview",    color: "bg-purple-100 text-purple-800", dot: "bg-purple-400"  },
  offered:   { label: "Offered",      color: "bg-indigo-100 text-indigo-800", dot: "bg-indigo-400"  },
  accepted:  { label: "Accepted",     color: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-400" },
  rejected:  { label: "Rejected",     color: "bg-red-100 text-red-800",       dot: "bg-red-400"     },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await applicationAPI.getApplications({
        status: filter === "all" ? undefined : filter,
        limit: 20,
      });
      setApplications(response.data || []);
      setMeta(response.meta || null);
    } catch (err) {
      setError("Failed to load applications. Please try again.");
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusCfg = (status) =>
    STATUS_CONFIG[status] || { label: status, color: "bg-gray-100 text-gray-800", dot: "bg-gray-400" };

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
          <h1 className="text-3xl font-bold">My Applications</h1>
          {meta && (
            <p className="text-muted text-sm mt-1">
              {meta.total} application{meta.total !== 1 ? "s" : ""}
              {filter !== "all" && ` · filtered by "${getStatusCfg(filter).label}"`}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-muted whitespace-nowrap">Filter:</label>
          <select
            className="form-input py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="card mb-4 border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Empty state */}
      {applications.length === 0 ? (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-xl font-semibold mb-1">No applications found</p>
          <p className="text-muted text-sm">
            {filter === "all"
              ? "You haven't applied for any jobs yet."
              : `No applications with status "${getStatusCfg(filter).label}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => {
            const cfg = getStatusCfg(app.status);
            const isJobClosed = app.job_status && app.job_status !== "active";

            return (
              <div
                key={app.id}
                onClick={() => app.job_id && navigate(`/jobs/${app.job_id}`)}
                className="card hover:shadow-md hover:border-primary/20 transition-all duration-150 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Company avatar */}
                  {app.logo_url ? (
                    <img
                      src={app.logo_url}
                      alt={app.company_name}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-100 border flex items-center justify-center flex-shrink-0 text-xl font-bold text-gray-400">
                      {app.company_name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-base font-bold truncate">
                          {app.job_title || "Untitled Position"}
                        </h3>
                        <p className="text-muted text-sm">{app.company_name || "—"}</p>
                      </div>

                      {/* Status badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2 text-xs text-muted">
                      {app.location && <span>📍 {app.location}</span>}
                      <span>Applied {formatDate(app.applied_at)}</span>
                      <span>Cover letter: {app.cover_letter ? "Yes" : "No"}</span>
                      {isJobClosed && (
                        <span className="text-orange-500 font-medium">
                          ⚠ Job is {app.job_status}
                        </span>
                      )}
                      <span className="ml-auto text-primary font-medium">View job →</span>
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

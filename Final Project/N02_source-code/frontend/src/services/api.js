import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add authorization token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Auth APIs
export const authAPI = {
  registerCandidate: (data) => apiClient.post('/auth/register/candidate', data),
  registerRecruiter: (data) => apiClient.post('/auth/register/recruiter', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: (data) => apiClient.post('/auth/logout', data),
  refreshToken: (data) => apiClient.post('/auth/refresh', data),
  me: () => apiClient.get('/auth/me'),
};

// Job APIs
export const jobAPI = {
  searchJobs: (params) => apiClient.get('/jobs', { params }),
  getJobDetail: (id) => apiClient.get(`/jobs/${id}`),
  getRelatedJobs: (id) => apiClient.get(`/jobs/${id}/related`),
  createJob: (data) => apiClient.post('/jobs', data),
  updateJob: (id, data) => apiClient.put(`/jobs/${id}`, data),
  updateJobStatus: (id, status) => apiClient.patch(`/jobs/${id}/status`, { status }),
  getCompanyJobs: (params) => apiClient.get('/jobs/company/mine', { params }),
};

// Candidate APIs
export const candidateAPI = {
  getProfile: () => apiClient.get('/candidates/profile'),
  getPublicProfile: (id) => apiClient.get(`/candidates/${id}/profile`),
  updateProfile: (data) => apiClient.put('/candidates/profile', data),
  addExperience: (data) => apiClient.post('/candidates/profile/experience', data),
  deleteExperience: (expId) => apiClient.delete(`/candidates/profile/experience/${expId}`),
  addSkill: (data) => apiClient.post('/candidates/profile/skills', data),
  deleteSkill: (index) => apiClient.delete(`/candidates/profile/skills/${index}`),
  searchCandidates: (params) => apiClient.get('/candidates/search', { params }),
};

// Company APIs
export const companyAPI = {
  getProfile: () => apiClient.get('/companies/profile'),
  updateProfile: (data) => apiClient.put('/companies/profile', data),
};

// Application APIs
export const applicationAPI = {
  applyJob: (data) => apiClient.post('/applications', data),
  getApplications: (params) => apiClient.get('/applications/mine', { params }),
  getApplicationsByJob: (jobId, params) => apiClient.get(`/applications/job/${jobId}`, { params }),
  getJobPipeline: (jobId) => apiClient.get(`/applications/job/${jobId}/pipeline`),
  updateApplicationStatus: (id, status) => apiClient.patch(`/applications/${id}/status`, { status }),
};

// Interview APIs
export const interviewAPI = {
  scheduleInterview: (data) => apiClient.post('/interviews', data),
  getInterviews: (params) => apiClient.get('/interviews/mine', { params }),
  getCompanyInterviews: (params) => apiClient.get('/interviews/company', { params }),
  rescheduleInterview: (id, data) => apiClient.patch(`/interviews/${id}/reschedule`, data),
  updateInterviewResult: (id, data) => apiClient.patch(`/interviews/${id}/result`, data),
};

// Recommendation APIs
export const recommendationAPI = {
  getJobRecommendations: (params) => apiClient.get('/recommendations/jobs', { params }),
};

// Review APIs
export const reviewAPI = {
  submitReview: (data) => apiClient.post('/reviews', data),
  getCompanyReviews: (companyId, params) => apiClient.get(`/reviews/company/${companyId}`, { params }),
  approveReview: (id, approved) => apiClient.patch(`/reviews/${id}/approve`, { approved }),
};

// Analytics APIs
export const analyticsAPI = {
  getRecruiterDashboard: () => apiClient.get('/analytics/recruiter'),
  getAdminDashboard: () => apiClient.get('/analytics/admin'),
  getUserActivity: (date) => apiClient.get('/analytics/activity', { params: date ? { date } : {} }),
  getJobStats: (jobId) => apiClient.get(`/analytics/jobs/${jobId}`),
  getCompanyJobClicks: () => apiClient.get('/analytics/company/job-clicks'),
};

// Notification APIs
export const notificationAPI = {
  getNotifications: () => apiClient.get('/notifications'),
  getUnreadCount: () => apiClient.get('/notifications/count'),
  markAllRead: () => apiClient.delete('/notifications'),
};

export default apiClient;

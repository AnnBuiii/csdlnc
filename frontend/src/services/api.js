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
    if (error.response?.status === 401) {
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
  deleteJob: (id) => apiClient.delete(`/jobs/${id}`),
};

// Candidate APIs
export const candidateAPI = {
  getProfile: () => apiClient.get('/candidates/profile'),
  getPublicProfile: (id) => apiClient.get(`/candidates/${id}/profile`),
  updateProfile: (data) => apiClient.put('/candidates/profile', data),
  addExperience: (data) => apiClient.post('/candidates/profile/experience', data),
  addSkill: (data) => apiClient.post('/candidates/profile/skills', data),
  searchCandidates: (params) => apiClient.get('/candidates', { params }),
};

// Company APIs
export const companyAPI = {
  getProfile: () => apiClient.get('/companies/profile'),
  updateProfile: (data) => apiClient.put('/companies/profile', data),
  getJobs: (params) => apiClient.get('/companies/jobs', { params }),
};

// Application APIs
export const applicationAPI = {
  applyJob: (data) => apiClient.post('/applications', data),
  getApplications: (params) => apiClient.get('/applications/mine', { params }),
  getApplicationDetail: (id) => apiClient.get(`/applications/${id}`),
  updateApplicationStatus: (id, data) => apiClient.put(`/applications/${id}`, data),
};

// Interview APIs
export const interviewAPI = {
  scheduleInterview: (data) => apiClient.post('/interviews', data),
  getInterviews: (params) => apiClient.get('/interviews/mine', { params }),
  getInterviewDetail: (id) => apiClient.get(`/interviews/${id}`),
  updateInterview: (id, data) => apiClient.put(`/interviews/${id}`, data),
  completeInterview: (id, data) => apiClient.post(`/interviews/${id}/complete`, data),
};

// Recommendation APIs
export const recommendationAPI = {
  getJobRecommendations: (params) => apiClient.get('/recommendations/jobs', { params }),
};

// Review APIs
export const reviewAPI = {
  submitReview: (data) => apiClient.post('/reviews', data),
  getReviews: (params) => apiClient.get('/reviews', { params }),
  getReviewDetail: (id) => apiClient.get(`/reviews/${id}`),
};

// Analytics APIs
export const analyticsAPI = {
  getDashboardStats: () => apiClient.get('/analytics/dashboard'),
  getJobStats: (jobId) => apiClient.get(`/analytics/jobs/${jobId}`),
  getCandidateStats: () => apiClient.get('/analytics/candidates'),
};

// Notification APIs
export const notificationAPI = {
  getNotifications: (params) => apiClient.get('/notifications', { params }),
  markAsRead: (id) => apiClient.put(`/notifications/${id}/read`),
  deleteNotification: (id) => apiClient.delete(`/notifications/${id}`),
};

export default apiClient;

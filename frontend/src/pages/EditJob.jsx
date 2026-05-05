import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jobAPI } from '../services/api';

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    deadline: '',
    skills: [],
    benefits: [],
    status: 'active',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobAPI.getJobDetail(id);
        const job = response.data;
        setFormData({
          title: job.title || '',
          description: job.description || '',
          location: typeof job.location === 'string' ? job.location : job.location?.city || '',
          jobType: Array.isArray(job.jobType) ? job.jobType[0] : (job.jobType || 'Full-time'),
          salaryMin: job.salary?.min ?? job.salaryMin ?? '',
          salaryMax: job.salary?.max ?? job.salaryMax ?? '',
          deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
          skills: job.requirements?.skills?.map(s => s.name) || [],
          benefits: Array.isArray(job.benefits) ? job.benefits : [],
          status: job.status || 'active',
        });
      } catch (err) {
        alert('Failed to load job');
        navigate('/my-jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayFieldChange = (e, field, index) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayField = (field, index) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await jobAPI.updateJob(id, formData);
      alert('Job updated successfully!');
      navigate('/my-jobs');
    } catch (err) {
      alert(err.message || 'Failed to update job');
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Edit Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Job Information</h2>

          <div>
            <label className="form-label">Job Title *</label>
            <input type="text" name="title" className="form-input" value={formData.title} onChange={handleChange} required />
          </div>

          <div>
            <label className="form-label">Description *</label>
            <textarea name="description" className="form-input" rows="6" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Location *</label>
              <input type="text" name="location" className="form-input" value={formData.location} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Job Type *</label>
              <select name="jobType" className="form-input" value={formData.jobType} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="form-label">Status *</label>
              <select name="status" className="form-input" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Minimum Salary</label>
              <input type="number" name="salaryMin" className="form-input" value={formData.salaryMin} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Maximum Salary</label>
              <input type="number" name="salaryMax" className="form-input" value={formData.salaryMax} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="form-label">Application Deadline *</label>
            <input type="date" name="deadline" className="form-input" value={formData.deadline} onChange={handleChange} required />
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
          {formData.skills.map((skill, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" className="form-input flex-1" value={skill} onChange={(e) => handleArrayFieldChange(e, 'skills', idx)} placeholder="Enter skill" />
              <button type="button" onClick={() => removeArrayField('skills', idx)} className="px-3 py-2 bg-danger text-white rounded-lg">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayField('skills')} className="btn-outline">+ Add Skill</button>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Benefits</h2>
          {formData.benefits.map((benefit, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" className="form-input flex-1" value={benefit} onChange={(e) => handleArrayFieldChange(e, 'benefits', idx)} placeholder="Enter benefit" />
              <button type="button" onClick={() => removeArrayField('benefits', idx)} className="px-3 py-2 bg-danger text-white rounded-lg">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayField('benefits')} className="btn-outline">+ Add Benefit</button>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/my-jobs')} className="btn-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
}

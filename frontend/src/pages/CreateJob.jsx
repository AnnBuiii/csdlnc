import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';

export default function CreateJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'full-time',
    salaryMin: '',
    salaryMax: '',
    deadline: '',
    requirements: [],
    requiredSkills: [],
    benefits: [],
  });

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
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await jobAPI.createJob(formData);
      if (response.success) {
        alert('Job posted successfully!');
        navigate(`/jobs/${response.data.id}`);
      }
    } catch (err) {
      alert(err.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Post a New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Job Information</h2>

          <div>
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              className="form-input"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Location *</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label">Job Type *</label>
              <select
                name="jobType"
                className="form-input"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Minimum Salary</label>
              <input
                type="number"
                name="salaryMin"
                className="form-input"
                value={formData.salaryMin}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Maximum Salary</label>
              <input
                type="number"
                name="salaryMax"
                className="form-input"
                value={formData.salaryMax}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Application Deadline *</label>
            <input
              type="date"
              name="deadline"
              className="form-input"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          {formData.requirements.map((req, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                className="form-input flex-1"
                value={req}
                onChange={(e) => handleArrayFieldChange(e, 'requirements', idx)}
                placeholder="Enter requirement"
              />
              <button
                type="button"
                onClick={() => removeArrayField('requirements', idx)}
                className="px-3 py-2 bg-danger text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('requirements')}
            className="btn-outline"
          >
            + Add Requirement
          </button>
        </div>

        {/* Required Skills */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
          {formData.requiredSkills.map((skill, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                className="form-input flex-1"
                value={skill}
                onChange={(e) => handleArrayFieldChange(e, 'requiredSkills', idx)}
                placeholder="Enter skill"
              />
              <button
                type="button"
                onClick={() => removeArrayField('requiredSkills', idx)}
                className="px-3 py-2 bg-danger text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('requiredSkills')}
            className="btn-outline"
          >
            + Add Skill
          </button>
        </div>

        {/* Benefits */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Benefits</h2>
          {formData.benefits.map((benefit, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                className="form-input flex-1"
                value={benefit}
                onChange={(e) => handleArrayFieldChange(e, 'benefits', idx)}
                placeholder="Enter benefit"
              />
              <button
                type="button"
                onClick={() => removeArrayField('benefits', idx)}
                className="px-3 py-2 bg-danger text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('benefits')}
            className="btn-outline"
          >
            + Add Benefit
          </button>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Job'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

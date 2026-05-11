import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';

const JOB_LEVELS = ['Intern', 'Junior', 'Middle', 'Senior', 'Lead', 'Manager'];

const emptySkill = () => ({ name: '', isRequired: true });

export default function CreateJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    level: '',
    jobType: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    deadline: '',
    requirements: {
      skills: [],
      yearsOfExperience: { min: '', max: '' },
      education: '',
      languageRequirements: [],
    },
    benefits: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ── Skills ────────────────────────────────────────────────────
  const addSkill = () =>
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        skills: [...formData.requirements.skills, emptySkill()],
      },
    });

  const removeSkill = (idx) =>
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        skills: formData.requirements.skills.filter((_, i) => i !== idx),
      },
    });

  const handleSkillChange = (idx, field, value) => {
    const updated = formData.requirements.skills.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s
    );
    setFormData({
      ...formData,
      requirements: { ...formData.requirements, skills: updated },
    });
  };

  // ── Years of experience ───────────────────────────────────────
  const handleYearsChange = (field, value) =>
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        yearsOfExperience: {
          ...formData.requirements.yearsOfExperience,
          [field]: value,
        },
      },
    });

  // ── Education ─────────────────────────────────────────────────
  const handleEducationChange = (e) =>
    setFormData({
      ...formData,
      requirements: { ...formData.requirements, education: e.target.value },
    });

  // ── Language requirements ─────────────────────────────────────
  const addLanguage = () =>
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        languageRequirements: [...formData.requirements.languageRequirements, ''],
      },
    });

  const removeLanguage = (idx) =>
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        languageRequirements: formData.requirements.languageRequirements.filter(
          (_, i) => i !== idx
        ),
      },
    });

  const handleLanguageChange = (idx, value) => {
    const updated = formData.requirements.languageRequirements.map((l, i) =>
      i === idx ? value : l
    );
    setFormData({
      ...formData,
      requirements: { ...formData.requirements, languageRequirements: updated },
    });
  };

  // ── Benefits ─────────────────────────────────────────────────
  const addBenefit = () =>
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });

  const removeBenefit = (idx) =>
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== idx),
    });

  const handleBenefitChange = (idx, value) => {
    const updated = formData.benefits.map((b, i) => (i === idx ? value : b));
    setFormData({ ...formData, benefits: updated });
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      requirements: {
        ...formData.requirements,
        skills: formData.requirements.skills.filter((s) => s.name.trim()),
        yearsOfExperience: {
          min: formData.requirements.yearsOfExperience.min !== ''
            ? Number(formData.requirements.yearsOfExperience.min)
            : undefined,
          max: formData.requirements.yearsOfExperience.max !== ''
            ? Number(formData.requirements.yearsOfExperience.max)
            : undefined,
        },
        languageRequirements: formData.requirements.languageRequirements.filter(
          (l) => l.trim()
        ),
      },
      benefits: formData.benefits.filter((b) => b.trim()),
    };

    try {
      const response = await jobAPI.createJob(payload);
      if (response.success) {
        showToast('success', 'Job posted successfully!');
        setTimeout(() => navigate(`/jobs/${response.data.id}`), 1500);
      }
    } catch (err) {
      showToast('error', err.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {toast && (
        <div className={`toast fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium ${toast.type === 'success' ? 'bg-secondary' : 'bg-danger'}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span> {toast.msg}
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8">Post a New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Information */}
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
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Job Level</label>
            <select
              name="level"
              className="form-input"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="">-- Select level --</option>
              {JOB_LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
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

          {/* Skills */}
          <div className="mb-4">
            <label className="form-label font-semibold">Skills</label>
            {formData.requirements.skills.map((skill, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="Skill name (e.g. React, Python)"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(idx, 'name', e.target.value)}
                />
                <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={skill.isRequired}
                    onChange={(e) => handleSkillChange(idx, 'isRequired', e.target.checked)}
                  />
                  Required
                </label>
                <button
                  type="button"
                  onClick={() => removeSkill(idx)}
                  className="px-3 py-2 bg-danger text-white rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addSkill} className="btn-outline">
              + Add Skill
            </button>
          </div>

          {/* Years of experience */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Min Years of Experience</label>
              <input
                type="number"
                min="0"
                className="form-input"
                value={formData.requirements.yearsOfExperience.min}
                onChange={(e) => handleYearsChange('min', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Max Years of Experience</label>
              <input
                type="number"
                min="0"
                className="form-input"
                value={formData.requirements.yearsOfExperience.max}
                onChange={(e) => handleYearsChange('max', e.target.value)}
              />
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <label className="form-label">Education</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Bachelor's Degree in Computer Science"
              value={formData.requirements.education}
              onChange={handleEducationChange}
            />
          </div>

          {/* Language requirements */}
          <div>
            <label className="form-label font-semibold">Language Requirements</label>
            {formData.requirements.languageRequirements.map((lang, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="e.g. English (B2)"
                  value={lang}
                  onChange={(e) => handleLanguageChange(idx, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeLanguage(idx)}
                  className="px-3 py-2 bg-danger text-white rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addLanguage} className="btn-outline">
              + Add Language
            </button>
          </div>
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
                onChange={(e) => handleBenefitChange(idx, e.target.value)}
                placeholder="Enter benefit"
              />
              <button
                type="button"
                onClick={() => removeBenefit(idx)}
                className="px-3 py-2 bg-danger text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addBenefit} className="btn-outline">
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

import { useEffect, useState } from 'react';
import { candidateAPI } from '../services/api';
import authStore from '../store/authStore';

const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];

const emptyExperience = {
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
  achievements: '',
};

const emptySkill = {
  name: '',
  level: '',
  yearsOfExp: '',
};

export default function CandidateProfile() {
  const { user } = authStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
    isPublic: true,
  });

  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState(emptyExperience);
  const [expLoading, setExpLoading] = useState(false);

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [skillLoading, setSkillLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await candidateAPI.getProfile();
      setProfile(response.data);
      setFormData(response.data || {});
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await candidateAPI.updateProfile(formData);
      setProfile((prev) => ({ ...prev, ...formData }));
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update profile');
    }
  };

  const handleExpChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'isCurrent' && checked ? { endDate: '' } : {}),
    }));
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    setExpLoading(true);
    try {
      const payload = {
        company: expForm.company,
        role: expForm.role,
        startDate: expForm.startDate,
        isCurrent: expForm.isCurrent,
        description: expForm.description || undefined,
        achievements: expForm.achievements || undefined,
        ...(!expForm.isCurrent && expForm.endDate ? { endDate: expForm.endDate } : {}),
      };
      await candidateAPI.addExperience(payload);
      await fetchProfile();
      setExpForm(emptyExperience);
      setShowExpForm(false);
    } catch (err) {
      alert(err.message || 'Failed to add experience');
    } finally {
      setExpLoading(false);
    }
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setSkillLoading(true);
    try {
      const payload = {
        name: skillForm.name,
        ...(skillForm.level ? { level: skillForm.level } : {}),
        ...(skillForm.yearsOfExp ? { yearsOfExp: Number(skillForm.yearsOfExp) } : {}),
      };
      await candidateAPI.addSkill(payload);
      await fetchProfile();
      setSkillForm(emptySkill);
      setShowSkillForm(false);
    } catch (err) {
      alert(err.message || 'Failed to add skill');
    } finally {
      setSkillLoading(false);
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
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      {/* Profile Header */}
      <div className="card mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold">{user?.fullName}</h2>
            <p className="text-muted">{formData.headline}</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className={editing ? 'btn-secondary' : 'btn-primary'}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="form-label">Headline</label>
              <input
                type="text"
                name="headline"
                className="form-input"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Your professional headline"
              />
            </div>

            <div>
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-input"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-input"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Website</label>
              <input
                type="url"
                name="website"
                className="form-input"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
              />
              <label htmlFor="isPublic" className="text-sm">
                Make profile public
              </label>
            </div>

            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
            <p><strong>Location:</strong> {formData.location || 'Not provided'}</p>
            <p><strong>Website:</strong> {formData.website || 'Not provided'}</p>
            {formData.bio && (
              <p><strong>Bio:</strong> {formData.bio}</p>
            )}
          </div>
        )}
      </div>

      {/* Experience Section */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Experience</h2>
          <button
            onClick={() => setShowExpForm(!showExpForm)}
            className={showExpForm ? 'btn-secondary' : 'btn-primary'}
          >
            {showExpForm ? 'Cancel' : '+ Add Experience'}
          </button>
        </div>

        {showExpForm && (
          <form onSubmit={handleAddExperience} className="space-y-4 mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Role *</label>
                <input
                  type="text"
                  name="role"
                  className="form-input"
                  value={expForm.role}
                  onChange={handleExpChange}
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>
              <div>
                <label className="form-label">Company *</label>
                <input
                  type="text"
                  name="company"
                  className="form-input"
                  value={expForm.company}
                  onChange={handleExpChange}
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-input"
                  value={expForm.startDate}
                  onChange={handleExpChange}
                  required
                />
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-input"
                  value={expForm.endDate}
                  onChange={handleExpChange}
                  disabled={expForm.isCurrent}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isCurrent"
                id="isCurrent"
                checked={expForm.isCurrent}
                onChange={handleExpChange}
              />
              <label htmlFor="isCurrent" className="text-sm">I currently work here</label>
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-input"
                rows="3"
                value={expForm.description}
                onChange={handleExpChange}
                placeholder="Describe your responsibilities"
              />
            </div>

            <div>
              <label className="form-label">Achievements</label>
              <textarea
                name="achievements"
                className="form-input"
                rows="2"
                value={expForm.achievements}
                onChange={handleExpChange}
                placeholder="Key achievements in this role"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={expLoading}>
              {expLoading ? 'Saving...' : 'Add Experience'}
            </button>
          </form>
        )}

        {profile?.experience && profile.experience.length > 0 ? (
          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="p-4 border-l-4 border-primary">
                <h3 className="font-bold">{exp.role}</h3>
                <p className="text-muted">{exp.company}</p>
                <p className="text-sm text-muted">
                  {new Date(exp.startDate).toLocaleDateString()} -{' '}
                  {exp.isCurrent || !exp.endDate ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                </p>
                {exp.description && <p className="mt-2">{exp.description}</p>}
                {exp.achievements && <p className="mt-1 text-sm text-muted">{exp.achievements}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No experience added yet</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Skills</h2>
          <button
            onClick={() => setShowSkillForm(!showSkillForm)}
            className={showSkillForm ? 'btn-secondary' : 'btn-primary'}
          >
            {showSkillForm ? 'Cancel' : '+ Add Skill'}
          </button>
        </div>

        {showSkillForm && (
          <form onSubmit={handleAddSkill} className="space-y-4 mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Skill Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={skillForm.name}
                  onChange={handleSkillChange}
                  placeholder="e.g. JavaScript"
                  required
                />
              </div>
              <div>
                <label className="form-label">Level</label>
                <select
                  name="level"
                  className="form-input"
                  value={skillForm.level}
                  onChange={handleSkillChange}
                >
                  <option value="">Select level</option>
                  {SKILL_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExp"
                  className="form-input"
                  value={skillForm.yearsOfExp}
                  onChange={handleSkillChange}
                  placeholder="e.g. 3"
                  min="0"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={skillLoading}>
              {skillLoading ? 'Saving...' : 'Add Skill'}
            </button>
          </form>
        )}

        {profile?.skills && profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <span key={idx} className="badge-primary">
                {skill.name}
                {skill.level && <span className="ml-1">· {skill.level}</span>}
                {skill.yearsOfExp ? <span className="ml-1">({skill.yearsOfExp}y)</span> : null}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted">No skills added yet</p>
        )}
      </div>
    </div>
  );
}

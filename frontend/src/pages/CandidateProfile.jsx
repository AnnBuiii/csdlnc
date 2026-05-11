import { useEffect, useState } from 'react';
import { candidateAPI } from '../services/api';
import authStore from '../store/authStore';

const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];

const emptyExperience = { company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: '', achievements: '' };
const emptySkill = { name: '', level: '', yearsOfExp: '' };

const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`toast fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium ${toast.type === 'success' ? 'bg-secondary' : 'bg-danger'}`}>
      <span>{toast.type === 'success' ? '✓' : '✕'}</span> {toast.msg}
    </div>
  );
};

export default function CandidateProfile() {
  const { user } = authStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({ phone: '', location: '', bio: '', isPublic: true });

  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState(emptyExperience);
  const [expLoading, setExpLoading] = useState(false);

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [skillLoading, setSkillLoading] = useState(false);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const response = await candidateAPI.getProfile();
      const data = response.data;
      setProfile(data);
      // Map nested MongoDB fields to flat form state
      setFormData({
        phone:    data?.personalInfo?.phone    || '',
        location: data?.personalInfo?.location || '',
        bio:      data?.summary               || '',
        isPublic: data?.isPublic ?? true,
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await candidateAPI.updateProfile({
        phone:    formData.phone,
        location: formData.location,
        summary:  formData.bio,
        isPublic: formData.isPublic,
      });
      setProfile((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, phone: formData.phone, location: formData.location },
        summary: formData.bio,
        isPublic: formData.isPublic,
      }));
      setEditing(false);
      showToast('success', 'Profile updated successfully!');
    } catch (err) {
      showToast('error', err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // ── Experience ────────────────────────────────────────────────
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
      await candidateAPI.addExperience({
        company:      expForm.company,
        role:         expForm.role,
        startDate:    expForm.startDate,
        isCurrent:    expForm.isCurrent,
        description:  expForm.description || undefined,
        achievements: expForm.achievements || undefined,
        ...(!expForm.isCurrent && expForm.endDate ? { endDate: expForm.endDate } : {}),
      });
      await fetchProfile();
      setExpForm(emptyExperience);
      setShowExpForm(false);
      showToast('success', 'Experience added!');
    } catch (err) {
      showToast('error', err.message || 'Failed to add experience');
    } finally {
      setExpLoading(false);
    }
  };

  const handleDeleteExperience = async (expId) => {
    try {
      await candidateAPI.deleteExperience(expId);
      setProfile((prev) => ({ ...prev, experience: prev.experience.filter((e) => e._id !== expId) }));
      showToast('success', 'Experience removed');
    } catch (err) {
      showToast('error', err.message || 'Failed to remove experience');
    }
  };

  // ── Skills ────────────────────────────────────────────────────
  const handleSkillChange = (e) => setSkillForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setSkillLoading(true);
    try {
      await candidateAPI.addSkill({
        name: skillForm.name,
        ...(skillForm.level      ? { level: skillForm.level }               : {}),
        ...(skillForm.yearsOfExp ? { yearsOfExp: Number(skillForm.yearsOfExp) } : {}),
      });
      await fetchProfile();
      setSkillForm(emptySkill);
      setShowSkillForm(false);
      showToast('success', 'Skill added!');
    } catch (err) {
      showToast('error', err.message || 'Failed to add skill');
    } finally {
      setSkillLoading(false);
    }
  };

  const handleDeleteSkill = async (idx) => {
    try {
      await candidateAPI.deleteSkill(idx);
      setProfile((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
      showToast('success', 'Skill removed');
    } catch (err) {
      showToast('error', err.message || 'Failed to remove skill');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  const fullName = profile?.personalInfo?.fullName || user?.fullName || user?.email;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Toast toast={toast} />

      {/* Profile header */}
      <div className="card mb-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-2xl flex items-center justify-center flex-shrink-0">
              {fullName?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{fullName}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              {profile?.summary && (
                <p className="text-gray-600 text-sm mt-1 max-w-md">{profile.summary}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => { setEditing(!editing); }}
            className={editing ? 'btn-ghost' : 'btn-outline'}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-4 border-t border-gray-100 pt-5">
            <div>
              <label className="form-label">Bio / Summary</label>
              <textarea
                name="bio"
                className="form-input"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Phone</label>
                <input type="tel" name="phone" className="form-input"
                  value={formData.phone} onChange={handleChange} placeholder="+84..." />
              </div>
              <div>
                <label className="form-label">Location</label>
                <input type="text" name="location" className="form-input"
                  value={formData.location} onChange={handleChange} placeholder="City, Country" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
              Make profile visible to recruiters
            </label>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
                ) : 'Save Changes'}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm border-t border-gray-100 pt-4">
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Phone</p>
              <p className="font-medium">{profile?.personalInfo?.phone || '—'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Location</p>
              <p className="font-medium">{profile?.personalInfo?.location || '—'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Visibility</p>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${profile?.isPublic ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                {profile?.isPublic ? '● Public' : '● Private'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Experience</h2>
          <button
            onClick={() => setShowExpForm(!showExpForm)}
            className={showExpForm ? 'btn-ghost' : 'btn-outline text-sm'}
          >
            {showExpForm ? 'Cancel' : '+ Add'}
          </button>
        </div>

        {showExpForm && (
          <form onSubmit={handleAddExperience} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Role *</label>
                <input type="text" name="role" className="form-input"
                  value={expForm.role} onChange={handleExpChange}
                  placeholder="e.g. Software Engineer" required />
              </div>
              <div>
                <label className="form-label">Company *</label>
                <input type="text" name="company" className="form-input"
                  value={expForm.company} onChange={handleExpChange}
                  placeholder="e.g. Acme Corp" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Start Date *</label>
                <input type="date" name="startDate" className="form-input"
                  value={expForm.startDate} onChange={handleExpChange} required />
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input type="date" name="endDate" className="form-input"
                  value={expForm.endDate} onChange={handleExpChange}
                  disabled={expForm.isCurrent} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="isCurrent" id="isCurrent"
                checked={expForm.isCurrent} onChange={handleExpChange} />
              I currently work here
            </label>
            <div>
              <label className="form-label">Description</label>
              <textarea name="description" className="form-input" rows="2"
                value={expForm.description} onChange={handleExpChange}
                placeholder="Describe your responsibilities" />
            </div>
            <div>
              <label className="form-label">Key Achievements</label>
              <textarea name="achievements" className="form-input" rows="2"
                value={expForm.achievements} onChange={handleExpChange}
                placeholder="Notable achievements in this role" />
            </div>
            <button type="submit" className="btn-primary" disabled={expLoading}>
              {expLoading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
              ) : 'Add Experience'}
            </button>
          </form>
        )}

        {profile?.experience?.length > 0 ? (
          <div className="space-y-4">
            {profile.experience.map((exp) => (
              <div key={exp._id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {exp.company?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-500 text-sm">{exp.company}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString('vi-VN') : '?'} –{' '}
                    {exp.isCurrent || !exp.endDate ? 'Present' : new Date(exp.endDate).toLocaleDateString('vi-VN')}
                  </p>
                  {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                  {exp.achievements && (
                    <p className="text-xs text-gray-500 mt-1">{Array.isArray(exp.achievements) ? exp.achievements.join(', ') : exp.achievements}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteExperience(exp._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg"
                  title="Remove"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No experience added yet. Click "+ Add" to get started.
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Skills</h2>
          <button
            onClick={() => setShowSkillForm(!showSkillForm)}
            className={showSkillForm ? 'btn-ghost' : 'btn-outline text-sm'}
          >
            {showSkillForm ? 'Cancel' : '+ Add'}
          </button>
        </div>

        {showSkillForm && (
          <form onSubmit={handleAddSkill} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Skill Name *</label>
                <input type="text" name="name" className="form-input"
                  value={skillForm.name} onChange={handleSkillChange}
                  placeholder="e.g. JavaScript" required />
              </div>
              <div>
                <label className="form-label">Level</label>
                <select name="level" className="form-input"
                  value={skillForm.level} onChange={handleSkillChange}>
                  <option value="">Select level</option>
                  {SKILL_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl.charAt(0).toUpperCase() + lvl.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Years of Exp.</label>
                <input type="number" name="yearsOfExp" className="form-input"
                  value={skillForm.yearsOfExp} onChange={handleSkillChange}
                  placeholder="e.g. 3" min="0" />
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={skillLoading}>
              {skillLoading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
              ) : 'Add Skill'}
            </button>
          </form>
        )}

        {profile?.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <div key={idx} className="group flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-blue-50 border border-blue-100 rounded-full">
                <span className="text-sm font-medium text-blue-700">{skill.name}</span>
                {skill.level && (
                  <span className="text-xs text-blue-400">· {skill.level}</span>
                )}
                {skill.yearsOfExp > 0 && (
                  <span className="text-xs text-blue-400">({skill.yearsOfExp}y)</span>
                )}
                <button
                  onClick={() => handleDeleteSkill(idx)}
                  className="w-4 h-4 flex items-center justify-center rounded-full text-blue-300 hover:text-white hover:bg-danger transition-colors ml-0.5"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No skills added yet. Click "+ Add" to get started.
          </div>
        )}
      </div>
    </div>
  );
}

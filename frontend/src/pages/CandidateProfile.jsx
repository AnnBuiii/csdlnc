import { useEffect, useState } from 'react';
import { candidateAPI } from '../services/api';
import authStore from '../store/authStore';

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
      setProfile(formData);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update profile');
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
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        {profile?.experience && profile.experience.length > 0 ? (
          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="p-4 border-l-4 border-primary">
                <h3 className="font-bold">{exp.role}</h3>
                <p className="text-muted">{exp.company}</p>
                <p className="text-sm text-muted">
                  {new Date(exp.startDate).toLocaleDateString()} -
                  {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
                {exp.description && <p className="mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No experience added yet</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        {profile?.skills && profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <span key={idx} className="badge-primary">
                {skill.name}
                {skill.level && <span className="ml-2">({skill.level})</span>}
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

import { useState } from 'react';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    skills: '',
    location: '',
    experience: '',
    page: 1,
    limit: 20,
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Fetch candidates with search parameters
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Candidates</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="form-label">Keyword</label>
            <input
              type="text"
              name="keyword"
              className="form-input"
              placeholder="Skills, role..."
              value={searchParams.keyword}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Skills</label>
            <input
              type="text"
              name="skills"
              className="form-input"
              placeholder="e.g., React, Node.js"
              value={searchParams.skills}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="City, country"
              value={searchParams.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Experience</label>
            <select
              name="experience"
              className="form-input"
              value={searchParams.experience}
              onChange={handleInputChange}
            >
              <option value="">Any</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      {/* Candidates Grid */}
      {candidates.length === 0 ? (
        <div className="text-center py-12 card">
          <p className="text-muted text-lg">No candidates found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="card">
              <h3 className="text-xl font-bold mb-2">{candidate.name}</h3>
              <p className="text-muted mb-3">{candidate.headline}</p>

              <div className="mb-4 space-y-2">
                <p className="text-sm">📍 {candidate.location}</p>
                <p className="text-sm">📧 {candidate.email}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills?.map((skill, idx) => (
                    <span key={idx} className="badge-primary text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full btn-primary">View Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

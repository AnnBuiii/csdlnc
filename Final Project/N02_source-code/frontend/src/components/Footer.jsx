export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">🚀 Recruitment</h3>
            <p className="text-muted">Smart Recruitment System - Find your dream job</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2 text-muted hover:text-white cursor-pointer">
              <li>Browse Jobs</li>
              <li>My Applications</li>
              <li>My Profile</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2 text-muted hover:text-white cursor-pointer">
              <li>Post a Job</li>
              <li>Find Candidates</li>
              <li>Company Profile</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-muted hover:text-white cursor-pointer">
              <li>Blog</li>
              <li>Contact</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-600" />
        <p className="text-center text-muted">
          © 2024 Smart Recruitment System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

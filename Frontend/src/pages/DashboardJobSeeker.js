import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import ProtectedRoute from '../components/ProtectedRoute';
import './styles/DashboardJobSeeker.css';

const DashboardJobSeeker = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser]= useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, jobsRes, appsRes] = await Promise.all([
          api.get('/auth/me'),
          api.get('/jobs'),
          api.get('/applications/me')
        ]);
        setUser(userRes.data);
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const applyToJob = async (jobId) => {
    try {
      await api.post(`/jobs/${jobId}/apply`);
      alert('Application submitted!');
    } catch (err) {
      alert(err.response?.data?.message || 'Application failed');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  }

  return (
    <ProtectedRoute roles={['job_seeker']}>
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Welcome,{user?.name}</h1>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong>{user?.role}</p>
            {user?.role === 'job_seeker' && (
              <>
                <p><strong>Skills:</strong> {user.skills?.join(', ') || 'N/A'}</p>
                <p><strong>Education:</strong></p>
                <ul>
                  {user.profile?.education?.map((edu, index) => (
                    <li key={index}>{edu.degree} from {edu.institution} ({edu.year})</li>
                  ))}
                </ul>
                <p><strong>Experience:</strong></p>
                <ul>
                  {user.profile?.experience?.map((exp, index) => (
                    <li key={index}>{exp.title} at {exp.company} ({exp.duration}) - {exp.description}</li>
                  ))}
                </ul>
               </>
            )} 
          </div>
          <button className="edit-btn" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        </div>'
        
        <section className="job-listings">
          <h2>Available Jobs</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {jobs.map(job => (
                <li key={job._id}>
                  <h3>{job.title}</h3>
                  <p>{job.company} • {job.location}</p>
                  <button onClick={() => applyToJob(job._id)}>
                    Apply
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="my-applications">
          <h2>My Applications</h2>
          {applications.length === 0 ? (
            <p>No applications yet</p>
          ) : (
            <ul>
              {applications.map(app => (
                <li key={app._id}>
                  <h3>{app.job?.title}</h3>
                  <p><strong>Company:</strong> {app.job?.company}</p>
                  <p><strong>Location:</strong> {app.job?.location}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                  <p>
                    <strong>Resume:</strong>{' '}
                    <a
                      href={`http://localhost:5000/uploads/${app.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </p>
                  <p>
                    <strong>Cover Letter:</strong>{' '}
                    <a
                      href={`http://localhost:5000/uploads/${app.coverLetter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Cover Letter
                    </a>
                  </p>
                  {app.notes && app.notes.length > 0 && (
                    <div>
                      <strong>Recruiter Notes:</strong>
                      <ul>
                        {app.notes.map((note, idx) => (
                          <li key={idx}>
                            {note.content} ({new Date(note.createdAt).toLocaleDateString()})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="logout">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardJobSeeker;
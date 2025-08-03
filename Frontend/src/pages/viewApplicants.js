import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './styles/ViewApplicants.css';

const ViewApplicants = () => {
  const { id } = useParams(); // job ID from URL
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await api.get(`/jobs/${id}/applications`);
        setApplicants(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch applicants');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  if (loading) return <div>Loading applicants...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="applicants-page">
      <h2>Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div className="applicants-list">
          {applicants.map((app) => (
            <div key={app._id} className="applicant-card">
              <h3>{app.applicant.name}</h3>
              <p><strong>Email:</strong> {app.applicant.email}</p>
              <p><strong>Education:</strong> {app.applicant.education}</p>
              <p><strong>Experience:</strong> {app.applicant.experience}</p>
              <p><strong>Skills:</strong> {app.applicant.skills}</p>

              <div className="documents">
                <a 
                  href={`http://localhost:5000/uploads/${app.resume}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
                <a 
                  href={`http://localhost:5000/uploads/${app.coverLetter}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Cover Letter
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;

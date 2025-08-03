import React, {useState, useEffect} from "react";
import api from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './EditProfileForm.css';

const EditProfileForm = ({ onclose, onSave}) => {
    const [userData, setUserData] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userRole = user?.role;


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                setUserData(response.data);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                setError('Failed to load user data');
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            profile: {
                ...prevData.profile,
                [name]: value
            }
        }));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMessage('');
        try {
            const response = await api.put('/auth/update-password', {
                currentPassword,
                newPassword
            });
            setPasswordMessage(response.data.message || 'Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            setPasswordMessage(
                err.response?.data?.message || 'Error updating password'
            );
        }
    };


    const handleClose = () => {
        if (userRole === 'recruiter') {
            navigate('/recruiter/dashboard');
        } else if (userRole === 'job_seeker') {
            navigate('/job_seeker/dashboard');
        } else {
            navigate('/');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        // Create cleaned data object
        const updatePayload = {
            name: userData.name,
            email: userData.email,
        };

        if (userData.role === 'recruiter') {
            updatePayload.company = userData.company;
        }
        if (userData.role === 'job_seeker') {
             updatePayload.skills = Array.isArray(userData.skills)
                ? userData.skills
                : userData.skills.split(',').map(s => s.trim());
            updatePayload.profile = {
                bio: userData.profile?.bio || '',
                experience: Array.isArray(userData.profile?.experience)
                    ? userData.profile.experience
                    : [], // Optional: parse if needed
                education: Array.isArray(userData.profile?.education)
                    ? userData.profile.education
                    : []
            };
        }

        try {
            const response = await api.put('/auth/update-profile', updatePayload);
            alert('Profile updated successfully!');

            // Update session storage user info
            const updatedUser = { ...user, name: userData.name, email: userData.email };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));

            if (onSave) onSave(response.data);
            if (onclose) onclose();
            else handleClose();

        } catch (err) {
            console.error('Failed to update profile:', err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to update profile');
            }
        } finally {
            setSaving(false);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    };
    return (
        <form onSubmit={handleSubmit} className="edit-profile-form">
            <h3>Edit Profile</h3>
            {error && <div className="error-message">{error}</div>}

            <label>Name:</label>
            <input name="name" value={userData.name} onChange={handleChange} required />
            
            <label>Email:</label>
            <input name="email" type="email" value={userData.email} onChange={handleChange} required />
            
            { userData.role === 'recruiter' && (
                <>
                    <label>Company:</label>
                    <input name="company" value={userData.company || ''} onChange={handleChange} />
                </>
            )}

            { userData.role === 'job_seeker' && (
                <>
                    <label>Skills (comma separated):</label>
                    <input
                        name="skills"
                        value={Array.isArray(userData.skills) ? userData.skills.join(', ') : userData.skills || ''}
                        onChange={handleChange}
                    />

                    <label>Bio</label>
                    <textarea name="bio" value={userData.profile?.bio || ''} onChange={handleProfileChange} />

                    <label>Experience (one per line)</label>
                    <textarea
                        name="experience"
                        value={
                            Array.isArray(userData.profile?.experience)
                                ? userData.profile.experience.join('\n')
                                : userData.profile?.experience || ''
                        }
                        onChange={handleProfileChange}
                    />

                    <label>Education (one per line)</label>
                    <textarea
                        name="education"
                        value={
                            Array.isArray(userData.profile?.education)
                                ? userData.profile.education.join('\n')
                                : userData.profile?.education || ''
                        }
                        onChange={handleProfileChange}
                    />
                </>
            )}

            <hr />
            <h4>Reset Password</h4>

            {passwordMessage && <div className="info-message">{passwordMessage}</div>}

            <label>Current Password:</label>
            <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
            />

            <label>New Password:</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
            />

            <button
                type="button"
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword}
                className="password-reset-btn"
            >
                Update Password
            </button>


            <div className="form-actions">
                <button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={handleClose} className="cancel-btn">Cancel</button>
            </div>
        </form>
    );
};

export default EditProfileForm;    
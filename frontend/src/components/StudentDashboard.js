import React, { useState } from 'react';
import '../Dashboard.css';

const StudentDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    college: '',
    password: '',
  });

  const mockEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-12-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      description: 'Annual technology conference featuring industry experts.',
    },
    {
      id: 2,
      title: 'Cultural Fest',
      date: '2024-12-20',
      time: '2:00 PM',
      location: 'Campus Ground',
      description: 'Celebrate diversity with music, dance, and food stalls.',
    },
    {
      id: 3,
      title: 'Career Fair',
      date: '2024-12-25',
      time: '9:00 AM',
      location: 'Convention Center',
      description: 'Meet recruiters from top companies and explore job opportunities.',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleProfileChange = e => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = e => {
    e.preventDefault();
    // TODO: Implement profile update logic
    alert('Profile updated! (Feature to be implemented)');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'events':
        return (
          <div className="dashboard-content">
            <div style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
              <h3 style={{ textAlign: 'center', color: '#333', fontSize: '28px', marginBottom: '10px' }}>Upcoming Events</h3>
              <button className="logout-button" onClick={() => setCurrentView('overview')} style={{ display: 'block', margin: '0 auto' }}>Back to Dashboard</button>
            </div>
            {mockEvents.map(event => (
              <div key={event.id} className="dashboard-card">
                <div className="card-icon">📅</div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description" style={{ fontSize: '14px', marginBottom: '10px' }}>
                  <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}<br />
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="card-description">{event.description}</p>
                <button className="auth-button" style={{ marginTop: '15px', padding: '10px 20px', fontSize: '14px' }}>Register</button>
              </div>
            ))}
          </div>
        );
      case 'register':
        return (
          <div className="dashboard-content">
            <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
              <h3 className="card-title">Register for Events</h3>
              <p className="card-description">Browse and register for upcoming events. (Feature to be implemented)</p>
              <button className="logout-button" onClick={() => setCurrentView('overview')} style={{ marginTop: '20px' }}>Back to Dashboard</button>
            </div>
          </div>
        );
      case 'registrations':
        return (
          <div className="dashboard-content">
            <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
              <h3 className="card-title">My Registrations</h3>
              <p className="card-description">View and manage your event registrations. (Feature to be implemented)</p>
              <button className="logout-button" onClick={() => setCurrentView('overview')} style={{ marginTop: '20px' }}>Back to Dashboard</button>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="dashboard-content">
            <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
              <h3 className="card-title">Profile Settings</h3>
              <form onSubmit={handleProfileSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    placeholder="Name"
                    className="auth-input"
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    placeholder="Email"
                    className="auth-input"
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    name="college"
                    value={profileData.college}
                    onChange={handleProfileChange}
                    placeholder="College"
                    className="auth-input"
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleProfileChange}
                    placeholder="New Password (leave blank to keep current)"
                    className="auth-input"
                  />
                </div>
                <button type="submit" className="auth-button" style={{ marginRight: '10px' }}>Update Profile</button>
                <button type="button" className="logout-button" onClick={() => setCurrentView('overview')}>Back to Dashboard</button>
              </form>
            </div>
          </div>
        );
      default:
        return (
          <div className="dashboard-content">
            <div className="dashboard-card" onClick={() => setCurrentView('events')}>
              <div className="card-icon">📅</div>
              <h3 className="card-title">View Upcoming Events</h3>
              <p className="card-description">Browse and discover exciting events happening on campus.</p>
            </div>
            <div className="dashboard-card" onClick={() => setCurrentView('register')}>
              <div className="card-icon">✍️</div>
              <h3 className="card-title">Register for Events</h3>
              <p className="card-description">Sign up for events that interest you and expand your horizons.</p>
            </div>
            <div className="dashboard-card" onClick={() => setCurrentView('registrations')}>
              <div className="card-icon">📋</div>
              <h3 className="card-title">View My Registrations</h3>
              <p className="card-description">Check your registered events and manage your participation.</p>
            </div>
            <div className="dashboard-card" onClick={() => setCurrentView('profile')}>
              <div className="card-icon">⚙️</div>
              <h3 className="card-title">Profile Settings</h3>
              <p className="card-description">Update your profile information and preferences.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-logout">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to CampusEventHub, Student!</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default StudentDashboard;
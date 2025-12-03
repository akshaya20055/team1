import React, { useState } from 'react';
import '../Dashboard.css';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleEventChange = e => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleEventSubmit = e => {
    e.preventDefault();
    alert('Event created! (Feature to be implemented)');
    setEventData({ title: '', date: '', time: '', location: '', description: '' });
  };

  const handleProfileChange = e => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = e => {
    e.preventDefault();
    alert('Profile updated! (Feature to be implemented)');
  };

  const mockEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-12-15',
      registrations: 45,
    },
    {
      id: 2,
      title: 'Cultural Fest',
      date: '2024-12-20',
      registrations: 120,
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'create-event':
        return (
          <div className="dashboard-content">
            <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
              <h3 className="card-title">Create New Event</h3>
              <form onSubmit={handleEventSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleEventChange}
                    placeholder="Event Title"
                    className="auth-input"
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleEventChange}
                    className="auth-input"
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="time"
                    name="time"
                    value={eventData.time}
                    onChange={handleEventChange}
                    className="auth-input"
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleEventChange}
                    placeholder="Location"
                    className="auth-input"
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleEventChange}
                    placeholder="Event Description"
                    className="auth-input"
                    rows="4"
                    required
                  />
                </div>
                <button type="submit" className="auth-button" style={{ marginRight: '10px' }}>Create Event</button>
                <button type="button" className="logout-button" onClick={() => setCurrentView('overview')}>Back to Dashboard</button>
              </form>
            </div>
          </div>
        );
      case 'manage-events':
        return (
          <div className="dashboard-content">
            <div style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
              <h3 style={{ textAlign: 'center', color: '#333', fontSize: '28px', marginBottom: '10px' }}>Manage Events</h3>
              <button className="logout-button" onClick={() => setCurrentView('overview')} style={{ display: 'block', margin: '0 auto' }}>Back to Dashboard</button>
            </div>
            {mockEvents.map(event => (
              <div key={event.id} className="dashboard-card">
                <div className="card-icon">📅</div>
                <h3 className="card-title">{event.title}</h3>
                <p className="card-description">Date: {event.date}</p>
                <p className="card-description">Registrations: {event.registrations}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button className="auth-button" style={{ padding: '8px 15px', fontSize: '12px' }}>Edit</button>
                  <button className="logout-button" style={{ padding: '8px 15px', fontSize: '12px' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'view-registrations':
        return (
          <div className="dashboard-content">
            <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
              <h3 className="card-title">View Registrations</h3>
              <p className="card-description">View and manage event registrations. (Feature to be implemented)</p>
              <button className="logout-button" onClick={() => setCurrentView('overview')} style={{ marginTop: '20px' }}>Back to Dashboard</button>
            </div>
          </div>
        );
      case 'manage-users':
        return (
          <div className="dashboard-content">
            <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
              <h3 className="card-title">Manage Users</h3>
              <p className="card-description">Manage student and admin accounts. (Feature to be implemented)</p>
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
            <div className="dashboard-card" onClick={() => setCurrentView('create-event')}>
              <div className="card-icon">➕</div>
              <h3 className="card-title">Create New Event</h3>
              <p className="card-description">Add new events to the system.</p>
            </div>
            <div className="dashboard-card" onClick={() => setCurrentView('manage-events')}>
              <div className="card-icon">⚙️</div>
              <h3 className="card-title">Manage Events</h3>
              <p className="card-description">Edit or delete existing events.</p>
            </div>
            <div className="dashboard-card" onClick={() => setCurrentView('view-registrations')}>
              <div className="card-icon">📋</div>
              <h3 className="card-title">View Registrations</h3>
              <p className="card-description">Check event registration details.</p>
            </div>
            <div className="dashboard-card" onClick={() => setCurrentView('manage-users')}>
              <div className="card-icon">👥</div>
              <h3 className="card-title">Manage Users</h3>
              <p className="card-description">Manage student and admin accounts.</p>
            </div>
            <div className="dashboard-card" onClick={() => setCurrentView('profile')}>
              <div className="card-icon">🔧</div>
              <h3 className="card-title">Profile Settings</h3>
              <p className="card-description">Update your profile information.</p>
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
        <h1 className="dashboard-title">College Admin Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to CampusEventHub, Admin!</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
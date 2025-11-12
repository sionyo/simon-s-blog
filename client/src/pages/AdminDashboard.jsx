import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <h1 className="header-title">Blog Admin</h1>
          <div className="header-user">
            <span className="user-email">Welcome, {admin?.email}</span>
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <h2 className="welcome-title">
              Welcome to Your Blog Dashboard
            </h2>
            <p className="welcome-subtitle">
              Manage your blog posts, categories, and settings from here.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">Posts</h3>
              <p className="feature-description">Create and manage blog posts</p>
              <button className="feature-button">
                Manage Posts
              </button>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">Categories</h3>
              <p className="feature-description">Organize your content</p>
              <button className="feature-button">
                Manage Categories
              </button>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">Settings</h3>
              <p className="feature-description">Configure your blog</p>
              <button className="feature-button">
                Blog Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
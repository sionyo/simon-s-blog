import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Pun Intended
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
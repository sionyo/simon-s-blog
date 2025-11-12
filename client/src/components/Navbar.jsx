import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Simon's void
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
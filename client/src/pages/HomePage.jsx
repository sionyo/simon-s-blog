import { Link } from "react-router-dom";

const HomePage = () => {
    return ( 
    <div className='home-container'>
      <div className="home-content">
        <h1 className="home-title">Hi, I'm Simon</h1>
        <p className="home-subtitle">
          Welcome to my blog! I write about technology, development, and other interesting topics.
        </p>
        <div className="home-links">
          <a href="#" className="home-link blog-link">
            View Blog Posts
          </a>
        </div>
      </div>
    </div>
     );
}
 
export default HomePage;
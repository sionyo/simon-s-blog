import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      <div className="about-container">
        <div className="about-header">
          <h1>About This Mess</h1>
          <p>Yes, I built another blog.</p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>What's This Then?</h2>
            <p>
              I make things work (most of the time) and occasionally write about it when I'm bored.
            </p>
          </div>

          <div className="about-section">
            <h2>My Tech Stack</h2>
            <p>
              I used Mongodb, react, nodejs and express because I'm basic. MongoDB stores my shtuff, 
              Express handles my shtuff, React renders my questionable posts, 
              and Node.js powers my caffeine-fueled coding sessions.
            </p>
          </div>

          <div className="about-section">
            <h2>Why This Exists</h2>
            <p>
              Mostly to prove I can deploy something without breaking everything. 
            </p>
          </div>

          <div className="about-section">
            <h2>What You'll Find Here</h2>
            <p>
              Code that works, thoughts that rarely make sense, 
              and the occasional rant about why semicolons are overrated.
              Basically, the digital equivalent of my junk drawer.
            </p>
          </div>

          <div className="about-disclaimer">
            <p>
              <strong>Disclaimer:</strong> I write whatever i want.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
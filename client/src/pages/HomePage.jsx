import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      
      <div className="posts-container">
        <div className="posts-header">
          <h1>Digital Ephemera</h1>
          <p>Fleeting thoughts in the void</p>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <article key={post._id} className="post-card">
                <div className="post-meta">
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                
                <h2 className="post-title">{post.title}</h2>
                
                {post.excerpt && (
                  <p className="post-excerpt">{post.excerpt}</p>
                )}
                
                <div className="post-content">
                  {post.content}
                </div>
              </article>
            ))}
            
            {posts.length === 0 && (
              <div className="no-posts">
                <p>The void is empty... for now.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
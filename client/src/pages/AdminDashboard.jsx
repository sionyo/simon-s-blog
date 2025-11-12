import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    status: 'draft'
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await api.post('/posts', {
        ...formData,
        tags: tagsArray
      });
      
      setFormData({ title: '', content: '', tags: '', status: 'draft' });
      setShowCreateForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await api.put(`/posts/${editingPost._id}`, {
        ...formData,
        tags: tagsArray
      });
      
      setEditingPost(null);
      setFormData({ title: '', content: '', tags: '', status: 'draft' });
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Delete this post?')) {
      try {
        await api.delete(`/posts/${postId}`);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      tags: post.tags.join(', '),
      status: post.status
    });
  };

  return (
    <div className="admin-page">
      <Navbar />
      
      <div className="admin-container">
        <div className="admin-header">
          <h1>Blog Admin</h1>
          <div className="admin-actions">
            <button 
              onClick={() => setShowCreateForm(true)}
              className="btn-primary"
            >
              Create Post
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {(showCreateForm || editingPost) && (
          <div className="post-form-overlay">
            <div className="post-form">
              <h2>{editingPost ? 'Edit Post' : 'Create Post'}</h2>
              
              <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    placeholder="Content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows="10"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingPost ? 'Update' : 'Create'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingPost(null);
                      setFormData({ title: '', content: '', tags: '', status: 'draft' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="posts-list">
          <h2>Posts ({posts.length})</h2>
          
          {posts.map(post => (
            <div key={post._id} className="post-item">
              <div className="post-info">
                <h3>{post.title}</h3>
                <p className="post-meta">
                  {new Date(post.createdAt).toLocaleDateString()} • 
                  <span className={`status ${post.status}`}>{post.status}</span>
                </p>
                {post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="post-actions">
                <button onClick={() => startEdit(post)} className="btn-edit">
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePost(post._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          {posts.length === 0 && (
            <div className="no-posts">
              <p>No posts yet. Create your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
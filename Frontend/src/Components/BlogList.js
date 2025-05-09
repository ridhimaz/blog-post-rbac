import React, { useEffect, useState } from 'react';
import API from '../Services/api';
import { useNavigate } from 'react-router-dom';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blog');
      setBlogs(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Unauthorized. Please log in.');
        navigate('/login');
      } else {
        console.error('Error fetching blogs:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to view blogs.');
      navigate('/login');
      return;
    }
    fetchBlogs();
  }, [navigate]);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <small>
              By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;

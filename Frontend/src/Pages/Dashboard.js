import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Services/api';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blog');
      setBlogs(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Unauthorized, please log in');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Login required');
      navigate('/login');
      return;
    }
    fetchBlogs();
  }, [navigate]);

  // Create new blog
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/blog/create', form);
      alert('Blog created');
      setForm({ title: '', content: '' });
      fetchBlogs(); // Refresh list
    } catch (err) {
        const errorMsg = err.response?.data?.error || 'Failed to create blog';
        alert(errorMsg);
        // console.error(err);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await API.delete(`/blog/delete/${id}`);
      alert('Blog deleted');
      fetchBlogs();
    } catch (err) {
        const errorMsg = err.response?.data?.error || 'Failed to create blog';
        alert(errorMsg);
        // console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>

      <form onSubmit={handleCreate} style={{ marginBottom: '30px' }}>
        <h3>Create Blog</h3>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          required
        />
        <br />
        <button type="submit">Create</button>
      </form>

      <h3>All Blogs</h3>
      {blogs.map(blog => (
        <div key={blog._id} style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
          <h4>{blog.title}</h4>
          <p>{blog.content}</p>
          <br />
          <button onClick={() => handleDelete(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;

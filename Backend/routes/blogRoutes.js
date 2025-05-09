const router = require('express').Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { createBlog, getBlogs, deleteBlog } = require('../controllers/blogController');

router.get('/', auth, role, getBlogs, (req, res) => {
    res.json({ message: 'Access granted!' })}
);
router.post('/create', auth, role, createBlog);
router.delete('/delete/:id', auth, role,  deleteBlog);

module.exports = router;

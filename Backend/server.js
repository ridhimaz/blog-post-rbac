require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
    res.status(200).json({"health": "fine"})
})
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.listen(8080, () => console.log('Server running on port 8080'));

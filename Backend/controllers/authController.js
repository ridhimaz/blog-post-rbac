const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    console.log("signup : user exists")
    return res.status(400).json({ message: 'User exists' });
  }
  const user = await User.create({ name, email, password });
  console.log("user created", user)
  res.json({
    token: generateToken(user), id: user._id,
    name: user.name,
    email: user.email,
    roleId: user.role_id
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  res.json({
    token: generateToken(user), id: user._id,
    name: user.name,
    email: user.email,
    roleId: user.role_id
  });
};

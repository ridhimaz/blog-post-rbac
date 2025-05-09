const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_name : String,
});

module.exports = mongoose.model('Role', roleSchema);
const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  module_name : String,
  module_key : String 
});

module.exports = mongoose.model('Module', moduleSchema);
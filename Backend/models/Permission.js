const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  role_id :{  type: mongoose.Schema.Types.ObjectId },
  module_id : {  type: mongoose.Schema.Types.ObjectId,
    ref: 'Module', },
  permission : String
});

module.exports = mongoose.model('Permission', permissionSchema);
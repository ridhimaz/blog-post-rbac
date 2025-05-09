const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: () => new mongoose.Types.ObjectId(process.env.USER_ROLE_ID)
  }
});

userSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);

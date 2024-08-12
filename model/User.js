const mongoose = require('mongoose');
const { Schema } = mongoose;
const userScema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true },
  password: { type: Buffer, required: true },
  salt: Buffer,
});
const virtual = userScema.virtual('id');
virtual.get(function () {
  return this._id;
});
userScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.User = mongoose.model('User', userScema);

const mongoose = require('mongoose');
const { Schema } = mongoose;
const locationScema = new Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  checked: { type: Boolean, required: true },
});
const virtual = locationScema.virtual('id');
virtual.get(function () {
  return this._id;
});
locationScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Location = mongoose.model('Location', locationScema);

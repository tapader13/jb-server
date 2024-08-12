const mongoose = require('mongoose');
const { Schema } = mongoose;
const contactScema = new Schema({
  email: { type: String, required: true },
  text: { type: String, required: true },
});
const virtual = contactScema.virtual('id');
virtual.get(function () {
  return this._id;
});
contactScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Contact = mongoose.model('Contact', contactScema);

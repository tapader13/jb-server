const mongoose = require('mongoose');
const { Schema } = mongoose;
const WorkExperienceScema = new Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  checked: { type: Boolean, required: true },
});
const virtual = WorkExperienceScema.virtual('id');
virtual.get(function () {
  return this._id;
});
WorkExperienceScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.WorkExperience = mongoose.model('WorkExperience', WorkExperienceScema);

const mongoose = require('mongoose');
const { Schema } = mongoose;
const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userid: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary_from: { type: Number, required: true },
  salary_to: { type: Number, required: true },
  employment_type: { type: String, required: true },
  application_deadline: { type: String, required: true },
  Workexperience: { type: String, required: true },
  contact: { type: String, required: true },
  job_category: { type: String, required: true },
  is_remote_work: { type: Number, required: true },
  number_of_opening: { type: Number, required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String },
});
const virtual = jobSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
jobSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Job = mongoose.model('Job', jobSchema);

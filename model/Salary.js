const mongoose = require('mongoose');
const { Schema } = mongoose;
const salaryScema = new Schema({
  value: { type: Number, required: true },
  label: { type: String, required: true },
  checked: { type: Boolean, required: true },
});
const virtual = salaryScema.virtual('id');
virtual.get(function () {
  return this._id;
});
salaryScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Salary = mongoose.model('Salary', salaryScema);

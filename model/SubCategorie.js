const mongoose = require('mongoose');
const { Schema } = mongoose;
const SubCategorieScema = new Schema({
  name: { type: String, required: true },
  href: { type: String, required: true },
});
const virtual = SubCategorieScema.virtual('id');
virtual.get(function () {
  return this._id;
});
SubCategorieScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.SubCategorie = mongoose.model('SubCategorie', SubCategorieScema);

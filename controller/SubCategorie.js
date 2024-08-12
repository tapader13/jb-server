const { SubCategorie } = require('../model/SubCategorie');

exports.createSubCategorie = async (req, res) => {
  const contact = new SubCategorie(req.body);
  try {
    const response = await contact.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.fetchSubCategorie = async (req, res) => {
  try {
    const subcategories = await SubCategorie.find({});
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(401).json(error);
  }
};

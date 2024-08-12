const { Contact } = require('../model/Contact');

exports.createContact = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const response = await contact.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

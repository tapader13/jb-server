const { Location } = require('../model/Location');

exports.createLocation = async (req, res) => {
  const location = new Location(req.body);
  try {
    const response = await location.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.fetchLocation = async (req, res) => {
  try {
    const location = await Location.find({});
    res.status(200).json(location);
  } catch (error) {
    res.status(401).json(error);
  }
};

const { WorkExperience } = require('../model/WorkExperience');

exports.createWorkExp = async (req, res) => {
  const workExp = new WorkExperience(req.body);
  try {
    const response = await workExp.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.fetchWorkExp = async (req, res) => {
  try {
    const workExp = await WorkExperience.find({});
    res.status(200).json(workExp);
  } catch (error) {
    res.status(401).json(error);
  }
};

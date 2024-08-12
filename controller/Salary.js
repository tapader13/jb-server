const { Salary } = require('../model/Salary');

exports.createSalary = async (req, res) => {
  const salary = new Salary(req.body);
  try {
    const response = await salary.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.fetchSalary = async (req, res) => {
  try {
    const salary = await Salary.find({});
    res.status(200).json(salary);
  } catch (error) {
    res.status(401).json(error);
  }
};

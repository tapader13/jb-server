const { Job } = require('../model/Job');

exports.createJobs = async (req, res) => {
  const jobs = new Job({ ...req.body, userid: req.user.id });
  console.log(req.user, 'fetch jobs');
  try {
    const response = await jobs.save();
    console.log(response, 'done');
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.fetchJobs = async (req, res) => {
  let qry = Job.find({});
  let qryDemo = Job.find({});
  // console.log(req.user, 'fetch jobs func');
  if (req.query.title) {
    const titleRegex = new RegExp(req.query.title, 'i');
    qry = qry.find({ title: titleRegex });
    qryDemo = qryDemo.find({ title: titleRegex });
  }
  if (req.query.employment_type && req.query.employment_type !== 'All Jobs') {
    qry = qry.find({ employment_type: req.query.employment_type });
    qryDemo = qryDemo.find({ employment_type: req.query.employment_type });
  }
  if (req.query.location && req.query.location !== 'Any Where') {
    qry = qry.find({ location: req.query.location });
    qryDemo = qryDemo.find({ location: req.query.location });
  }
  if (req.query.salary_from) {
    qry = qry.find({ salary_from: { $lte: req.query.salary_from } });
    qryDemo = qryDemo.find({ salary_from: { $lte: req.query.salary_from } });
  }
  if (
    req.query.Workexperience &&
    req.query.Workexperience !== 'Any experience'
  ) {
    qry = qry.find({ Workexperience: req.query.Workexperience });
    qryDemo = qryDemo.find({
      Workexperience: req.query.Workexperience,
    });
  }

  // Count operation before pagination modification
  let tot = await qryDemo.countDocuments().exec();
  console.log(tot, 'tot in jobs');

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    qry = qry.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    res.set('total', tot);
    const response = await qry.exec();
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.fetchJoblistingByUser = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id, req.user, 'joblisting');
    const location = await Job.find({ userid: id });
    console.log(req.user, 'job user');
    res.status(200).json(location);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.fetchJobDltsById = async (req, res) => {
  try {
    const location = await Job.find({ _id: req.params.id });
    console.log(req.params.id, location);
    res.status(200).json(location);
  } catch (error) {
    res.status(401).json(error);
  }
};

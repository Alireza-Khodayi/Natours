const User = require('../models/userModel');
const catchAsync = require('../utils/catch-async-error');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  //Send Response
  res.status(200).json({
    status: 'Success',
    results: users.length,
    data: { users },
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet  defined!',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet  defined!',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet  defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet  defined!',
  });
};

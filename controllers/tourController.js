const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //Build Query
    // 1)Filtering
    const queryObj = { ...req.query };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 2) Advaced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (matchedStr) => `$${matchedStr}`,
    );
    const query = await Tour.find(JSON.parse(queryStr));
    //Execute Query
    const tours = await query;
    //Send Response
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Failed!',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Failed!',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: { tour: newTour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed!',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed!',
      message: 'Invalid Data Sent!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'Failed!',
      message: error,
    });
  }
};

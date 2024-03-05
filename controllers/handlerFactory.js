const APIFeatures = require('../utils/api-features');
const AppError = require('../utils/app-error');
const catchAsyncError = require('../utils/catch-async-error');

exports.getOne = (Model, populateOptions) =>
  catchAsyncError(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const document = await query;

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        data: document,
      },
    });
  });

exports.getAll = Model =>
  catchAsyncError(async (req, res, next) => {
    //To Allow for nested GET reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    //Execute Query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const documents = await features.query;

    //Send Response
    res.status(200).json({
      status: 'Success',
      results: documents.length,
      data: {
        data: documents,
      },
    });
  });

exports.createOne = Model =>
  catchAsyncError(async (req, res, next) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        data: newDocument,
      },
    });
  });

exports.updateOne = Model =>
  catchAsyncError(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        data: document,
      },
    });
  });

exports.deleteOne = Model =>
  catchAsyncError(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'Success',
      data: null,
    });
  });

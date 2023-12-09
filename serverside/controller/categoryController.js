const Category = require('../models/categoryModel');
const { resetPassword } = require('./authController');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({ category: req.body });

    res.status(200).json({
      status: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories)
      throw new Error('No category matched, Please create new category');
    res.status(200).json({
      status: 'success',
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const Mongoose = require('mongoose');

const categorySchema = new Mongoose.Schema({
  category: {
    type: String,
    required: [true, 'A post must specify a category'],
  },
});

const Category = Mongoose.model('Category', categorySchema);

module.exports = Category;

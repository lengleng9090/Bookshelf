const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  bookid:Number,
  name: String,
  description:String,
  category: String,
  price: Number,
  shelfId: Number
});
const BookModel = mongoose.model('Product', BookSchema);

module.exports = BookModel;
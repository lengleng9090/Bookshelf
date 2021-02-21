const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShelfSchema = new Schema({
    shelfId: Number
  });

const ShelfModel = mongoose.model('Shelf', ShelfSchema);
module.exports = ShelfModel;
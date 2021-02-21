const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const Shelf = require('../models/Shelf');

const router = express.Router();
var mongoDB = 'mongodb://localhost:27017/bookshelf';

router.use(express.json());

mongoose.connect(mongoDB, {
  useNewUrlParser: true})

router.get('/',async(req,res)=>{
  const shelfs = await Shelf.find({});
  res.status(200).json(shelf);
});

router.post('/',async(req,res)=>{
  const payload = req.body
  const shelf = new Shelf(payload);
    await shelf.save();
    res.status(201).json(shelf);
});

router.delete('/',async (req,res)=>{
  const books = await Book.find({});
  let bookFound = books.filter(book => book.shelfId == req.query.shelfId && book.name != null);
  if(bookFound.length>0){
    res.status(400).json({msg:`${req.query.shelfId} have a book please remove book`});
  }
  else{
    let booknull = books.filter(book => book.shelfId == req.query.shelfId && book.name == null);
    let num = parseInt(req.query.shelfId);
    for (let i=0 ;i<booknull.length;i++) {
      await Book.findOneAndDelete({bookid:booknull[i].bookid});
    }
    await Shelf.findOneAndDelete({shelfId:num});
    res.status(200).json({msg:`delete ${req.query.shelfId} compelete.`});
  }
});

module.exports = router;
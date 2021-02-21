const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const Shelf = require('../models/Shelf');

const router = express.Router();
var mongoDB = 'mongodb://localhost:27017/bookshelf';

mongoose.connect(mongoDB, {
  useNewUrlParser: true})

router.use(express.json());

router.get('/',async (req,res)=>{
  const books = await Book.find({});
  let result;
  if(req.query.name){
    result = books.filter(book => book.name === req.query.name);
    res.json(result);
  }
  else if(req.query.category){
    result = books.filter(book => book.category === req.query.category);
  }
  res.json(result);
})

router.post('/',async (req,res)=>{
  try{
  if(req.body.bookid == null && req.body.name){
    res.status(400).json({ msg: `missing value`});
  }
  const books = await Book.find({});
  const shelfs = await Shelf.find({});
  for (let i=0;i<books.length;i++) {
    if(books[i].bookid=== req.body.bookid){
      res.status(400).json({ msg: `bookid : (${req.body.bookid}) already has declared.`});
    }
    else if(books[i].name === req.body.name){
      res.status(400).json({ msg: `book name : (${req.body.name}) already has a book.`});
    }
  }
  for (let i=0 ;i<shelfs.length;i++) {
    let count=0;
    for (let j=0;j<books.length;j++) {
      if(books[j].shelfId === shelfs[i].shelfId){
        if(books[j].name == null){
          await Book.findOneAndUpdate({bookid:books[j].bookid},{$set: req.body});
          res.status(201).json({ msg: `book name :${req.body.name} has been added.`});
        }
        count++;
      }
    }
    if(count < 5){
      let payload = req.body;
      payload.shelfId = shelfs[i].shelfId;
      const book = new Book(payload);
      await book.save();
      res.status(201).json({ msg: `book name :${req.body.name} has been added.`});
    }
  }
  res.status(400).json({ msg: `bookshelf has been full, please insert new bookshelf`});
  }catch (error) {
    console.log(error);
  }
});

router.put('/',async(req,res)=>{
  const payload = req.body;
  await Book.findOneAndUpdate({name:req.query.name},{$set:payload});
  res.status(200).json({ msg: `Update sucess!`});
});

router.delete('/',async(req,res)=>{
  const books = await Book.find({});
  let found = books.filter(book=>book.bookid == parseInt(req.query.bookid));
  if(found.length >0){
    await Book.findOneAndUpdate({bookid:parseInt(req.query.bookid)},{$set:{name:null,description:null,category:null,price:null}});
    res.status(200).json({ msg: `delete sucess!`});
  }
  else
    res.status(400).json({ msg: `bookid : ${req.query.bookid} not found.`});
});

module.exports = router;
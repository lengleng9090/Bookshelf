const express = require('express');
const app = express();
const PORT = 9000;

app.use('/bookshelf',require('./api/BookshelfApi'));

app.use('/book',require('./api/BookApi'));

  app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
  })
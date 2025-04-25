const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');

dbConnect();

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});

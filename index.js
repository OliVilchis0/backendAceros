const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

//create an express server
const app = express();
app.use(cors());

// read and parse body
app.use(express.json());

//database connection
dbConnection();

//routes
app.use('/api/products', require('./routes/products'));
app.use('/api/category', require('./routes/category'));
app.use('/api/input', require('./routes/input'));
app.use('/api/output', require('./routes/output'));

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});
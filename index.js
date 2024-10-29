var expressLiquid = require('express-liquid');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

var options = {
    // read file handler, optional
    includeFile: function (filename, callback) {
      fs.readFile(filename, 'utf8', callback);
    },
    // the base context, optional
    context: expressLiquid.newContext(),
    // custom tags parser, optional
    customTags: {},
    // if an error occurred while rendering, show detail or not, default to false
    traceError: false,
    // Enable template inheritance
    extensible: true
  };
app.set('view engine', 'liquid');
app.set('views', path.resolve(__dirname, 'views'));

app.engine('liquid', expressLiquid(options));
app.use(express.static('public'));

app.use(expressLiquid.middleware);

const data = {
  user: {
    name: 'John Doe',
    age: 30
  },
  items: ['Apple', 'Banana', 'Cherry'],
  showGreeting: true,
  title: 'Hello, World!',
};

app.get('/', (req, res) => {
  res.render('index', data);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
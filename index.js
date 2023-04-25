// ***************************************************************************
// Bank API code from Web Dev For Beginners project
// https://github.com/microsoft/Web-Dev-For-Beginners/tree/main/7-bank-project/api
// ***************************************************************************

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// App constants
const port = process.env.PORT || 3000;
  
// Create the Express app & setup middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());


// Hello World for index page
app.get('/', function (req, res) {
    return res.status(200).send("Hello Worldddd!");
})

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
  

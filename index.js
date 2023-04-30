// ***************************************************************************
// Bank API code from Web Dev For Beginners project
// https://github.com/microsoft/Web-Dev-For-Beginners/tree/main/7-bank-project/api
// ***************************************************************************

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const mongoClient = require('./mongoClient/mongoClient');

// App constants
const port = process.env.PORT || 3000;
  
// Create the Express app & setup middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());


// Hello World for index page
app.get('/', function (req, res) {
    return res.status(200).send("YO KK");
})

app.get('/getAllUsersStatus', async function(req,res) {
    const allUsers = await mongoClient.getAllDocuments()
    return res.status(200).send(allUsers)
})

app.post('/setUserStatus', async function(req,res) {
    console.log("setUserStatus called")
    const body = req.body
    userObject = {
        email: body.email,
        name: body.name,
        lastUpdated: body.lastUpdated
    }
    const savedUserDocument = await mongoClient.saveDocument(userObject)
    return res.status(200).send(savedUserDocument)
})

app.post('/deleteOneUser', async function(req,res) {
    console.log("deleteOneUser called")
    const body = req.body
    const deletedUserDocument = await mongoClient.deleteOneDocument(body.email)
    return res.status(200).send(deletedUserDocument)
})

app.post('/deleteMultipleUsers', async function(req,res){
    console.log("deleteMultipleUsers called")
    const body = req.body
    const deletedUserDocument = await mongoClient.deleteMultipleDocuments(body.emails)
    return res.status(200).send(deletedUserDocument)
})

app.post('/deleteAllUsers', async function(req,res){
    console.log("deleteAllUsers called")
    const deletedUserDocument = await mongoClient.deleteAllDocuments()
    return res.status(200).send(deletedUserDocument)
})

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
  

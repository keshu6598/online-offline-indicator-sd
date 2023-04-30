const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    email: String,
    name: String,
    lastUpdated: Number,
});

const dataModel = mongoose.model('OnlineOfflineData', dataSchema);

module.exports = {
    dataModel
}
const { connect, disconnect } = require('../config/db.config');
const { dataModel:db } = require('../model/indicator.model');


class MongoClient {
    
    constructor() {
        connect()
    }

    destructor() {
        disconnect()
    }
    
    async getAllDocuments() {
        const allUsers = await db.find()
        console.log('AllUsers = ', allUsers)
        return allUsers
    }

    async getDocumentByEmail(email) {
        const userEntry = await db.find({email: email}).exec()
        console.log('UserEntry = ', userEntry)
        return userEntry
    }

    async saveDocument(data) {
        console.log("Saving Document = ", data)
        let dataSaved = {}
        try {
            dataSaved = await db.findOneAndReplace({email: data?.email}, data, {
                new: true,
                upsert: true, // insert the document if it does not exist
            });
        } catch (err) {
            console.error('Error saving data to DB: ', err)
        }
        return dataSaved
    }

    async updateDocument(email, newTime) {
        let dataUpdated = {}
        try {
            dataUpdated = await db.replaceOne({email: email}, {lastUpdated: newTime})
        } catch (err) {
            console.error('Error updating data in DB: ', err)
        }
        return dataUpdated
    }

    async deleteOneDocument(email) {
        let dataDeleted
        try {
            dataDeleted = await db.deleteOne({email: email})
        } catch (err) {
            console.error('Error deleting data from DB: ', err)
        }
        return dataDeleted
    }

    async deleteMultipleDocuments(emailList) {
        let dataDeletedCount
        try {
            dataDeletedCount = await db.deleteMany({email: {$in: emailList}})
        } catch (err) {
            console.error('Error deleting data from DB: ', err)
        }
        return dataDeletedCount
    }

    async deleteAllDocuments() {
        let dataDeletedCount
        try {
            dataDeletedCount = await db.deleteMany({})
        } catch (err) {
            console.error('Error deleting data from DB: ', err)
        }
        return dataDeletedCount
    }
}

module.exports = new MongoClient()
function openDb() {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/book');
    const db = mongoose.connection
}
module.exports = {
    openDb: openDb()
};
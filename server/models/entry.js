const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EntrySchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
});

const Entry = mongoose.model('entry', EntrySchema);

module.exports = Entry;
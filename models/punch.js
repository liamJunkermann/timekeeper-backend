const mongoose = require('mongoose');

const PunchSchema = new mongoose.Schema({
    person: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    punchTime: {
        type: Date,
        require: true,
        default: Date.now()
    },
    type: {
        type: String,
        required: true,
    }
});

const Punch = mongoose.model("Punch", PunchSchema);
module.exports = Punch;
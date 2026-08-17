const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    difficulty: {
        type: String,
        required: true
    },

    won: {
        type: Boolean,
        required: true
    },

    pointsEarned: {
        type: Number,
        default: 0
    }
});

module.exports =  mongoose.model('Game' , gameSchema);
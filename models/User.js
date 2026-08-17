const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required : true,
        unique : true,
        minlength : 4,
        maxlength : 20,
    },
    password : {
        type: String,
        required : true,
        minlength : 4,
        maxlength : 20,
    },
    gamesPlayed : {
        type : Number,
        default : 0
    },
    gamesWon : {
        type : Number,
        default : 0
    },
    points : {
        type : Number,
        default : 0
    },
    level : {
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model('User' , userSchema);
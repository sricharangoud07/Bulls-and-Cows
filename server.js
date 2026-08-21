const express = require('express');
const app = express();

const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const Game = require('./models/Game.js');
const User = require('./models/User.js');

const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname , 'public')));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));




function requireLogin(req , res , next){
    if(!req.session.userId){
        return res.status(401).json({
            message : 'Login required'
        })
    }
    next();
}

function getLevel(points , gamesPlayed){
    if(gamesPlayed === 0) return 0;
    return Number((points/(gamesPlayed*20)).toFixed(2));
}

function calculatePoints(difficulty , won){
    if(!won) return 0;
    let points = {
        'easy' : 20,
        'medium' : 40,
        'hard' : 60,
        'veryHard' : 80,
        'expert' : 100
    }
    return points[difficulty];
}


app.post('/register' , async (req , res) => {
    try{
        let data = req.body;
        let response = await User.create(data);
        res.status(201).json({
            message : 'User Created'
        })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message : ' Failed to create user'
        })
    }
})

app.get('/profile', requireLogin, async (req, res) => {

    const user = await User.findById(req.session.userId);

    res.json({
        userName: user.userName,
        gamesPlayed: user.gamesPlayed,
        gamesWon: user.gamesWon,
        points: user.points,
        level: user.level
    });
});


app.post('/login', async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({
            userName: data.userName
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        if (user.password !== data.password) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        req.session.userId = user._id;

        res.status(200).json({
            message: 'Login successful'
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

app.post('/logout' , requireLogin , (req , res) => {
    req.session.destroy((error) => {
        if(error){
            return res.status(500).json({
                message : 'Logout Failed'
            })
        }
        res.json({
            message : 'Logout Successful'
        });
    });
})

app.get('/me' , async (req ,res) =>{
    try{
        if(!req.session.userId){
            return res.status(401).json({
                loggedIn : false
            })
        }
        const user = await User.findById(req.session.userId);
        if(!user){
            return res.status(401).json({
                loggedIn: false
            });
        }
        res.json({
                loggedIn: true,
                userName: user.userName,
                gamesPlayed: user.gamesPlayed,
                gamesWon: user.gamesWon,
                points: user.points,
                level: user.level
            });
    }catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: 'Server error'
        });
    }
});

app.post('/game/result', requireLogin, async (req, res) => {
    try {
        const { difficulty, won } = req.body;

        const pointsEarned = calculatePoints(difficulty, won);

        await Game.create({
            userId: req.session.userId,
            difficulty,
            won,
            pointsEarned
        });

        const user = await User.findByIdAndUpdate(
            req.session.userId,
            {
                $inc: {
                    gamesPlayed: 1,
                    gamesWon: won ? 1 : 0,
                    points: pointsEarned
                }
            },
            { new: true }
        );

        user.level = getLevel(
            user.points,
            user.gamesPlayed
        );

        await user.save();

        res.status(201).json({
            message: 'Game result saved',
            pointsEarned,
            level: user.level
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: 'Failed to save game results'
        });
    }
});




mongoose.connect('mongodb://127.0.0.1:27017/Bulls_and_Cows')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT , () =>{
            console.log('Listning on Port 3000');
        })
    })
    .catch((error) => {
        console.log('MongoDB connection error:', error);
});
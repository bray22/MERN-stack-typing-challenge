const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

router.post('/addSubmission', async (req, res) => {
   
    const accuracy = req.body.accuracy;

     const submissionSchema = new Schemas.Submission({
        accuracy: req.body.accuracy,
        challengeId: req.body.challengeId,
        seconds: req.body.seconds,
        words: req.body.words,
        userId: req.body.userId,
     });

    try {
        await submissionSchema.save( (err, newSchemaResults) => {
             if (err) res.end('Saved');
             
             res.end();
         });
     } catch(err) {
         console.log(err);
         
         res.end();
     }
});


router.get('/submissions', async (req, res) => {
    const submissions = Schemas.Submission;
    const users = Schemas.Users;
    // this code will get all challenges and join the user table
     const getSubmissions = await submissions
        .find()
        .populate('userId')
        .populate('challengeId')
        .exec((err, submissionData) => {
            if (err) throw err;
                if (submissionData) {

                console.log(submissionData);
                res.end(JSON.stringify(submissionData));
                } else {
                    res.end();
                }
        });
 });
 


router.get('/challenges', async (req, res) => {
    const challenges = Schemas.Challenges;

    // this code will get all challenges and join the user table
    const getChallenges = await challenges.find({}).populate("challenge").exec((err, challengeData) => {
        if (err) throw err;
        if (challengeData) {
            res.end(JSON.stringify(challengeData));
        } else {
            res.end();
        }
    });
});

router.get('/users', async (req, res) => {
    const users = Schemas.Users;

    // this code will get all challenges and join the user table
    const getUsers = await users.find({}).populate("user").exec((err, userData) => {
        if (err) throw err;
        if (userData) {
            res.end(JSON.stringify(userData));
        } else {
            res.end();
        }
    });
});

router.get('/submission', async (req, res) => {
    const challenges = Schemas.Challenges;

    // this code will get all challenges and join the user table
    const getChallenges = await challenges.find({}).populate("challenge").exec((err, challengeData) => {
        if (err) throw err;
        if (challengeData) {
            res.end(JSON.stringify(challengeData));
        } else {
            res.end();
        }
    });
});

router.get('/challenges/random/:level', async (req, res) => {
    const challenges = Schemas.Challenges;
    const level = req.params.level;

    // this code will get random challenges
    const getRandomChallenge = await challenges.find({ level: level }).populate("challenge").exec((err, challengeData) => {
        if (err) throw err;
        if (challengeData) {
            const random = Math.floor(Math.random() * challengeData.length);
            res.end(JSON.stringify(challengeData[random]));
        } else {
            res.end();
        }
    });
});


/*

// Uncomment to add a new user document to our users table
// To use this, run the backend server, then go to URL: localhost:4000/addUser

router.get('/addUser', async (req, res) => {
    const user = {username: 'eaglefang', fullname: 'Sensei Johnny'};
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save( async(err, newUserResult) => {
            console.log('New user created!');
            res.end('New user created!');
        });
    } catch(err) {
        console.log(err);
        res.end('User not added!');
    }
});
*/

module.exports = router;
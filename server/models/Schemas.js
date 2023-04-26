const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String, required:true},
    fullname: {type:String, required:true},
    updateDate: {type:Date, default:Date.now}
});

const challengeSchema = new Schema({
    id: {type:Number, required:true},
    level: {type:Number, required:true},
    challenge_text: {type:String, required:true},
    wordlength: {type:Number, required:true},
    timestamp: {type:Date, default:Date.now}
});

const submissionSchema = new Schema({
    id: {type:Number, required:false},
    challengeId: {type:Schema.Types.ObjectId, ref: 'challenges', required:false},
    seconds: {type:Number, required:false},
    accuracy: {type:Number, required:false},
    words: {type:Number, required:false},
    userId: {type:Schema.Types.ObjectId, ref:'users', required:false},
    timestamp: {type:Date, default:Date.now}
});

const Users = mongoose.model('users', userSchema, 'users');
const Challenge = mongoose.model('challenge', challengeSchema, 'challenge');
const Challenges = mongoose.model('challenges', challengeSchema, 'challenges');
const Submission = mongoose.model('submission', submissionSchema, 'submission');
const allSchemas = {'Users':Users, 'Challenges':Challenges, 'Challenge':Challenge, 'Submission':Submission};

module.exports = allSchemas;
import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    referrel: {
        type: Number,
        required: true
    },
    profilePicture: {
        type: String,
        default:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s',
      },
}, {timestamps: true})

const Leaderboard = mongoose.model('Leaderboard', boardSchema)

export default Leaderboard
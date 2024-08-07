import mongoose from "mongoose";

const referrelSchema = new mongoose.Schema({
    referrelId:{
        type: String,
        required: true,
    },
    firstGenActive: {
        type: Number,
        default: 0
    },
    secondGenActive: {
        type: Number,
        default: 0
    },
    thirdGenActive: {
        type: Number,
        default: 0
    },
    firstGeninActive: {
        type: Number,
        default: 0
    },
    secondGeninActive: {
        type: Number,
        default: 0
    },
    thirdGeninActive: {
        type: Number,
        default: 0
    },
    
}, {timestamps: true})

const Referrel = mongoose.model('Referrel', referrelSchema)


export default Referrel
import mongoose from "mongoose";

const packSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    operator: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    packTitle: {
        type: String,
       
    },
    packName: {
        type: String,
        
    },
    accepted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    
}, {timestamps: true})

const BuyPacks = mongoose.model('BuyPacks', packSchema)

export default BuyPacks
import mongoose from "mongoose"


const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    number: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        required: true
    },
    trNumber: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    }


},{timestamps: true})

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
import Payment from "../models/payment.model.js";









export const Pay = async (req, res, next) => {
    try {
        
        const { userId, number, amount, type, trNumber, method } = req.body

        const newPayment = new Payment({userId, number, amount, type, trNumber, method})

        await newPayment.save()
        res.status(201).json({ newPayment, message: 'payment created successfully' });

    } catch (error) {
        next(error)
    }
}
import BuyPacks from "../models/buypacks.model.js";



export const Packs = async (req, res, next) => {
    try {

        const { type, number, amount, operator, packTitle, packName, userId } = req.body

        const buypack = new BuyPacks({type, number, amount, operator, packTitle, packName, userId})

        await buypack.save()
        res.status(201).json({ buypack, message: 'the pack buyed successfully' });
        
    } catch (error) {
        next(error)
    }
}
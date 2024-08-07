import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { Pay } from "../controllers/payment.controller.js"

const router = express.Router()

router.post('/pay', verifyToken, Pay)

export default router
import express from "express"
import { Packs } from "../controllers/buypacks.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()


router.post('/pay', verifyToken ,Packs)


export default router
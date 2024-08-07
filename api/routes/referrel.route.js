import express from "express"
import { inactiveReferrel, referrelController, referrelDetails } from "../controllers/referrel.controller.js"

const router = express.Router()


router.post('/update', referrelController)
router.post('/update/inactive', inactiveReferrel)
router.post('/details', referrelDetails)

export default router
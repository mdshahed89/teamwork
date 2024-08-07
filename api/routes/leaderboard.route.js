import express from "express"
import { leaderBoard, toponLeaderboard } from "../controllers/leaderboard.controller.js"

const router = express.Router()

router.post('/join', leaderBoard)
router.post('/top', toponLeaderboard)

export default router
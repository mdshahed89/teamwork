import Leaderboard from "../models/leaderboard.model.js"
import Referrel from "../models/referrel.model.js"
import User from "../models/user.model.js"



export const leaderBoard = async (req, res, next) => {
    try {
        const { name, userId, referrelId } = req.body

        const referrelUser = await Referrel.findOne({referrelId})
        const user = await User.findById(userId)

        const newMember = new Leaderboard({name, userId, referrel: referrelUser.firstGenActive, profilePicture: user.profilePicture})

        await newMember.save()

        res.status(201).json({
            message: "Leaderboard joined successfully"
        })

    } catch (error) {
        next(error)
    }
}


export const toponLeaderboard = async (req, res, next) => {
    try {
        const { userId, referrelId } = req.body

        const allReferrel = await Referrel.find({})
        for (let referrel of allReferrel) {
            const user = await User.findOne({phoneNo: referrel.referrelId})

            const id = await Leaderboard.findOne({userId: user._id})
            
            await Leaderboard.findByIdAndUpdate(
            id,
            {
              $set: {
                referrel: referrel.firstGenActive,
              },
            },
            { new: true }
          );

          }

        const topMembers = await Leaderboard.find({}).sort({referrel: -1}).limit(10)

        if(!topMembers){
            return res.status(404).json({
                message: "Leaderboard member not found"
            })
        }
        res.status(200).json(topMembers)

    } catch (error) {
        next(error)
    }
}
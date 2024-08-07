import User from "../models/user.model.js"
import Referrel from "../models/referrel.model.js";


export const referrelController = async (req, res, next) => {

    try {
        
        const { referrelId } = req.body

        // console.log(referrelId);

        const firstUser = await User.findOne({phoneNo: referrelId})

        if(!firstUser){
          return res.status(200).json({
            message: "first user does not exist"
          });
        }

        await User.findByIdAndUpdate(
            firstUser._id,
            {
              $set: {
                balance: firstUser.balance + 150
              },
            },
            { new: true }
          );
        const firstUserReferrel = await Referrel.findOne({referrelId})

        if(firstUserReferrel){
          await Referrel.findByIdAndUpdate(
            firstUserReferrel._id,
            {
              $set: {
                firstGenActive: firstUserReferrel.firstGenActive + 1,
                firstGeninActive: firstUserReferrel.firstGeninActive - 1
              },
            },
            { new: true }
          );
        }

        const secondUser = await User.findOne({phoneNo: firstUser.referrelId})
        if(!secondUser){
          return res.status(200).json({
          message: "first user referrel balance added & second user does not exist"
        });
        }
        await User.findByIdAndUpdate(
          secondUser._id,
          {
            $set: {
              balance: secondUser.balance + 80
            },
          },
          { new: true }
        );
        const secondUserReferrel = await Referrel.findOne({referrelId: firstUser.referrelId})

        if(secondUserReferrel){
          await Referrel.findByIdAndUpdate(
            secondUserReferrel._id,
            {
              $set: {
                secondGenActive: secondUserReferrel.secondGenActive + 1,
                secondGeninActive: secondUserReferrel.secondGeninActive - 1
              },
            },
            { new: true }
          );
        }

        const thirdUser = await User.findOne({phoneNo: secondUser.referrelId})
        if(!thirdUser){
          return res.status(200).json({
          message: "first & second user referrel balance added & third user does not exist"
        });
        }
        await User.findByIdAndUpdate(
          thirdUser._id,
          {
            $set: {
              balance: thirdUser.balance + 50
            },
          },
          { new: true }
        );
        const thirdUserReferrel = await Referrel.findOne({referrelId: secondUser.referrelId})

        if(thirdUserReferrel){
          await Referrel.findByIdAndUpdate(
            thirdUserReferrel._id,
            {
              $set: {
                thirdGenActive: thirdUserReferrel.thirdGenActive + 1,
                thirdGeninActive: thirdUserReferrel.thirdGeninActive - 1
              },
            },
            { new: true }
          );
        }

        res.status(200).json({
          message: "all referrel balance added"
        });


    } catch (error) {
        next(error)
    }

}


export const inactiveReferrel = async (req, res, next) => {

  try {
      
      const { referrelId } = req.body

      // console.log(referrelId);

      const firstUser = await User.findOne({phoneNo: referrelId})

      if(!firstUser){
        return res.status(200).json({
          message: "first user does not exist"
        });
      }

      const firstUserReferrel = await Referrel.findOne({referrelId})

      if(firstUserReferrel){
        await Referrel.findByIdAndUpdate(
          firstUserReferrel._id,
          {
            $set: {
              firstGeninActive: firstUserReferrel.firstGeninActive + 1
            },
          },
          { new: true }
        );
      }

      const secondUser = await User.findOne({phoneNo: firstUser.referrelId})
      if(!secondUser){
        return res.status(200).json({
        message: "first user inactive referrel added & second user does not exist"
      });
      }

      const secondUserReferrel = await Referrel.findOne({referrelId: firstUser.referrelId})

      if(secondUserReferrel){
        await Referrel.findByIdAndUpdate(
          secondUserReferrel._id,
          {
            $set: {
              secondGeninActive: secondUserReferrel.secondGeninActive + 1
            },
          },
          { new: true }
        );
      }

      const thirdUser = await User.findOne({phoneNo: secondUser.referrelId})
      if(!thirdUser){
        return res.status(200).json({
        message: "first & second user inactive referrel added & third user does not exist"
      });
      }
      const thirdUserReferrel = await Referrel.findOne({referrelId: secondUser.referrelId})

      if(thirdUserReferrel){
        await Referrel.findByIdAndUpdate(
          thirdUserReferrel._id,
          {
            $set: {
              thirdGeninActive: thirdUserReferrel.thirdGeninActive + 1
            },
          },
          { new: true }
        );
      }

      res.status(200).json({
        message: "all inactive referrel added"
      });


  } catch (error) {
      next(error)
  }

}


export const referrelDetails = async (req, res, next) => {
  try {
    const { referrelId } = req.body

    const referrelDetails = await Referrel.findOne({referrelId})
    if(!referrelDetails){
      return res.status(404).json({
        message: "referrel details not found"
      })
    }

    res.status(200).json(referrelDetails)

  } catch (error) {
    next(error)
  }
}

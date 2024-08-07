import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// update user

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    // if (req.body.password) {
    //   req.body.password = bcryptjs.hashSync(req.body.password, 10);
    // }

    // const balance = req.body.balance;
    // const profilePictureUrl = req.file ? req.file.path : null;
    const { firstName, lastName, balance, joined, activated  } = req.body;
    const file = req.file
    // let password = req.body.password

    console.log(req.file, firstName, lastName);

    const updates = {};

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (req.body.password) updates.password = await bcryptjs.hashSync(req.body.password, 10);
    if (balance) updates.balance = balance;
    if (joined) updates.joined = joined;
    if (activated) updates.activated = activated;
    if (file) updates.profilePicture = file.path;
    

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: updates,
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// export const updateBalance = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, 'You can update only your account!'));
//   }
//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     // const balance = req.body;
    

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           // username: req.body.username,
//           // email: req.body.email,
//           password: req.body.password,
//           // balance: balance
//           // profilePicture: req.body.profilePicture,
//         },
//       },
//       { new: true }
//     );
//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };


// delete user


export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}
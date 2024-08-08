import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import Referrel from '../models/referrel.model.js';

export const signup = async (req, res, next) => {
  try {
  const { referrelId, firstName, lastName, phoneNo, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  
  const newUser = new User({ referrelId, firstName, lastName, phoneNo, email, password: hashedPassword });
  
  await newUser.save();
  
  const referrel = new Referrel({  referrelId: phoneNo })
  await referrel.save()


  // const referreledUser = await User.findOne({referrelId})

  // const theUser = await User.findOne({email})

  

  res.status(201).json({ message: 'User created successfully' });
  

    
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id.toString() }, "dsfwefwfw51f5w4efwfwec", { expiresIn: '30d' });
    // console.log(token);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 2592000000000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate, secure: false,
         })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "dsfwefwfw51f5w4efwfwec");
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "dsfwefwfw51f5w4efwfwec");
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};

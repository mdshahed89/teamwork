import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    referrelId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true
    },
    activated:{
      type: Boolean,
      default: false
    },
    joined:{
      type: Boolean,
      default: false
    },
    award:{
      type: Number,
      default: 0
    },
    prize:{
      type: Number,
      default: 0
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

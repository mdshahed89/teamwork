import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../utils/cloudinary.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, upload.single('file') , updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;

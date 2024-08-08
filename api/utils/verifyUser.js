import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {

    const token = req.headers.authorization
    // const token = req.cookies.access_token;
    console.log(`verifyuser token: ${token}`);
    

    if (!token) return next(errorHandler(401, 'You are not authenticated!'));
    // console.log(token);

    jwt.verify(token, "dsfwefwfw51f5w4efwfwec", (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        console.log(user);
        
        next();
    });


}
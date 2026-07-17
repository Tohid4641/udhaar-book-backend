import User from '../models/User';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';

export const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    try {
        if (!token) throw new AppError('Unauthorized user!!', 401);

        const decodeData = await jwt.verify(token, process.env.JWT_SECRET);

        if (!decodeData) throw new AppError('Unauthorized user!!', 401);

        const { _id } = decodeData;

        const user = await User.findById(_id);

        if (!user) throw new AppError('User not found!', 404);

        req.user = user;

        next();

    } catch (error) {
        console.error(error.message);
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!!"
        })
    }
}
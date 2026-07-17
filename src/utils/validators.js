import validator from 'validator';
import AppError from './AppError.js';

export const signupValidator = (data) => {
    const { shopName, email, password } = data;
    if (!shopName) {
        throw new AppError("shopName is not valid", 400);
    } else if (!validator.isEmail(email)) {
        throw new AppError("Email is not valid", 400);
    } else if (!validator.isStrongPassword(password)) {
        throw new AppError('Please enter a strong password', 400);
    }
};

export const loginValidator = (data) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new AppError("Invalid Credentials", 400);
    } else if (!validator.isEmail(email)) {
        throw new AppError("Invalid Credentials", 400);
    }
};

export const updatePasswordValidator = (data) => {
    const { newPassword, oldPassword, email } = data;

    if (!newPassword || !oldPassword || !email) {
        throw new AppError("Please enter a valid inputs!", 400);
    } else if (!validator.isEmail(email)) {
        throw new AppError("Invalid email Id", 400);
    } else if (!validator.isStrongPassword(newPassword)) {
        throw new AppError("Please choose a strong password!", 400);
    }
};
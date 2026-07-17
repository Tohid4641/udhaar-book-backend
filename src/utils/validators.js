import validator from 'validator';
import AppError from './AppError';

export const signupValidator = (data) => {
    const { firstName, lastName, emailId, password } = data;
    if (!firstName || !lastName) {
        throw new AppError("Name is not valid", 400);
    } else if (!validator.isEmail(emailId)) {
        throw new AppError("Email is not valid", 400);
    } else if (!validator.isStrongPassword(password)) {
        throw new AppError('Please enter a strong password', 400);
    }
};

export const loginValidator = (data) => {
    const { emailId, password } = data;
    if (!emailId || !password) {
        throw new AppError("Invalid Credentials", 400);
    } else if (!validator.isEmail(emailId)) {
        throw new AppError("Invalid Credentials", 400);
    }
};

export const updatePasswordValidator = (data) => {
    const { newPassword, oldPassword, emailId } = data;

    if (!newPassword || !oldPassword || !emailId) {
        throw new AppError("Please enter a valid inputs!", 400);
    } else if (!validator.isEmail(emailId)) {
        throw new AppError("Invalid email Id", 400);
    } else if (!validator.isStrongPassword(newPassword)) {
        throw new AppError("Please choose a strong password!", 400);
    }
};
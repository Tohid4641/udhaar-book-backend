import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// User (shopkeeper)
const userSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: [true, 'Shop name is required'],
        minLength: 4,
        maxLength: 10,
    },
    email: {
        type: String,
        required: [true, 'Email Id is required'],
        unique: [true, 'email already exists'],
        validate: {
            validator: (v) => validator.isEmail(v), // Checks for valid email format
            message: 'Please provide a valid email address'
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: (v) => validator.isStrongPassword(v, {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
            message: 'Password must be strong (include uppercase, lowercase, number, and symbol)'
        }
    },
    tonePreference: {
        type: String,
        default:"english",
        enum: {
            values: ["hindi", "hinglish", "english"],
            message: '{VALUE} is not a valid tone preference type',
        },
    },

}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
}

userSchema.methods.validatePassword = async function (inputPassword) {
    const user = this;

    const hashPassword = user.password;

    const validatedPassword = await bcrypt.compare(inputPassword, hashPassword);

    return validatedPassword;
}

const User = mongoose.model('User', userSchema);
export default User;
import express from 'express';
const router = express.Router();
import authRouter from './auth.routes.js';


// const { userAuth } = require('../middlewares/auth');

router.use('/auth', authRouter);


export default router;
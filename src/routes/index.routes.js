import express from 'express';
const router = express.Router();

const authRouter = require('./auth.routes');

// const { userAuth } = require('../middlewares/auth');

router.use('/auth', authRouter);


export default router;
import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import connectDB from './configs/database';
import globalErrorHandler from './utils/globalErrorHandler';

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/v1', userRouter);
app.use('/*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Invalid API call!',
    })
})

app.use(globalErrorHandler);

connectDB()
    .then(() => {
        console.log("Database connected!!");
        server.listen(port, () =>
            console.log(
                `Udhaar Book: backend server is listening on ::: http://localhost:${port}`
            )
        );
    })
    .catch((err) => {
        console.error("Database connection failed!!");
        console.error(err.message);
    });
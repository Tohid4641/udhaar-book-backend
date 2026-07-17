import express from 'express';
import dotenv from './utils/dotenv.js';
import connectDB from './configs/database.js';
import globalErrorHandler from './utils/globalErrorHandler.js';
import router from './routes/index.routes.js';
import cookieParser from "cookie-parser";
import morgan from 'morgan';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1', router);

app.use('/*splate', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Invalid API call!',
    })
})

app.use(globalErrorHandler);

connectDB()
    .then(() => {
        console.log("Database connected!!");
        app.listen(port, () =>
            console.log(
                `Udhaar Book: backend server is listening on ::: http://localhost:${port}`
            )
        );
    })
    .catch((err) => {
        console.error("Database connection failed!!");
        console.error(err.message);
    });
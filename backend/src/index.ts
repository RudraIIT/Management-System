import express from 'express';
import 'dotenv/config';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js';
import contestRoutes from './routes/contest.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/contests', contestRoutes);


connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.log('Error connecting to database: ', error);
});

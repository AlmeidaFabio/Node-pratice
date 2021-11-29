import 'dotenv/config';
import 'reflect-metadata';
import './database';

import { app } from "./app";

app.listen(process.env.PORT || 633, () => {
    console.log(`Server is running in ${process.env.BASE_URL}:${process.env.PORT}`)
});
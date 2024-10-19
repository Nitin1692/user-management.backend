const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./config/db')
const userRouter = require('./routes/userRouter')

dotenv.config("./.env");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

const PORT = process.env.PORT || 5001;

app.use('/api', userRouter);
app.get("/", (req, res) => {
    res.status(200).send("OK from Server");
});


db();
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
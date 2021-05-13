const express = require('express');
const path = require('path');
const cors = require('cors');
const env = require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

//Middlewares;
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Mongoose;
const mongoose  = require('mongoose');
const db = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.63nhb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log(`Database Connected!`))
.catch(err=>console.log(err));


//Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);
app.get('/api/test', (req, res)=>{
    res.status(200).json({
        msg:"Found you my front..."
    })
})

//PORT CONFIG
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});

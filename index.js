const express = require('express'); 
const helmet = require('helmet');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const mangoose = require('mongoose');
require('dotenv').config();
const taxRoutes = require('./src/routers/tax.routes');


const authRouter = require('./src/routers/authRouter');

const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongoose Connection
const PORT = process.env.PORT || 8000;
mangoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Succcrssfuly  Connected to Database');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

//Routes Middleware
app.use('/api/auth', authRouter);
app.use('/api/tax', taxRoutes);


app.get('/', (req, res) => {
res.json({message:'Hello from tax service in Nigeria !'}); 
});



app.listen(PORT, () => {
  console.log(`Tax service is running on port ${PORT}`);
});

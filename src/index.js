const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
require('../connction/db');
const app = express()
require('dotenv').config()
app.use(express.json());
app.use(cors())
const path = require('path');



// +++++++++++++++++++++++Routes++++++++++++++++++++++++
//Admin related Routes
const adminRoutes = require('./adminRoute/authRoute');
const categoryRoutes = require('./adminRoute/categoryRoute');
const productRoutes = require('./adminRoute/productRoute');
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)


//Customer/User related Routes
const clientRoutes = require('./clientRoute/authRoute')
const cartRoute = require('./clientRoute/cartRoute')
app.use('/api', cartRoute)
app.use('/api', clientRoutes)

//
app.use('/public/',express.static(path.join(__dirname, 'uploads')));
// function middleware (req, res, next){
//   console.log('Request URL:', req.originalUrl);
//   next();
// }

app.use('/', (req,res)=>{
  console.log("hello");
})
app.use(bodyParser.json())
// Connection(process.env.MONGO_DB_USERNAME,process.env.MONGO_DB_PW)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
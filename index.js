const express = require('express');
const app = express();

const { default: mongoose } = require('mongoose');
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const cors = require("cors")
const flash = require('connect-flash'); 
const session = require('express-session');


//dotenv import
require("dotenv").config();
const { MONGO_URL } = require('./env');




const {blogRouter} = require("./routes/blog.route");
// const {healthRouter} = require('./routes/health');
const {authRouter} = require('./routes/author.route');
const { staticRouter } = require("./routes/staticRoutes")
const { restrictToLoggedUserOnly, checkAuth } = require('./Middleware/auth');

const PORT = 8080;
app.set('view engine' ,'ejs');

//middleware:-
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(cors());
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'SECRET', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
}));

app.use((req, res ,next)=>{
    res.locals.messages = req.flash();
    next();
})


// app.use("/health",healthRouter);
app.use("/blog", blogRouter);
app.use("/auth",authRouter);
app.use("/" ,checkAuth , staticRouter);

app.listen(PORT, () =>{
    console.log(`App is running on localhost:${PORT}`);
    mongoose.connect( MONGO_URL);
});

/// moustache and ejs and handlers bar templating engine hai kuchh bhi use use kr sakte hai
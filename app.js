const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport')
const app = express();

// Load Routes

const ideas = require("./routes/ideas");
const users = require("./routes/users")

// Passport config
require('./config/passport')(passport)

// DB Config
// const db = require('./config/database')
// Map Global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect("mongodb+srv://test:test@vidjot-jn7qd.gcp.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true })
.then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err));
// Flash MiddleWare
app.use(flash());
// Express Session Middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// Passport Middleware make sure to load after express sessions
app.use(passport.initialize());
app.use(passport.session());
// HandleBars MiddleWare
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
// BodyParser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder.... public folder 
app.use(express.static(path.join(__dirname,'public')));

// Method overRide Middleware
app.use(methodOverride('_method'));

// Global Variables
app.use(function(req,res,next)
{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null; 
    next();
})
// Index Route
// Handling a GET request i.e going to a webpage
// A Post request is a update request like a webform, ie add videos
// delete request deletes stuff
app.get('/', (_req,res) => {
    const title = "Welcome";
    console.log(_req.name);
res.render('index',{title: title});
});
// About Route
app.get("/about", (_req,res) =>
{
    res.render("about");
});
// use routes
app.use("/ideas", ideas);
app.use("/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});
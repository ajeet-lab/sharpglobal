require('dotenv').config();
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// Database connection
mongoose.connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Database connected'))
    .catch((e) => console.log("Mongodb Errors", e));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MongoDB,
    })
}));


// SET TEMPLATE
app.use(express.static('public'));
app.use(expressLayout);
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());


app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.admin = req.admin;
    res.locals.hrUser = req.hrUser;
    res.locals.whereUser = req.whereUser;
    res.locals.gateEntry = req.gateEntry;
    res.locals.qcUser = req.qcUser;
    res.locals.data = req.flash("data");
    res.locals.success_msg = req.flash("success_msg");
    res.locals.warning_msg = req.flash("warning_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

app.use('/src/uploads', express.static('src/uploads'));
const AuthRouter = require('./routes/AuthRoute');
const UserRouter = require('./routes/UserRoute');
const HrRouter = require('./routes/HrRoute');
const AdminRouter = require("./routes/AdminRoute");
const GateKeeperRoute = require('./routes/GateKeeperRoute');
const WherehouseRoute = require("./routes/WherehouseRoute");
const QcRoute = require("./routes/QcRoute");
app.use('/', AuthRouter);
app.use('/gatekeeper', GateKeeperRoute);
app.use('/user', UserRouter);
app.use('/hr', HrRouter);
app.use('/wherehouse', WherehouseRoute);
app.use('/qc', QcRoute);
app.use('/admin', AdminRouter);

app.listen(PORT, () => console.log(`Server start at ${PORT}`));
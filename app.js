const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const rootDir = require('./util/path');
const authRoutes = require('./routes/auth');
const collegesRoutes = require('./routes/colleges');
const homeRoutes = require('./routes/home');
const schoolsRoutes = require('./routes/schools');
const teachersRoutes = require('./routes/teachers');

const app = express();
app.use(flash());

const MONGODB_URI = 'mongodb+srv://owner:owner@nodeapp-oke9f.mongodb.net/choosingSimplifid?retryWrites=true&w=majority';

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

app.use(session({
  secret:'nodeApp', 
  resave: false,
  saveUninitialized: false,
  store: store,
  })
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// setting up templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// telling server about public files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/data', express.static(path.join(rootDir, 'data')));

app.use('/auth',authRoutes);
app.use('/colleges',collegesRoutes);
app.use('/schools',schoolsRoutes);
app.use('/teachers',teachersRoutes);
app.use(homeRoutes);


mongoose.connect(MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true}) 
.then(connectionStatus => {
  console.log("CONNECTED!!!!!!!");
})
.then(result => {
  app.listen(9000);
})
.catch(err => {
  console.log(err); 
})

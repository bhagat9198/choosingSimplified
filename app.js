const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const rootDir = require('./util/path');
const authRoutes = require('./routes/auth');
const collegesRoutes = require('./routes/colleges');
const homeRoutes = require('./routes/home');
const schoolsRoutes = require('./routes/schools');
const teachersRoutes = require('./routes/teachers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// setting up templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// telling server about public files
app.use(express.static(path.join(rootDir, 'public')));

app.use('/auth',authRoutes);
app.use('/colleges',collegesRoutes);
app.use('/schools',schoolsRoutes);
app.use('/teachers',teachersRoutes);
app.use(homeRoutes);

app.listen(9000);
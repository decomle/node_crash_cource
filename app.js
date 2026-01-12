const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./src/routes/blog')

const app = express();

// Connect to mongodb
const dbURI = 'mongodb+srv://<username>:<password>@<mongo_atlas_user>.cbo12nk.mongodb.net/<db_name>?appName=decomle';
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db');
        app.listen(3000)
    })
    .catch((err) => {
        console.log('Unable to connect to the db', err)
    });

app.get('/single-blog', (req, res) => {
    Blog.findById('69637a4a07d48bf9030602bf')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log('ERROR', err)
        })
})

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'templates');

// Static middleware
app.use(express.static('static'))

// LOG middleware
app.use(morgan('dev'));

// url endcoded middleware
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/about-us', (req, res) => {
    res.redirect('/about')
});

app.use('/blogs', blogRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})
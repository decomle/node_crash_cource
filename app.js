const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./src/models/blog');

const app = express();

// Connect to mongodb
const dbURI = 'mongodb+srv://dat_relearn:Com3tom3now@decomle.cbo12nk.mongodb.net/decomle_relearn?appName=decomle';
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
app.set('view engine', 'ejs')
app.set('views', 'templates')

// Static middleware
app.use(express.static('static'))

// LOG middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createAt: -1})
        .then((results) => {
            res.render('index', {title: 'All blogs', blogs:     results})
        })
        .catch((err) => {
            console.log('ERROR', err)
        })
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.get('/blogs/create', (req, res) => {
    res.render('blog/create', {title: 'Crate new blog'})
})

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})
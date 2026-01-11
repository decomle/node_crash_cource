const express = require('express');
const path = require('path');

const app = express();

// register view engine
app.set('view engine', 'ejs')
app.set('views', 'templates')

app.listen(3000)

app.get('/', (req, res) => {
    const blogs = [
        {title: 'What the hell', snippet: 'Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker'},
        {title: 'Where am I', snippet: 'Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker'},
        {title: 'Why is it', snippet: 'Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker'},
    ]
    res.render('index', {title: 'Home', blogs});
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
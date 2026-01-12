const Blog = require('../models/blog');

const blog_index = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({createdAt: -1});
        res.render('blog/index', {title: 'All blogs', blogs})
    } catch(err) {
        console.log('ERROR', err);
    }
}

const blog_details = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('blog/details', {blog, title: 'Blog Details'})
    } catch(err) {
        console.log('ERROR', err);
        res.redirect('/404')
    }
}

const blog_create_get = (req, res) => {
    res.render('blog/create', {title: 'Crate new blog'})
}

const blog_create_post = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });

    try {
        const result = await blog.save();
        res.redirect('/')
    } catch(err) {
        console.log('ERROR', err)
    }
}

const blog_delete = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.json({
            successed: true,
            redirectUrl: '/blogs',
            blog
        });
    } catch(err) {
        console.log('ERROR', err);
        res.send({
            successed: false,
            message: 'Unable to delete blog'
        });
    }
}

module.exports = {blog_index, blog_details, blog_create_get, blog_create_post, blog_delete}
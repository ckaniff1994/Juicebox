const express = require('express');
const tagsRouter = express.Router();
const {getAllTags, getPostsByTagName} = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();
})

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    let {tagName} = req.params;

    newTagName = decodeURIComponent(tagName);

    try {

        const allPosts = await getPostsByTagName(newTagName);

        const posts = allPosts.filter(post => {
            return (post.active && (req.user && post.author.id === req.user.id));
        })
        

        res.send({posts: posts})

    } catch({name, message}) {
        next({
            name: 'TagByPostError',
            message: 'There was an error generating posts by tagName'
        });
    }
})

module.exports = tagsRouter;

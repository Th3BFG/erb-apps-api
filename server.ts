const express =  require('express');
const app = express();

app.route('/api/posts').get((req, res) => {
    // connect to DB
    // pull list of blogPosts
    // return
    console.log(req); // for testing.
    res.send({
        posts: [{id: '1', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 1', post_body: 'Test Body 1 with some content.'},
        {id: '2', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 2', post_body: 'Test Body 2 with some content.'},
        {id: '3', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 3', post_body: 'Test Body 3 with some content.'},
        {id: '4', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 4', post_body: 'Test Body 4 with some content.'},
        {id: '5', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 5', post_body: 'Test Body 5 with some content.'},
        {id: '6', date_posted: Date.now(), user: 'Ben', post_subject: 'Test Post 6', post_body: 'Test Body 6 with some content.'},
        ]
    });
});

app.listen(8000, () => {
    console.log('Server started!');
});

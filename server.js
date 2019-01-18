const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Setup CORS
const corsOptions = {
    origin: 'http://erbapps.com',
    optionsSuccessStatus: 200 // IE11, various SmartTVs choke on 204 
}
  
app.use(cors(corsOptions))
app.use(bodyParser.json());

// Setup Routes
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

app.route('/api/posts/:id').get((req, res) => {
    const requestPostId = req.params['id'];
    // TODO: Return actual post
    res.send({ id: requestPostId });
});

app.route('/api/posts').post((req, res) => {
    // TODO: Create post from request
    res.send(201, req.body);
});

app.route('/api/posts/:id').put((req, res) => {
    // TODO: modify post from request
    res.send(200, req.body);
});

app.route('/api/posts/:id').delete((req, res) => {
    // TODO: delete post from request
    res.send(204);
});

app.listen(8000, () => {
    console.log('Server started!');
});

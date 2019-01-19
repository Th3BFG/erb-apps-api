const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const blogRouter = require('./routers/blogRouter');

const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // IE11, various SmartTVs choke on 204 
}

// Setup Middleware
app.use(cors(corsOptions))
app.use(bodyParser.json());
// Routers
app.use('/api', blogRouter)

app.listen(8000, () => {
    console.log('Server started!');
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./configHandler');
const blogRouter = require('./routers/blogRouter');
const userRouter = require('./routers/userRouter');
const morgan = require('morgan');
const logger = require('./log/logger');

const app = express();

const corsOptions = {
    origin: global.gConfig.apiUrl,
    optionsSuccessStatus: 200 // IE11, various SmartTVs choke on 204 
}

// Setup Middleware
app.use(morgan('combined', { stream: logger.stream }));
app.use(cors(corsOptions))
app.use(bodyParser.json());
// Routers
app.use('/api', blogRouter)
app.use('/api', userRouter);

app.listen(8000, () => {
    logger.log({
        level: 'info',
        message: 'Server has started.'
    })
});

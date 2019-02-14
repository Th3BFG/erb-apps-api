const fs = require('fs');
const https = require('https');
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

if(process.env.NODE_ENV === 'production')
{
    const privateKey = fs.readFileSync(global.gConfig.privateKeyPath);
    const certificate = fs.readFileSync(global.gConfig.certificatePath);
    const ca = fs.readFileSync(global.gConfig.caPath, 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    }

    https.createServer(credentials, app).listen(8000, () => {
        logger.log({
            level: 'info',
            message: 'Server has started.'
        })
    });
}
else
{
    app.listen(8000, () => {
        logger.log({
            level: 'info',
            message: 'Development server has started.'
        })
    });
}

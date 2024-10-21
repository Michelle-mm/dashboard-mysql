const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./routers');
const { createTables } = require('./schemas');
const app = express();
// Initialize the tables when the server starts
createTables();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', router);

app.listen(3001, ()=>{
    console.log('server running...');
})
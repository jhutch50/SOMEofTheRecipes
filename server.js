import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/recipeRoutes';

const app = express();
const PORT = 3000;

//mongoose connection, uses promise to make connection
//and we don't wait for it
mongoose.Promise = global.Promise



//This is connecting to local server,
//but if you had an external server
//such as a cloud based server, like mLab, you
//would connect that here instead
mongoose.connect('mongodb://localhost/RECIPEdb', 
{   useNewUrlParser: true, 
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true })

//bodyParser setup for json definition
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public/images'));

//Logging in CLI
app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/recipeRoutes';

const app = express();
const PORT = 3000;

//mongoose connection, uses promise to make connection
//and we don't wait for it
mongoose.Promise = global.Promise



//PUT CONNECTION CREDENTIALS HERE, USE DOTENV FOR SECURITY PURPOSES OF PUTTING ON GIT, OR RUN LOCAL VARIABLE

//const uri = 'mongodb://localhost/RECIPEdb';
const DBUSERNAME = "guest";
const DBPASSWORD = "CandyCorn1234"
const uri = "mongodb+srv://"+DBUSERNAME+":"+DBPASSWORD+"@someoftherecipes-csi2x.mongodb.net/RECIPEdb";



mongoose.connect(
    uri,      {   useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true },
    function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        
    }

    
);

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
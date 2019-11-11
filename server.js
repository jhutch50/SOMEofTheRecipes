import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/recipeRoutes';
//for image uploads
var fs = require('fs');
var multer = require('multer');

const app = express();

//Use this for Local deployment
//const PORT = 3000;

//Use this for Heroku Deployment
const PORT = process.env.PORT || 80

//mongoose connection, uses promise to make connection
//and we don't wait for it
mongoose.Promise = global.Promise


//Use this for Local deployment
//const uri = 'mongodb://localhost/RECIPEdb';



//Use this for Heroku Deployment
//PUT CONNECTION CREDENTIALS HERE, USE DOTENV FOR SECURITY PURPOSES OF PUTTING ON GIT, OR RUN LOCAL VARIABLE
var dotenv = require('dotenv');
dotenv.config();
var uri = process.env.MONGOLAB_URI;


//Added for Heroku Deployment to ensure connections remain alive after timeout, common error
//with MongoDB and Heroku
var options = { 
    server: { 
      socketOptions: { 
        keepAlive: 300000, connectTimeoutMS: 30000 
      } 
    }, 
    replset: { 
      socketOptions: { 
        keepAlive: 300000, 
        connectTimeoutMS : 30000 
      } 
    } 
  };

mongoose.connect(
    uri, {   useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true },
    function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        
    },
    options

    
);

//bodyParser setup for json definition
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//used for storing images when uploaded
app.use(multer(
  { dest: './public/images',
  rename: function (fieldname, filename) {
    return filename;
  },
 }
 ));

routes(app);

//Logging in CLI
app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);


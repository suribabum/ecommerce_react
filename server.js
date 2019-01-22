import express from 'express';
import bodyParser from 'body-parser';

// import ejs from 'ejs';

const app = express();

const port = process.env.PORT || 4500;

// app.set('view engine',ejs);
app.use(express.static(__dirname + '/src/index.js'));
app.set('superSecret', "myscretekey123ecomerece"); // secret variable
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
require('./node-apis/user')(app);
require('./node-apis/phonesdata')(app);
app.listen(port, () => {
    console.log(`APP listning on port ${port}`);
})
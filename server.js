require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(morgan('[:date[web]] :method :url :status :res[content-length] - :response-time ms'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const punchRoute = require('./routes/punchRoute');

const port = process.env.PORT || 8000;
const dburl = `mongodb+srv://dbUser:${process.env.dbpassword}@timekeeper.iu6sg.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`;
// console.log(url);
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to ${dburl}`);
});

app.use(punchRoute);

app.listen(port, () => { console.log(`Server running at port ${port}`) });
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const CONSTANTS = require('./constants');
const router = require('./routes/index');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Todo Server is Running');
});

app.use('/api', router);

app.use((req, res) => {
    res.status(404).send('Route Does Not Exist');
});

app.listen(CONSTANTS.PORT, async () => {
    await mongoose.connect(CONSTANTS.MONGO_URL);
    console.log('Connected to DB');
    console.log(`Server is running at http://localhost:${CONSTANTS.PORT}`);
});

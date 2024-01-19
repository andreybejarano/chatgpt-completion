require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mainRoutes = require('./routes/main');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use('/', mainRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});

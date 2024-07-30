const express = require('express');
const app = express();
const cors = require('cors');
const Routes = require('./routes');
const port = 5000;

app.use(cors());
app.use(express.json());

// Try app.use('/')
app.use('/school', Routes)

app.listen(port, () => console.log(`app listening on port ${port}`));
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/routes');
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Try app.use('/')
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})
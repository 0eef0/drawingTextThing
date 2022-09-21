const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

app.listen(5000, () => {
    console.log('listening on port 5000')
})
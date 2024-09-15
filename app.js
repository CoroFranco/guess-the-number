const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));

app.post('/saveResult', (req, res) => {
    const result = req.body;

    fs.readFile(path.join(__dirname, 'results.json'), 'utf8', (err, data) => {
        
        console.log(data)
        if (err) {
            return res.status(500).send('Error reading results file');
        }

        let results = [];
        if (data) {
            results = JSON.parse(data);
        }
        results.push(result);


        fs.writeFile(path.join(__dirname, 'results.json'), JSON.stringify(results, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing results file');
            }
            res.send(results);
            
        });
    });
});


app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})
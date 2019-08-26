let express = require('express');
let app = express();
let fs = require('fs');
var count = 0;
app.use(express.json());
let arr = [];

app.post('/task', (req, res) => {
    const obj = {
        name: req.body.name,
        mob: req.body.mob,
        add: req.body.add
    }

    if (count == 0) {
        let data = Object.keys(obj); count++;
        fs.appendFile('message1.csv', `${data.join(",")}\n`, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        })

    }
    else {

        let data = Object.values(obj);
        //arr.push(data);
        fs.appendFile('message1.csv', `${data.join(",")}\n`, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    }
    res.send(JSON.stringify(arr));
})
app.listen(9000, () => {
    console.log('server started');
})
let express = require('express');
let app = express();
let myData = [{ name: "abhishek tiwari", id: 1, address: "Noida", age: 25 },
{ name: "tiwari", id: 1, address: "USA", age: 250 },
{ name: "kushal tiwari", id: 1, address: "delhi", age: 26 },
{ name: "raj tiwari", id: 1, address: "Noida", age: 27 },
{ name: "archana tiwari", id: 4, address: "gurugram", age: 28 },
{ name: "prince tiwari", id: 5, address: "Noida", age: 29 },]
app.use(express.json());
app.use('/:id', (req, res, next) => {
    let data = req.params.id;
    let count = 0;
    var arr = [];
    myData.forEach(Element => {
        // console.log(Element);
        if (data == Element.id) {
            arr.push(Element);
            count++;
            // res.send();
        }
    });
    if (count == 0) {
        res.status(404).send('data not found');
    }
    else {
        res.send(arr);
    }
});
app.listen(5000, () => {
    console.log('server started....')
});
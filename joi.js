let express = require('express');
//var BodyParser = require('body-parser');
var validator = require('express-joi-validator');
var Joi = require('joi');
var app = express();

app.use(express.json());
const data = {
    name: Joi.string().required(),
    id: Joi.number().min(10).max(100).required(),

}
// Joi.validate({ name: 'raj', id: 25 }, data, (err, value) => {
//     if (err) console.log('error');
//     else console.log('data validated');

// })
app.get('/', (req, res) => {
    name = req.query.name,
        id = req.query.id,

        Joi.validate({ name, id }, data, (err, value) => {
            if (err) res.send('error');
            else res.send('value validated in get method');
        })
})
app.post('/', (req, res) => {

    name = req.body.name;
    id = req.body.id

    Joi.validate({ name, id }, data, (err, value) => {
        if (err) res.send('error posted data');
        else res.send('value validatad');
    })

})

// app.use(function (err, req, res, next) {
//     if (err) {
//         return res.status(err.output.statusCode).json(err.output.payload);

//     }
// })
app.listen(5000, () => {
    console.log('server connected')
});
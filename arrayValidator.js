var Express = require('express');
var BodyParser = require('body-parser');
var validator = require('express-joi-validator');
var Joi = require('joi');

var app = Express();
app.use(BodyParser.json());

let empData = [
    { name: 'abhishek', phone: 8400444064, empId: "AI792" },
    { name: 'raj', phone: 8400444064, empId: "AI792" },
    { name: 'deepak', phone: 8400444065, empId: "AI793" },
    { name: 'kushal', phone: 8400444066, empId: "AI794" },
    { name: 'pankaj', phone: 840044406799999, empId: "AI795" },
    { name: 'deelip', phone: 8400444068, empId: "AI796" },
    { name: 'neeraj', phone: 8400444069, empId: "AI797" },
    { name: 'shubham', phone: 8400444070, empId: "AI798" }
];
var data = Joi.object().keys(
    {
        name: Joi.string().required(),
        phone: Joi.number().min(100).max(9999999999).required(),
        empId: Joi.string().required()
    })

const result = data.validate({ name: '123', phone: 800, empId: "AI792" });
if (!result.error) {
    console.log('data validated');
}

else {
    console.log('error')
}
//array valiation using for each
// empData.forEach(element => {
//     Joi.validate(element, data, (err, value) => {
//         if (err) console.log('err generated')
//         else console.log('data validated');
//     })
// })


// console.log(result);
// app.get('/', (req, res, next) => {
//     if (result) res.send('data validataed');
// })
// app.use(function (err, req, res, next) {
//     if (err) {
//         return res.status(500).json({ message: "error" });

//     }

// });
// // res.send('Done!')
// app.listen(9000, () => {
//     console.log('server connected........')
// });

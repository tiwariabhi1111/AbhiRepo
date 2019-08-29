var Express = require('express');
var BodyParser = require('body-parser');
var validator = require('express-joi-validator');
var Joi = require('joi');

var app = Express();
app.use(BodyParser.json());


var querySchema = {
    query: {
        limit: Joi.number().default(10).min(10).max(100),
        offset: Joi.number().default(10).min(10).max(1000)
    }
};

app.get('/', validator(querySchema), function (req, res, next) {
    res.send('limit and offset validated');

});



var Schema = {
    body: {
        name: Joi.string().required(),
        phone: Joi.number().required().min(10).max(9999999999)
    }
};

app.post('/', validator(Schema), function (req, res, next) {
    res.send('name and phone validated')

});

app.use(function (err, req, res, next) {
    if (err) {
        return res.status(err.output.statusCode).json(err.output.payload);

    }

});
app.listen(8000, () => {
    console.log('server connected')
});
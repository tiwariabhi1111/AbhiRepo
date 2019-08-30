let express = require('express');
//var BodyParser = require('body-parser');
//var validator = require('express-joi-validator');
var Joi = require('joi');
var app = express();
app.use(express.json());
userRegisterData = [];
//user registered validation
const userRegister = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    phoneNumber: Joi.number().min(100000000).max(9999999999).required()
})
// //router for userRegister
app.post('/register', (req, res) => {
    email = req.body.email,
        password = req.body.password,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        phoneNumber = req.body.phoneNumber
    //validation of user
    Joi.validate(req.body, userRegister, (err, data) => {
        if (err) res.send('you entered a invalid data');
        else {
            let check = 0;
            userRegisterData.forEach(element => {
                if (email == element.email) {
                    check = 1
                    res.send('user already exist!!please enter different email id ');

                }
            })
            if (check == 0) {
                userRegisterData.push(data);
                console.log(userRegisterData);
                res.send('you have successfully registered');
            }
        }
    });
});

//user login
let loginData = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}
)
app.get('/login', (req, res) => {
    //email = req.query.email,
    //password = req.query.password,
    Joi.validate(req.query, loginData, (err, data) => {
        if (err) res.send('invalid format......');
        else {
            var checkdata = 0;
            userRegisterData.forEach(element => {
                if (element.email == email && element.password == password) {
                    checkdata = 1;
                    //res.send('you have successfully login...');
                }
            })

            if (checkdata == 0) res.send('invalid your email and password')
            else res.end('you have successfully login....')
        }
    })
    res.send(password);

})
app.listen(9000, () => {
    console.log('server connected .....');
});
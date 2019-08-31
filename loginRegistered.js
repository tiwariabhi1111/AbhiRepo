let express = require('express');
//var BodyParser = require('body-parser');
//var validator = require('express-joi-validator');
var Joi = require('joi');
const jwt = require('jsonwebtoken');
var app = express();
app.use(express.json());
var userRegisterData = [];
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


    //validation of user
    Joi.validate(req.body, userRegister, (err, data) => {
        if (err) res.send('you entered a invalid data');
        else {
            let check = 0;
            userRegisterData.forEach(element => {
                if (req.body.email == element.email) {
                    check = 1
                    res.send('user already exist!!please enter different email id ');

                }
            })
            if (check == 0) {

                let password = req.body.password

                try {
                    var token = jwt.sign({ password }, "privateKey", { algorithm: 'HS256' });
                    data.password = token;
                    userRegisterData.push(data);
                }
                catch (e) {
                    res.send("error in jwt sign");
                }
                res.send(userRegisterData);

            }

        }
    });
    //console.log(userRegisterData);
    res.send('data entered');
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

            // password = req.query.password;
            // jwt.sign({ user: password }, 'secretkey', (err, token) => {
            //     tokenPassword = token;
            //     //res.json({ password })
            // })
            let tokenPassword = req.query.password

            try {
                var token = jwt.sign({ tokenPassword }, "privateKey", { algorithm: 'HS256' });
                tokenPassword = token;

            }
            catch (e) {
                res.send("error in jwt sign");
            }
            var checkdata = 0;
            userRegisterData.forEach(element => {
                if (element.email == email && element.password == tokenPassword) {
                    checkdata = 1;
                    //res.send('you have successfully login...');
                }
            })

            if (checkdata == 0) res.send('invalid your email and password')
            else res.end('you have successfully login....')
        }
    })


})
app.listen(8000, () => {
    console.log('server connected .....');
});
let express = require('express');
 
var Joi = require('joi');
var MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
var app = express();
app.use(express.json());
 
const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.number().min(100000000).max(9999999999).required()
})
// //router for userRegister
app.post('/register', (req, res) => {

    Joi.validate(req.body, userSchema, (err, data) => {
        if (err) res.send('you entered a invalid data');
        else {
            
            user = {
                email: req.body.email,
                password: req.body.password
            }
            try {

                MongoClient.connect("mongodb://localhost:27017", async (err, db) => {
                    var flag = 0;
                    if (err) throw err;
                    else {
                        console.log('database connected......');
                        let flag = 0;
                        await db.db('userDatabase').collection('userDetails').find().forEach((element) => {
                            
                            if (user.email == element.email) {
                                flag = 1
                            }
                        });
                        if (flag === 1) {
                            res.send('Email alreay registered');

                        }
                        else {

                            try {
                                
                                MongoClient.connect("mongodb://localhost:27017", async (err, db) => {

                                    if (err) throw err;
                                    else {


                                        let data1 = await db.db('userDatabase').collection('userDetails').insert(data);
                                        res.send('successfully registered');
                                    }
                                });

                            }
                            catch (e) {
                                res.send("error in jwt sign");
                            }
                        }
                    }
                });

            }
            catch (e) {
                res.send("error in jwt sign");
            }




        }
    });
})
// //user login
let loginData = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}
)
app.post('/login', (req, res) => {
 

    let loginData = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        MongoClient.connect("mongodb://localhost:27017", async (err, db) => {
            var flag = 0;
            if (err) throw err;
            else {
                let flag = 0
                loginEmail = req.body.email;
                loginPassword = req.body.password
                data = await db.db('userDatabase').collection('userDetails').find().forEach(element => {
                    if (element.email == loginEmail && element.password == loginPassword)
                        flag = 1;
                });
                if (flag == 1) {
                    jwt.sign(loginData, 'secretkey', (err, token) => {

                        if (!err) res.json({ token });
                    }
                    )
                }
                else res.send('invalid your email or password');
            } //console.log((element));
        });
    }
    catch (e) {
        res.send("error in jwt sign");
    }
});
app.post('/validate', (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const tokenBearer = bearer[1];
        req.token = tokenBearer;
        next();
    }
    else {
        res.sendStatus(403);
    }
}, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, data) => {
        if (err) res.sendStatus(403)
        else {
            res.json({
                msg: "you are successfully login",
                data: data
            })
        }
    })

})

app.listen(8000, () => {
    console.log('server connected .....');
});

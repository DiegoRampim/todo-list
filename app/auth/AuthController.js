const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');

const User = require('../service/User');


module.exports = function (app) {

    app.post('/register', (req, res) => {

        let user = new User(req.body);

        user.password = bcrypt.hashSync(user.password, 8);

        user.save((err, result) => {

            if (err) {
                res.status(500).send("There was a problem registering the user.");
                return;
            }

            res.status(200).send(result);

        });

    });


    app.post('/login', (req, res) => {

        User.findOne({email: req.body.email}, (err, user) => {

            if (err) {
                res.status(500).send("Error on the server");
                return;
            }

            if (!user) {
                res.status(404).send("No user found.");
                return;
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                res.status(401).send({auth: false, token: null});
                return;
            }

            let token = jwt.sign({id: user._id}, keys.secret, {
                expiresIn: 86400
            });

            res.status(200).send({auth: true, token});

        });

    });


}
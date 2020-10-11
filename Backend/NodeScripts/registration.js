const UserSchema = require('../DatabaseModels/SignInModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    async registration(req, res) {
        console.log("inside registration");
        console.log("registration request", req.body);
        try {
            let customdata = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            await UserSchema.findOne({ email: req.body.email },async function (err, result) {
                if (err) {
                    res.status(500).send({ message: err });
                }
                if (result) {
                    return res.json({ message: "Failed! Email is already in use!", result: "failed" });
                }
                else {
                    await bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            console.log("hash",hash)
                            customdata.password = hash;
                            
                            UserSchema.create(customdata, (err, result) => {
                                let token = generateLoginToken(result);
        
                                function generateLoginToken(user) {
                                    let data = {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email,
                                    };
                                    return jwt.sign(data, 'amazonclone-secret-key');
                                }
        
                                console.log("here is token:", token);
                                return res.json({ message: "Registration Succesful", result: "success", token: token });
                            });
                        });
                    });
                    console.log("custom", customdata)
                   


                }
            })
        }
        catch (ex) {
            return utility.sendServerError(ex, res, req);
        }
    }

}
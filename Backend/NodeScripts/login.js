const UserSchema = require('../DatabaseModels/SignInModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    async login(req, res) {
        console.log("inside login");
        console.log("login request", req.body);
        try {

            await UserSchema.findOne({ email: req.body.email }, function (err, result) {
                if (err) {
                    console.log(err)
                }
                else if (result == null || result == undefined) {
                    return res.json({ message: "Email id is not Registered", result: "failed" });
                }
                else {
                    bcrypt.compare(req.body.password, result.password, function (err, resultpassword) {
                        // result == true
                        if (resultpassword == false) {
                            return res.json({ message: "Invalid Pasword", result: "failed" });
                        }
                        else {
                            let token = generateLoginToken(result);

                            function generateLoginToken(user) {
                                let data = {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                };
                                return jwt.sign(data, 'amazonclone-secret-key');
                            }

                            console.log("here is database data:", result);
                            console.log("here is token:", token);
                            return res.json({ message: "Login Successful", result: "success", userdata: result, token: token });
                        }
                    });

                }
            })
        }
        catch (ex) {
            return utility.sendServerError(ex, res, req);
        }
    },
    async TokenVerify(req, res) {
        let isVerifiedToken = await verifyJWTToken(req.body.foundUserToken)

        function verifyJWTToken(token) {
            return jwt.verify(token, 'amazonclone-secret-key');
        }

        console.log("verified:", isVerifiedToken);
        return res.json({ token: isVerifiedToken });
    }
}
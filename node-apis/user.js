

module.exports = (app) => {

    //login
    app.get('/userlogin', (req, res) => {
        let { username, password } = req.body;
        if (username && password) {
            if (username === "user" && password === "user") {
                var token = jwt.sign({ username: "user" }, app.get('superSecret'), {
                    expiresIn: 7200 // expires in 2 hours
                });
                res.status(200).json({ "msg": "success", "result": "Login Success", data: { "token": token, "user": { username: "user" } } });
            }
            else {
                res.status(401).json({ msg: "failed", "result": "Login Failed", data: "Wrong username or password" });
            }
        }
        else {
            res.status(400).json({ "msg": "Please enter username and password", "result": "Login Failed", });
        }
    });

    //verify token
    app.get('/checkuserlogin', verifyToken, (req, res) => {
        res.status(200).json({ msg: "success", data: "valid token" });
    });
}

function verifyToken(req, res, next) {
    var token;
    console.log("verify...", req.headers)


    token = req.headers.token;

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secretekey, function (err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

        next();
    });

}


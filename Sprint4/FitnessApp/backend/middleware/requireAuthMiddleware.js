const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    //verify token
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET); // returning _id from the payload

        // attaching user property to request object, so when accessing any function in 
        // routes, the user property will be present there
        req.user = await User.findOne({ _id }).select('_id');
        // this req.user will return only the _id property of user who is currently logged in, and not all properties
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Invalid authorization token" })
    }

}

module.exports = requireAuth; 
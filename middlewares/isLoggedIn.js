const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model'); // Adjust the path as necessary

module.exports = async function(req, res, next) {
    // Check if the token cookie is present
    if (!req.cookies.token) {
        req.flash("error", "First login!!!");
        return res.redirect("/");
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(req.cookies.token, "secret");

        // Find the user by the email decoded from the token, excluding the password
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        // Handle errors (e.g., token verification failure, database errors)
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
    }
};

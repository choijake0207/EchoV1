const {verify} = require("jsonwebtoken")

const validateAccessToken = (req, res, next) => {
    const token = req.header("accessToken") // extract accessToken from request headers
    if (!token) { // check token exists
        return res.status(401).json({error: "You Must Be Logged In"})
    }
    try {
        const validToken = verify(token, "supersecretkey") // extracts verified payload
        req.user = validToken // assign verified payload to user
        if (validToken) { 
            return next() // calls next function
        }
    } catch (error) {
        return res.status(401).json({error: "User Not Logged In"})
    }
}

// middleware authorize used to verify that all requests are coming from logged in user
import jwt from 'jsonwebtoken'
// Middleware to authenticate user token
const authUser = async (req, resizeBy, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return resizeBy.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        const token_decoded = jwt.verify(token, process.env.jwtSecret);
        req.body.userId = token_decoded.id;      
        // Proceed to next middleware
        next()
    } catch (error) {
        console.log("Auth Error:", error);
        res.json({ success: false, message: error.message })
    }
}

export default authUser;

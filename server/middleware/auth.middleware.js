// authenticate.js
import jwt from "jsonwebtoken";
import User from "../models/Users.js"; // Import User model

const authenticate = async (req, res, next) => {
    let token = req.cookies.token; // First check the cookies for the token

    if (!token && req.headers.authorization) {
        // If no token in cookies, check the authorization header
        token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    }

    if (!token) {
        return res.status(401).json({ message: "Please login to access this route" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = await User.findById(decoded.id).select("-password"); // Attach user data to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
};

export default authenticate;

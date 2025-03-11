const jwt = require("jsonwebtoken");
const logger = require("./logger");

const generateAccessToken = (userId) => {
    const accessToken = jwt.sign(
        { userId }, 
        process.env.JWT_ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });

    /*
    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_TOKEN_SECRET, 
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN });

    return { accessToken, refreshToken };
    */

    return accessToken;
  };

const decodeToken = (token) => {
    let userId = "";
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return "";

        userId = decoded.userId;
    });

    return userId;
}

module.exports = { generateAccessToken, decodeToken };
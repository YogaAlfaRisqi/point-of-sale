
const ApiError = require("./ApiError");
const jwt = require(`jsonwebtoken`);

// Generate Access Token
const  generateAccessToken = (payload) =>{
    try{
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{
            expiresIn: process.env.JWT_ACCESS_EX,
            algorithm: 'HS256',
        });
    }catch(error){
        throw new ApiError(500, 'Failed to generate access token');
    }
}

// Generate Refresh Token
const  generateRefreshToken = (payload) =>{
    try{
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{
            expiresIn: process.env.JWT_ACCESS_EX,
            algorithm: 'HS256',
        });
    }catch(error){
        throw new ApiError(500, 'Failed to generate access token');
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}
   

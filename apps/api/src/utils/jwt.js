const ApiError = require("./ApiError");
const jwt = require(`jsonwebtoken`);

// Generate Access Token
const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EX || "15m",
      algorithm: "HS256",
    });
  } catch (error) {
    throw new ApiError(500, "Failed to generate access token");
  }
};

// Generate Refresh Token
const generateRefreshToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EX || "7d",
      algorithm: "HS256",
    });
  } catch (error) {
    throw new ApiError(500, "Failed to generate Refresh token");
  }
};

// Verify Access Token
const verifyAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader && authHeader.split(" ")[1];

    const cookieToken = req.cookies?.accessToken;

    const token = bearerToken || cookieToken;

    if (!token) {
      throw new ApiError(401, "Missing access token");
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
};

// Verify Refresh Token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
};

//  Decode Token (tanpa verifikasi)
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
};

// Refresh Token Handler
const refreshTokens = (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  const payload = { id: decoded.id, email: decoded.email, role: decoded.role };
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  refreshTokens,
};

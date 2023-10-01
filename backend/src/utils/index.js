import jwt from "jsonwebtoken";

export const generateAccessToken = (user) =>
    jwt.sign({ id: user._id, password: user.password }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });

export const generateRefreshToken = (user) =>
    jwt.sign({ id: user._id, password: user.password }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "7d" });

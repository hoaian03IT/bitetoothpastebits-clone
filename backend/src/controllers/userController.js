import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/index.js";

class UserClass {
    // [post] /register
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);

            const checkUser = await userModel.findOne({ email });

            if (checkUser) return res.status(403).json("Email existed");

            const newUser = await userModel.create({ email, password: hashPassword });

            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);

            res.status(200).json({
                id: newUser._id,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                accessToken,
                refreshToken,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // [post] /login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userLogin = await userModel.findOne({ email });

            if (!userLogin) res.status(403).json("Email not exist");

            const isMatchPassword = await bcrypt.compare(password, userLogin.password);

            if (!isMatchPassword) res.status(403).json("Password not correct");

            const accessToken = generateAccessToken(userLogin);
            const refreshToken = generateRefreshToken(userLogin);
            res.status(200).json({
                id: userLogin._id,
                email: userLogin.email,
                isAdmin: userLogin.isAdmin,
                accessToken,
                refreshToken,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // [post] /refresh-token
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) res.status(403).json("Register or Login!");

            jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
                if (err) return res.status(403).json({ msg: "Register or Login!" });
                const accessToken = generateAccessToken({ id: user.id });
                res.status(200).json({ user: { ...user, password: null }, accessToken });
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // [delete] /delete-all
    async deleteAll(req, res) {
        try {
            await userModel.deleteMany();
            res.status(200).json("Deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const userController = new UserClass();

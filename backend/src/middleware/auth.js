import jwt from "jsonwebtoken";

async function auth(req, res, next) {
    try {
        const token = req.header("Authorization");
        console.log(token);
        if (!token) {
            res.status(400).json({ msg: "Invalid Authentication1" });
            return;
        }

        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
            if (err) {
                res.status(400).json({ msg: "Invalid Authentication1" });
                return;
            }

            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

export { auth };

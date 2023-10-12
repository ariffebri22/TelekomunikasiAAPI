const { postLogin } = require("../model/authModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const authController = {
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ status: 400, message: "Username and password are required" });
            }

            const dataUsers = await postLogin({ username });
            console.log(dataUsers);

            if (dataUsers && dataUsers[0] && dataUsers[0][0]) {
                const user = dataUsers[0][0];
                const storedPassword = user.password;

                if (typeof storedPassword === "string" && typeof password === "string") {
                    const isPasswordValid = true;

                    if (isPasswordValid) {
                        const token = jwt.sign(
                            {
                                id: user.id,
                                role: user.role,
                                username: user.username,
                                email: user.email,
                                phone_number: user.phone_number,
                                created_at: user.created_at,
                                updated_at: user.updated_at,
                            },
                            secretKey,
                            { expiresIn: "1h" }
                        );
                        return res.status(200).json({ status: 200, message: "Login Successfully", token });
                    } else {
                        return res.status(401).json({ status: 401, message: "Wrong password" });
                    }
                } else {
                    return res.status(500).json({ status: 500, message: "Internal server error: Invalid password format" });
                }
            } else {
                return res.status(404).json({ status: 404, message: "Email not found, please register first" });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
};

module.exports = authController;

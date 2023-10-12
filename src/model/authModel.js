const Pool = require("../config/db");

const postLogin = async (data) => {
    const { username } = data;
    console.log("model postLogin");
    try {
        const queryString = "SELECT * FROM users WHERE username = ?";
        const values = [username];

        const result = await Pool.query(queryString, values);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    postLogin,
};

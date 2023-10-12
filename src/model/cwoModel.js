const Pool = require("../config/db");

const postCWO = async (data) => {
    const { incident_id, status_ticket, status_wo } = data;
    console.log("model postCWO");
    try {
        const queryString = `INSERT INTO cwo(incident_id, status_ticket, status_wo) 
        VALUES(?, ?, ?)`;
        const values = [incident_id, status_ticket, status_wo];

        const result = await Pool.query(queryString, values);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { postCWO };

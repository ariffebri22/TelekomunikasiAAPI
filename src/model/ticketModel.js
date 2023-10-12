const Pool = require("../config/db");

const postTicket = async (data) => {
    const { incident_id, title, description, status, users_id } = data;
    console.log("model postTicket");
    try {
        const queryString = `INSERT INTO tickets(incident_id, title, description, status, users_id) 
        VALUES(?, ?, ?, ?, ?)`;
        const values = [incident_id, title, description, status, users_id];

        const result = await Pool.query(queryString, values);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const postIncident = async (data) => {
    const { title, description, status, users_id } = data;
    console.log("model postIncident");
    try {
        const queryString = `INSERT INTO incidents(title, description, status, users_id) 
        VALUES(?, ?, ?, ?)`;
        const values = [title, description, status, users_id];

        const result = await Pool.query(queryString, values);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getIncident = async (id) => {
    console.log("model getIncident", id);
    try {
        const queryString = "SELECT * FROM incidents WHERE id = ?";
        const values = [id];

        const result = await Pool.query(queryString, values);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getTicket = async (id) => {
    console.log("model getTicket", id);
    try {
        const queryString = "SELECT * FROM tickets WHERE id = ?";
        const values = [id];

        const result = await Pool.query(queryString, values);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    postTicket,
    postIncident,
    getIncident,
    getTicket,
};

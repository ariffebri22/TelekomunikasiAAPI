const jwt_decode = require("jwt-decode");
const { postIncident, postTicket, getIncident } = require("../model/ticketModel");

const ticketController = {
    postDataIncident: async (req, res, next) => {
        try {
            const { title, description } = req.body;

            if (!title || !description) {
                return res.status(400).json({ status: 400, message: "Input title and description are required" });
            }

            const { id: users_id } = jwt_decode(req.headers.authorization.split(" ")[1]);

            const incidentData = {
                title,
                description,
                status: "OPEN",
                users_id,
            };

            const incidentResult = await postIncident(incidentData);
            console.log(incidentResult);

            return res.status(200).json({ status: 200, message: "Complaint has been received, thank you", incidentData });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Something went wrong" });
        }
    },
    postDataTicket: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ status: 400, message: "Input id is required" });
            }

            const incident = await getIncident(id);
            console.log(id);

            if (!incident || incident.length === 0) {
                return res.status(500).json({ status: 500, message: "Failed to retrieve incident data" });
            }

            const ticketData = {
                incident_id: incident[0][0].id,
                title: incident[0][0].title,
                description: incident[0][0].description,
                status: "OPEN",
                users_id: incident[0][0].users_id,
                created_at: incident[0][0].created_at,
            };

            const ticketResult = await postTicket(ticketData);

            return res.status(200).json({ status: 200, message: "Ticket has been created, thank you", ticketData });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Something went wrong" });
        }
    },
};

module.exports = ticketController;

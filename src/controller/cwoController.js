const { postCWO } = require("../model/cwoModel");
const { getTicket } = require("../model/ticketModel");

const cwoController = {
    postData: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ status: 400, message: "Input id is required" });
            }

            const cwo = await getTicket(id);
            console.log(id);
            console.log("ini data cwo", cwo);

            if (!cwo || cwo.length === 0) {
                return res.status(500).json({ status: 500, message: "Failed to retrieve cwo data" });
            }

            const cwoData = {
                incident_id: cwo[0][0].id,
                status_ticket: "SUBMITTED",
                status_wo: "OPEN",
            };

            const cwoResult = await postCWO(cwoData);

            return res.status(200).json({ status: 200, message: "Create Work Order has been created, thank you", cwoData });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Something went wrong" });
        }
    },
};

module.exports = cwoController;

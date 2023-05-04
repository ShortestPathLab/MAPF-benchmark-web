const db = require("../models");
const Solution_path = db.solution_paths;

exports.find_path = (req, res) => {
    const id = req.params.id;
    Solution_path.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
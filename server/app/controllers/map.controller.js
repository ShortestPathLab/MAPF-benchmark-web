const db = require("../models");
const Map = db.maps;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Map.find({}).sort({map_type :1})
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

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Map.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Map with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Map with id=" + id });
        });
};
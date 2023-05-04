const db = require("../models");
const Scenario = db.scenarios;
const ObjectId = db.ObjectId;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Scenario.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instances."
            });
        });
};



exports.findByMap_id = (req, res) => {
    const id = req.params.id;
    Scenario.find({map_id : id}).sort({scen_type:1})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instances."
            });
        });
};

exports.findByMap_id_Map_type = (req, res) => {
    const id = req.params.id;
    const type = req.params.scen_type;
    Scenario.find({map_id : id, scen_type : type})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instances"
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    Scenario.find({_id : id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instances."
            });
        });
};

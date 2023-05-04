const db = require("../models");
const mongoose = require("mongoose");
const Algorithm = db.algorithms;
const Instance = db.instances;
const Solution_path = db.solution_paths;
const Map = db.maps;
const Scenario = db.scenarios;
const Submission = db.submissions;
const { authJwt } = require("../middlewares");
const {ObjectID: ObjectId} = require("mongodb");
// database changed. we had to insert agents and scen_id in submission
// database changed. we need to insert path to solution_path, but keep solution_path_id in instance.

exports.findSubmittedAlgoByID = (req, res) => {
    const id = req.params.id;
    Algorithm.find({user_id: id},{})
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


exports.updateAlgoByID = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    Algorithm.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Algorithm with id=${id}. Maybe  Algorithm was not found!`
                });
            } else res.send({ message: " Algorithm was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating  Algorithm with id=" + id
            });
        });

};


exports.checkAlgoExist = (req, res) => {
    console.log('here');
    console.log(req.params.id);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    console.log('here');
    const id = req.params.id;
    if(id === '-1'){
        Algorithm.findOne({"algo_name": req.body.algo_name})
            .then(data => {
                if (data === null) {
                    res.status(200).send({
                        message: "valid name"
                    });
                } else {
                    res.status(404).send({
                        message: `Cannot update Algorithm with id=${id}. Maybe  Algorithm was not found!`
                    });
                }
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: err
            });
        });
    }else {

        Algorithm.findOne({"_id": {"$ne": id}, "algo_name": req.body.algo_name})
            .then(data => {
                if (data === null) {
                    res.status(200).send({
                        message: "valid name"
                    });
                } else {
                    res.status(404).send({
                        message: `Cannot update Algorithm with id=${id}. Maybe  Algorithm was not found!`
                    });
                }
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: err
            });
        });
    }
};


exports.checkAlgoExist = (req, res) => {
    console.log('here');
    console.log(req.params.id);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    console.log('here');
    const id = req.params.id;
    if(id === '-1'){
        Algorithm.findOne({"algo_name": req.body.algo_name})
            .then(data => {
                if (data === null) {
                    res.status(200).send({
                        message: "valid name"
                    });
                } else {
                    res.status(404).send({
                        message: `Cannot update Algorithm with id=${id}. Maybe  Algorithm was not found!`
                    });
                }
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: err
            });
        });
    }else {

        Algorithm.findOne({"_id": {"$ne": id}, "algo_name": req.body.algo_name})
            .then(data => {
                if (data === null) {
                    res.status(200).send({
                        message: "valid name"
                    });
                } else {
                    res.status(404).send({
                        message: `Cannot update Algorithm with id=${id}. Maybe  Algorithm was not found!`
                    });
                }
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                message: err
            });
        });
    }
};



exports.createAlgo = (req, res) => {
    // Validate request
    if (!req.body.algo_name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const algo = new Algorithm({
        algo_name: req.body.algo_name,
        authors: req.body.authors,
        papers: req.body.papers,
        github: req.body.github,
        comments: req.body.comments,
        user_id: req.body.user_id,
        best_lower: 0,
        best_solution: 0,
        instances_closed: 0
    });
    // Save Tutorial in the database
    console.log(algo)
   algo.save(algo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Algorithm."
            });
        });
};


exports.getMapSubmittedInfo = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    var query1 = Map.find({}).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Algorithm."
            });
        });


    var query2 = Submission.aggregate(
        [
            {$match : { algo_id : id , best_lower: true }},
            {
                $group: {
                    _id: {"map_id": "$map_id"},
                    count: { $count: { } }
                }
            }
        ]
    ).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Algorithm."
            });
        });

    var query3 = Submission.aggregate(
        [
            {$match : { algo_id : id , best_solution: true }},
            {
                $group: {
                    _id: {"map_id": "$map_id"},
                    count: { $count: { } }
                }
            }
        ]
    ).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Algorithm."
            });
        });


    var query4 = Submission.aggregate(
        [
            {$match : { algo_id : id , $expr: { $ne: [ "$solution_cost", null] } }},
            {
                $group: {
                    _id: {"map_id": "$map_id"},
                    count: { $count: { } }
                }
            }
        ]
    ).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Algorithm."
            });
        });

    var query5 = Submission.aggregate(
        [
            {$match : { algo_id : id , $expr: { $eq: [ "$lower_cost", "$solution_cost"] } }},
            {
                $group: {
                    _id: {"map_id": "$map_id"},
                    count: { $count: { } }
                }
            }
        ]
    ).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Algorithm."
            });
        });
    //
    // map_name: '$_id.map_name',
    //     map_size: '$_id.map_size',
    //     map_type: '$_id.map_type',
    //     scens: '$_id.scens',
    //     instances: '$_id.instances',
    //     best_lower: "$best_lower",
    //     best_solution: "$best_solution",
    //     closed: "$closed",
    //     solved: "$solved",
    //     counter: "$counter"
    Promise.all([ query1,query2,query3,query4,query5]).then(result => {
            var map_info ={}
            result[0].forEach(function (element) {
                map_info[element.id] = {};
                map_info[element.id].map_name = element.map_name;
                map_info[element.id].map_size = element.map_size;
                map_info[element.id].map_type = element.map_type;
                map_info[element.id].scens = element.scens;
                map_info[element.id].instances = element.instances;
                map_info[element.id].best_solution = 0;
                map_info[element.id].best_lower = 0;
                map_info[element.id].closed = 0;
                map_info[element.id].solved = 0;
            })
            result[1].forEach(function (element) {
                map_info[element._id.map_id].best_lower = element.count;
            })
            result[2].forEach(function (element) {
                map_info[element._id.map_id].best_solution = element.count;
            })
            result[3].forEach(function (element) {
                map_info[element._id.map_id].solved = element.count;
            })
            result[4].forEach(function (element) {
                map_info[element._id.map_id].closed = element.count;
            })
            var final_results = []
            for (const key in map_info) {
                final_results.push(map_info[key])
            }
            res.send(final_results);
        }
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    });

    // Map.aggregate(
    //     [
    //         {
    //             $lookup: {
    //                 from: "submissions",
    //                 let: {map_id: "$_id"},
    //                 pipeline: [
    //                     {
    //                         $match: {
    //                             $expr:
    //                                 { $and:
    //                                         [
    //                                             { $eq: ["$$map_id","$map_id"]},
    //                                             { $eq: ["$algo_id",id]}
    //                                         ]
    //                                 }
    //                         }
    //                     }
    //                 ],
    //                 as: "submissions"
    //             }
    //         },
    //         {$unwind: {"path":"$submissions","preserveNullAndEmptyArrays": true}},
    //         {
    //             $project: {
    //                 map_name: '$map_name',
    //                 map_size: '$map_size',
    //                 map_type: '$map_type',
    //                 scens: '$scens',
    //                 instances: '$instances',
    //                 best_lower: {  // Set to 1 if value < 10
    //                     $cond: [ { $eq: ["$submissions.best_lower", true ] }, 1, 0]
    //                 },
    //                 best_solution: {  // Set to 1 if value > 10
    //                     $cond: [ { $eq: [ "$submissions.best_solution", true ] }, 1, 0]
    //                 },
    //                 closed: {  // Set to 1 if value > 10
    //                     $cond: [
    //                         {$and: [
    //                                 {$gt: ["$submissions.lower_cost", null]},
    //                                 { $eq: [ "$submissions.lower_cost", "$submissions.solution_cost" ]}
    //                             ]}, 1, 0]
    //                 },
    //                 solved: {  // Set to 1 if value > 10
    //                     $cond: [ { $gt: [ "$submissions.solution_cost", null ] }, 1, 0]
    //                 }
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: {"map_name": "$map_name",
    //                     "map_size":"$map_size",
    //                     "map_type":"$map_type",
    //                     "scens":"$scens",
    //                     "instances":"$instances"
    //                 },
    //                 "best_lower": {$sum: "$best_lower" },
    //                 "best_solution": {$sum: "$best_solution" },
    //                 "closed": {$sum: "$closed" },
    //                 "solved": {$sum: "$solved" },
    //                 "counter": { $count: { } }
    //             }
    //         },
    //         {
    //             $project: {
    //                 map_name: '$_id.map_name',
    //                 map_size: '$_id.map_size',
    //                 map_type: '$_id.map_type',
    //                 scens: '$_id.scens',
    //                 instances: '$_id.instances',
    //                 best_lower: "$best_lower",
    //                 best_solution: "$best_solution",
    //                 closed: "$closed",
    //                 solved: "$solved",
    //                 counter: "$counter"
    //             }
    //         },
    //     ]
    //
    //
    // ).sort({map_type :1, map_name:1})
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Algorithm."
    //         });
    //     });
};

exports.submitData= async (req, res) => {
    const algo_id = mongoose.Types.ObjectId(req.params.id);
    // Validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    var algo = await Algorithm.findOne({"_id": algo_id}).catch(err => {
        res.status(400).send({
            message:
                err.message || "Some error occurred while finding algorithm."
        });
    });
    if(!algo){
        res.status(400).send({message: "Error: algorithm not found"});
        return;
    }
    var algo_name = algo.algo_name;
    var map = await Map.findOne({"map_name": req.body[0].map_name}).catch(err => {
        res.status(400).send({
            message:
                err.message || "Some error occurred while finding map."
        });
    });
    if(!map){
        res.status(400).send({message: "Error: map not found"});
        return;
    }
    var map_id  = map._id
    for (const index in req.body) {
        var scen = await Scenario.findOne({"map_id": map_id, "scen_type": req.body[index].scen_type, "type_id": parseInt(req.body[index].type_id)}).catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while finding scenario."
            });
        });
        if(!scen){
            res.status(400).send({message: "Error: scenario not found"});
            return;
        }
        var scen_id  = scen._id
        var curr_instance = await Instance.findOne({"map_id": map_id, "scen_id": scen_id, "agents":parseInt(req.body[index].agents)}).catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while finding instance."
            });
        });
        if(!curr_instance){
            res.status(400).send({message: "Error: instance not found"});
            return;
        }
        //
        var instance_id = curr_instance._id;
        const date = require('date-and-time')
        var curr_submission  = {
            "map_id" :  map_id,
            "instance_id" :instance_id,
            "algo_id": algo_id,
            "lower_cost": req.body[index].lower_cost === "" ? null : parseInt(req.body[index].lower_cost) ,
            "solution_cost": req.body[index].solution_cost=== "" ? null : parseInt(req.body[index].solution_cost),
            "best_lower": false,
            "best_solution": false,
            "date": date.format(new Date(),'YYYY-MM-DD'),
            "agents": parseInt(req.body[index].agents),
            "scen_id": scen_id
        }
        var path  = req.body[index].solution_plan;
        if(curr_submission.lower_cost !== null){
            if(curr_instance.lower_cost !== null){
                if(curr_instance.lower_cost > curr_submission.lower_cost){
                    console.log("erase preivous record");
                }
            }
            if(curr_instance.lower_cost === null){
                curr_submission.best_lower = true;
                curr_instance.lower_cost =curr_submission.lower_cost;
                curr_instance.lower_date = curr_submission.date;
                curr_instance.empty = false;
                curr_instance.lower_algos.push({
                    "algo_name": algo_name,
                    "algo_id": curr_submission.algo_id,
                    "date":curr_submission.date,
                })
            }else{
                if(curr_instance.lower_cost  < curr_submission.lower_cost){
                    await Submission.updateMany({"instance_id": instance_id}, {
                        "$set":
                            {
                                "best_lower": false
                            }
                    }).catch(err => {
                        res.status(400).send({
                            message:
                                err.message || "Some error occurred while updating lower-bound."
                        });
                    });

                    curr_submission.best_lower = true;
                    curr_instance.lower_cost = curr_submission.lower_cost;
                    curr_instance.lower_date = curr_submission.date;
                    curr_instance.empty = false;
                    curr_instance.lower_algos = [{
                        "algo_name": algo_name,
                        "algo_id": curr_submission.algo_id,
                        "date":curr_submission.date,
                    }]
                }else if (curr_instance.lower_cost === curr_submission.lower_cost){
                    curr_submission.best_lower = true
                    var record_exist = false;
                    var earliest_date = "2222-10-10"
                    for (var i = 0; i < curr_instance.lower_algos.length; i ++){
                        if(curr_instance.lower_algos[i].algo_id.equals( curr_submission.algo_id) ){
                            curr_instance.lower_algos[i].date = curr_submission.date
                            record_exist = true;
                        }
                        earliest_date = earliest_date < curr_instance.lower_algos[i].date ? earliest_date : curr_instance.lower_algos[i].date;
                    }
                    if(record_exist){
                        curr_instance.lower_date = earliest_date;
                        curr_instance.empty = false;
                    }else {
                        curr_instance.lower_algos.push({
                            "algo_name": algo_name,
                            "algo_id": curr_submission.algo_id,
                            "date": curr_submission.date,
                        })
                    }
                }
            }
        }

        if(curr_submission.solution_cost !== null){
            if(curr_instance.solution_cost === null){
                var path_id = null;
                await Solution_path.collection.insertOne({"instance_id": instance_id, 'solution_path': path})
                    .then(result => {
                        path_id = result.insertedId
                    }).catch(err => {
                        res.status(400).send({
                            message:
                                err.message || "Some error occurred while updating solution."
                        });
                    });
                curr_submission.best_solution = true;
                curr_instance.solution_cost = curr_submission.solution_cost;
                curr_instance.solution_date = curr_submission.date;
                curr_instance.solution_path_id = path_id;
                curr_instance.empty = false;
                curr_instance.solution_algos.push({
                    "algo_name": algo_name,
                    "algo_id": curr_submission.algo_id,
                    "date":curr_submission.date,
                })
            }else{
                if(curr_instance.solution_cost >curr_submission.solution_cost) {
                    await Submission.updateMany({"instance_id": instance_id}, {
                        "$set":
                            {
                                "best_solution": false
                            }
                    }).catch(err => {
                        res.status(400).send({
                            message:
                                err.message || "Some error occurred while updating solution."
                        });
                    });
                    var path_id = null;
                    await Solution_path.collection.insertOne({"instance_id": instance_id, 'solution_path': path})
                        .then(result => {
                            path_id = result.insertedId
                        }).catch(err => {
                            res.status(400).send({
                            message:
                                err.message || "Some error occurred while updating solution."
                            });
                        });
                    curr_submission.best_solution = true
                    curr_instance.solution_cost = curr_submission.solution_cost;
                    curr_instance.solution_date = curr_submission.date;
                    curr_instance.solution_path_id = path_id;
                    curr_instance.solution_algos = [{
                        "algo_name": algo_name,
                        "algo_id": curr_submission.algo_id,
                        "date": curr_submission.date,
                    }];
                    curr_instance.empty = false;

                }else if (curr_instance.solution_cost === curr_submission.solution_cost) {
                    curr_submission.best_solution= true
                    var record_exist = false;
                    var earliest_date = "2222-10-10"
                    for (var i = 0; i < curr_instance.solution_algos.length; i ++){
                        if(curr_instance.solution_algos[i].algo_id.equals(curr_submission.algo_id) ){
                            curr_instance.solution_algos[i].date = curr_submission.date
                            record_exist = true;
                        }
                        earliest_date = earliest_date < curr_instance.solution_algos[i].date ? earliest_date : curr_instance.solution_algos[i].date;
                    }
                    if(record_exist){
                        curr_instance.solution_date = earliest_date;
                        curr_instance.empty = false;
                    }else{
                        curr_instance.solution_algos.push({
                            "algo_name": algo_name,
                            "algo_id": curr_submission.algo_id,
                            "date": curr_submission.date,
                        })
                    }
                }
            }
        }

        if(curr_instance.lower_cost !== null && curr_instance.solution_cost !== null){
            if (curr_instance.lower_cost === curr_instance.solution_cost){
                curr_instance.closed = true;
            }
        }

        var mongo_update  = await Instance.updateOne({"_id" : instance_id},curr_instance).catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while updating instance."
            });
        });

        mongo_update = await Submission.updateOne({"map_id":curr_submission.map_id,
            "instance_id" : curr_submission.instance_id,
            "algo_id" : curr_submission.algo_id,
        },curr_submission,{ upsert: true }).catch(err => {
                    res.status(400).send({
                        message:
                            err.message || "Some error occurred while updating submission."
                    });
                });

    }
    return res.status(200).send({message:  "Update successful"});

};


exports.updateProgress= async (req, res) => {
    const algo_id = mongoose.Types.ObjectId(req.params.id);
    // Validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    var algo = await Algorithm.findOne({"_id": algo_id}).catch(err => {
        res.status(400).send({
            message:
                err.message || "Some error occurred while finding algorithm."
        });
    });
    if(!algo){
        res.status(400).send({message: "Error: algorithm not found"});
        return;
    }
    var map = await Map.findOne({"map_name": req.body.map_name}).catch(err => {
        res.status(400).send({
            message:
                err.message || "Some error occurred while finding map."
        });
    });
    if(!map){
        res.status(400).send({message: "Error: map not found"});
        return;
    }
    var map_id  = map._id
    var scen_type = ["even","random"]
    var total_s = 0
    var total_l = 0
    for( var i = 1; i < 26; i ++ ){
        for (const scen_t of scen_type){
            var scen = await Scenario.findOne({"map_id": map_id ,"type_id": i, "scen_type" :  scen_t}).catch(err => {
                res.status(400).send({
                    message:
                        err.message || "Some error occurred while finding scenario."
                });
            });
            if(!scen){
                res.status(400).send({message: "Error: scenario not found"});
                return;
            }
            var scen_id = scen._id;

            var num_s = await Instance.countDocuments({"scen_id" : scen_id, "closed" : true}).catch(err => {
                res.status(400).send({
                    message:
                        err.message || "Some error occurred while counting document."
                });
            });
            var num_l = await Instance.countDocuments({"scen_id" : scen_id, "solution_cost" : {"$ne":null}}).catch(err => {
                res.status(400).send({
                    message:
                        err.message || "Some error occurred while counting document."
                });
            });
            total_s = total_s + num_s;
            total_l = total_l + num_l;
            await Scenario.updateOne({"_id" : scen_id}, {"$set":{
                    "instances_closed" : num_s,
                    "instances_solved" : num_l
                }}).catch(err => {
                res.status(400).send({
                    message:
                        err.message || "Some error occurred while updating scenario."
                });
            });
        }
    }
    await Map.updateOne({"_id" : map_id}, {"$set":{
            "instances_closed" : total_s,
            "instances_solved" : total_l
        }}).catch(err => {
        res.status(400).send({
            message:
                err.message || "Some error occurred while updating map."
        });
    });
    var lower = await Submission.countDocuments({"algo_id": algo_id, "best_lower": true}).catch(err => {
        res.status(400).send({
            message:
                err.message || "Some error occurred while counting document."
        });
    });
    var solution = await Submission.countDocuments({"algo_id": algo_id, "best_solution": true}).catch(err => {
        res.status(400).send({
            message:
                err.message || "Some error occurred while counting document."
        });
    });
    var closed = await Submission.countDocuments({"algo_id": algo_id, "$expr": {"$eq": ["$lower_cost", "$solution_cost"]}})
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while counting document."
            });
        });
    var solved = await Submission.countDocuments({"algo_id": algo_id, "$expr": {"$ne": [ "$solution_cost", null]}})
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while counting document."
            });
        });
    await Algorithm.updateOne({"_id" : algo_id},{"$set":{ "best_lower":lower, "best_solution":solution, "instances_closed": closed, "instances_solved":solved}})
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while updating algorithm."
            });
        });
    return res.status(200).send({message:  "Update successful"});
}
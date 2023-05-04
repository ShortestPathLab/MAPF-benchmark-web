const db = require("../models");
const Instance = db.instances;
// const ObjectId = db.ObjectId;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Instance.find({})
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


//
// exports.findNonEmptyByScenId = (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     Instance.find({scen_id : id, empty: false}, {"scen_id": 1,"agents": 1, "lower_cost": 1, "lower_algo_name": 1,"lower_algo_id": 1,"lower_date": 1,
//         "solution_cost": 1, "solution_algo_name": 1, "solution_algo_id": 1, "solution_date": 1
//     })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving instances."
//             });
//         });
// };


exports.findNonEmptyByScenId = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    // const id = req.params.id;
    // Instance.find({scen_id : id, empty: false}, {"agents": 1, "lower_cost": 1, "lower_algos": 1,"lower_date": 1,
    //     "solution_cost": 1, "solution_algos": 1, "solution_date": 1
    // })
    Instance.aggregate([
        {
            $match: {
                scen_id: id, empty: false
            }
        },
        {
            $project: {
                id :"$_id",
                agents : 1,
                lower_cost : 1,
                lower_algos : { $size: "$lower_algos" },
                lower_date : 1,
                solution_cost : 1,
                solution_algos :  { $size: "$solution_algos" },
                solution_date: 1,
                solution_path_id: 1
            }
        }
    ] )
        .then(data => {
            // console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instances."
            });
        });
};

exports.findAlgosRecord = (req, res) => {
    const id = req.params.id;
    Instance.find({_id : id, empty: false}, {"lower_algos": 1, "solution_algos": 1
    })
        .then(data => {
            // console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instances."
            });
        });
};
function rankingSorter(firstKey, secondKey, thirdKey) {
    return function(a, b) {
        if (a[firstKey] > b[firstKey]) {
            return 1;
        } else if (a[firstKey] < b[firstKey]) {
            return -1;
        }
        else {
            if (a[secondKey] > b[secondKey]) {
                return 1;
            } else if (a[secondKey] < b[secondKey]) {
                return -1;
            } else {
                if (a[thirdKey] > b[thirdKey]) {
                    return 1;
                } else if (a[thirdKey] < b[thirdKey]) {
                    return -1;
                }else{
                    return 0;
                }
            }
        }
    }
}
exports.downloadMapByID = (req, res) => {
    const id = req.params.id;
    Instance.find({"map_id": id,'empty':false}, {"map_id": 1, "scen_id": 1, "agents": 1, "lower_cost": 1,"lower_date": 1,
        "solution_cost": 1, "solution_date": 1
    })
        .populate('scen_id', {scen_type : 1, type_id : 1, _id : 0})
        .then(data => {
            // console.log(data)
            // console.log("sorting data ")
            const transformedDataArray = data.map((row) => ({
                scen_type: row.scen_id.scen_type,
                type_id: row.scen_id.type_id,
                agents : row.agents,
                lower_cost : row.lower_cost,
                lower_date : row.lower_date,
                solution_cost : row.solution_cost,
                solution_date : row.solution_date,
            }));
            transformedDataArray.sort( rankingSorter("scen_type","type_id","agents"))
            res.send(transformedDataArray );
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instances."
            });
        });
};

exports.test = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Instance.aggregate(
        [
            {$match:{map_id: id,
            $or: [ { solution_algo_id: mongoose.Types.ObjectId("636cf9b1a1b36ac2118eb15f")} ,
                { lower_algo_id: mongoose.Types.ObjectId("636cf9b1a1b36ac2118eb15f")} ]
            }},
            {
                $lookup : {
                    from : 'submissions',
                    localField  : '_id',
                    foreignField : 'instance_id',
                    as : "Submission_records"
                }
            },
            {
                $project : {
                    _id : "$_id",
                    map_id:"$map_id",
                    scen_id:"$scen_id",
                    agents:"$agents",
                    Submission_records: "$Submission_records"
                        // {
                        // $filter: {
                        //     input: '$Submission_records',
                        //     cond: { $ne: [ "$$submission.algo_id",mongoose.Types.ObjectId("636cf9b1a1b36ac2118eb15f")] },
                        //     as: 'submission',
                        // }
                    // }
                }
            },
            // {
            //     $unwind: '$Submission_records'
            // },

            // {$group: {_id: '$_id',
            //         agents: { $addToSet:{num: "$agents"}},
            //         maxLower: { $max: "$Submission_records.lower_cost" },
            //         minSolution: { $min: "$Submission_records.solution_cost" }
            //     }},
            // {
            //     $group:
            //         {_id:null,
            //             maxLower:{$max:"$maxLower"},
            //             minSolution:{$min:"$minSolution"}
            //         }
            // }
            // {
            //     $project:{
            //         _id : "$_id",
            //         agents: "$agents",
            //         submissions:"$Submission_records"
            //     }
            // }
        ]
    ).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving instances."
            });
        });
};

exports.downloadNonEmptyByScenId = (req, res) => {
    const id = req.params.id;
    Instance.find({scen_id : id, empty: false}, {"agents": 1, "lower_cost": 1,"lower_date": 1,
        "solution_cost": 1, "solution_date": 1,"_id":0
    }).sort({"agents":1})
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

exports.findPathById = (req, res) => {
    const id = req.params.id;
    Instance.find({_id : id, empty: false}, {"solution_path": 1
    })
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

exports.downloadRowById = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    Instance.aggregate(
        [
            {
                $match:{_id: id}
            },
            {
                $lookup : {
                    from : 'solution_paths',
                    localField  : 'solution_path_id',
                    foreignField : '_id',
                    as : "path_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$path_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $project: {
                    agents:1,
                    lower_cost:1,
                    lower_date: 1,
                    solution_cost : 1,
                    solution_date :1,
                    path: "$solution_path",
                    _id :0,
                }
            }
        ]
    )
    // Instance.find({_id : id, empty: false}, {"agents": 1, "lower_cost": 1,"lower_date": 1,
    //     "solution_cost": 1, "solution_date": 1, "_id":0
    // })
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

exports.get_map_level_summary = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    // Instance.aggregate(
    //     [
    //         {$match:{map_id: id, $expr: { $ne: [ "$solution_cost", null] } }},
    //         {
    //             $group: {
    //                 _id: {"agents": "$agents"},
    //                 count: { $count: { } }
    //             }
    //         }
    //     ]
    // ).sort({ "_id.agents": 1}).then(result=>(console.log(result)))
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred."
    //         });
    //     });

    var query1 =  Instance.aggregate(
        [
        {$match:{map_id: id}},
        {
            $group: {
                _id: {"agents": "$agents"},
                count: { $count: { } }
            }
        }
        ]
    ).sort({ "_id.agents": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });

    var query2 =  Instance.aggregate(
        [
            {$match:{map_id: id, closed: true }},
            {
                $group: {
                    _id: {"agents": "$agents"},
                    count: { $count: { } }
                }
            }
        ]
    )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });

        });
    var query3 =  Instance.aggregate(
        [
        {$match:{map_id: id, $expr: { $ne: [ "$solution_cost", null] }}},
        {
            $group: {
                _id: {"agents": "$agents"},
                count: { $count: { } }
            }
        }
        ]
    )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });

    Promise.all([query1, query2,query3]).then(result => {
            var final_results = []
            // for(var i = 0 ; i < result[0].length )
            // console.log(result[0])
            // console.log("finished")
            result[0].forEach(function (element) {
                var entry = {};
                entry["name"] = element._id.agents;
                entry["total"] = element.count;
                entry["Unknown"] = element.count;
                entry["Closed"] = 0;
                entry["Solved"] = 0;
                final_results.push(entry);
            })
            result[1].forEach(function (element) {
                final_results[parseInt(element._id.agents)-1]["Closed"] =  element.count;
                // console.log(final_results[parseInt(element.agents)-1])
            })
            result[2].forEach(function (element) {
                final_results[parseInt(element._id.agents)-1]["Solved"] =  element.count - final_results[parseInt(element._id.agents) -1]["Closed"];
                final_results[parseInt(element._id.agents)-1]["Unknown"] =  final_results[parseInt(element._id.agents) -1]["total"]  - element.count;
            })
            res.send(final_results);
        }
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    });


    //
    //
    // Instance.aggregate(
    //     [
    //         {$match:{map_id: id}},
    //
    //         {
    //             $group: {
    //                 _id: {"agents":"$agents"},
    //
    //                 closed: { $sum:
    //                         {
    //                             $cond:{
    //                                 "if":{
    //                                     $eq:[
    //                                         "$closed",
    //                                         true
    //                                     ]
    //                                 },
    //                                 "then":1,
    //                                 "else":0
    //                             }
    //                         }
    //                 },
    //                 solved: { $sum:
    //                         {
    //                             $cond:{
    //                                 "if":{
    //                                     $ne:[
    //                                         "$solution_cost",
    //                                         null
    //                                     ]
    //                                 },
    //                                 "then":1,
    //                                 "else":0
    //                             }
    //                         }
    //                 },
    //                 count: { $count: { } }
    //             }
    //         },
    //         {
    //             $project : {
    //                 name : "$_id.agents",
    //                 total: "$count",
    //                 Closed : "$closed" ,
    //                 Solved : { $subtract: [ "$solved",  "$closed"] },
    //                 Unknown :{ $subtract: [ "$count",  "$solved"] },
    //             }
    //         }
    //     ]
    // ).sort({ "_id.agents": 1})
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving instances."
    //         });
    //     });
};
// exports.get_map_level_summary = (req, res) => {
//     const id = mongoose.Types.ObjectId(req.params.id);
//     Instance.aggregate(
//         [
//             {$match:{map_id: id}},
//             {
//                 $group: {
//                     _id: {"agents":"$agents"},
//
//                     closed: { $sum:
//                             {
//                                 $cond:{
//                                     "if":{
//                                         $eq:[
//                                             "$closed",
//                                             true
//                                         ]
//                                     },
//                                     "then":1,
//                                     "else":0
//                                 }
//                             }
//                     },
//                     solved: { $sum:
//                             {
//                                 $cond:{
//                                     "if":{
//                                         $ne:[
//                                             "$solution_cost",
//                                             null
//                                         ]
//                                     },
//                                     "then":1,
//                                     "else":0
//                                 }
//                             }
//                     },
//                     count: { $count: { } }
//                 }
//             },
//             {
//                 $project : {
//                     name : "$_id.agents",
//                     total: "$count",
//                     Closed : "$closed" ,
//                     Solved : { $subtract: [ "$solved",  "$closed"] },
//                     Unknown :{ $subtract: [ "$count",  "$solved"] },
//                 }
//             }
//         ]
//     ).sort({ "_id.agents": 1})
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving instances."
//             });
//         });
// };
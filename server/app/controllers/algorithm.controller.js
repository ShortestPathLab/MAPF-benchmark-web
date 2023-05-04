const db = require("../models");
const mongoose = require("mongoose");
const Algorithm = db.algorithms;
const Submission = db.submissions;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Algorithm.find({},{_id:0,algo_name:1})
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

exports.findAllDetails = (req, res) => {
    Algorithm.find({})
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

exports.findBestClosed = (req, res) => {
    Submission.aggregate(
        [

            { $match : { $expr: { $eq: [ "$lower_cost", "$solution_cost"] }}  },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","map_id":"$map_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'maps',
                    localField  : '_id.map_id',
                    foreignField : '_id',
                    as : "map_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"map_name":"$map_name"},
                    record: { $addToSet:{algo_name: "$algo_name",count:"$count",total:"$instances" }}
                }
            },
            {
                $project: {
                    _id: 0,
                    map_name: "$_id.map_name",
                    solved_instances: "$record"
                }
            }
        ]
    )
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


exports.findBestSolution = (req, res) => {

    Submission.aggregate(
        [

            { $match : { best_solution: true } },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","map_id":"$map_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'maps',
                    localField  : '_id.map_id',
                    foreignField : '_id',
                    as : "map_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"map_name":"$map_name"},
                    record: { $addToSet:{algo_name: "$algo_name",count:"$count",total:"$instances"}}
                }
            },
            {
                $project: {
                    _id: 0,
                    map_name: "$_id.map_name",
                    solved_instances: "$record"
                }
            }
        ]
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
};


exports.findBestSolved = (req, res) => {

    Submission.aggregate(
        [

            { $match : {$expr: { $ne: [ "$solution_cost", null] }} },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","map_id":"$map_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'maps',
                    localField  : '_id.map_id',
                    foreignField : '_id',
                    as : "map_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"map_name":"$map_name"},
                    record: { $addToSet:{algo_name: "$algo_name",count:"$count",total:"$instances"}}
                }
            },
            {
                $project: {
                    _id: 0,
                    map_name: "$_id.map_name",
                    solved_instances: "$record"
                }
            }
        ]
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
};

exports.findBestLower = (req, res) => {
    Submission.aggregate(
        [
            { $match : { best_lower : true } },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","map_id":"$map_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'maps',
                    localField  : '_id.map_id',
                    foreignField : '_id',
                    as : "map_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"map_name":"$map_name"},
                    record: { $addToSet:{algo_name: "$algo_name",count:"$count",total:"$instances"  }}
                }
            },
            {
                $project: {
                    _id: 0,
                    map_name: "$_id.map_name",
                    solved_instances: "$record"
                }
            }
        ]
    )
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




exports.findSolvedDomainQuery= (req, res) => {
    Submission.aggregate(
        [
            { $match : {$expr: { $ne: [ "$solution_cost", null] }} },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","map_id":"$map_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'maps',
                    localField  : '_id.map_id',
                    foreignField : '_id',
                    as : "map_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {map_type:"$map_type",algo_name:"$algo_name"},
                    sum_value: {$sum: "$count" },
                    total_instances: {$sum: "$instances" }
                    // record: { $addToSet:{algo_name: "$algo_name",count:"$count" }}
                }
            },
            {
                $group: {
                    _id: {map_type:"$_id.map_type"},
                    record: { $addToSet:{algo_name: "$_id.algo_name",sum_value: "$sum_value", total_ins : "$total_instances"}}
                }
            },

            {
                $project: {
                    _id: 0,
                    map_type: "$_id.map_type",
                    results: "$record"
                }
            }
        ]
    ).sort({"map_type":1})
        .then(data => {
            data.forEach(function (element){
                    var total =0;
                    element['results'].forEach(function(algo){
                        if(algo['algo_name'] === 'CBSH2-RTC'){
                            total = algo['total_ins'];
                        }
                    })
                    element['results'].forEach(function(algo){
                        algo['count'] = algo['sum_value'] /total;
                    })
                }

            )
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
};

exports.findClosedDomainQuery= (req, res) => {
    Submission.aggregate(
        [
            { $match : { $expr: { $eq: [ "$lower_cost", "$solution_cost"] }}  },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","map_id":"$map_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'maps',
                    localField  : '_id.map_id',
                    foreignField : '_id',
                    as : "map_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {map_type:"$map_type",algo_name:"$algo_name"},
                    sum_value: {$sum: "$count" },
                    total_instances: {$sum: "$instances" }
                    // record: { $addToSet:{algo_name: "$algo_name",count:"$count" }}
                }
            },
            {
                $group: {
                    _id: {map_type:"$_id.map_type"},
                    record: { $addToSet:{algo_name: "$_id.algo_name",sum_value: "$sum_value", total_ins : "$total_instances"}}
                }
            },

            {
                $project: {
                    _id: 0,
                    map_type: "$_id.map_type",
                    results: "$record"
                }
            }
        ]
    ).sort({"map_type":1})
        .then(data => {
            data.forEach(function (element){
                    var total =0;
                    element['results'].forEach(function(algo){
                        if(algo['algo_name'] === 'CBSH2-RTC'){
                            total = algo['total_ins'];
                        }
                    })
                    element['results'].forEach(function(algo){
                        algo['count'] = algo['sum_value'] /total;
                    })
                }

            )
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
};

exports.findBestLowerDomainQuery= (req, res) => {
    Submission.aggregate(
        [
            { $match : { best_lower : true } },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","map_id":"$map_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'maps',
                    localField  : '_id.map_id',
                    foreignField : '_id',
                    as : "map_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {map_type:"$map_type",algo_name:"$algo_name"},
                    sum_value: {$sum: "$count" },
                    total_instances: {$sum: "$instances" },
                    // record: { $addToSet:{algo_name: "$algo_name",count:"$count" }}
                }
            },
            {
                $group: {
                    _id: {map_type:"$_id.map_type"},
                    record: { $addToSet:{algo_name: "$_id.algo_name",sum_value: "$sum_value", total_ins : "$total_instances" }}
                }
            },

            {
                $project: {
                    _id: 0,
                    map_type: "$_id.map_type",
                    results: "$record"
                }
            }
        ]
    ).sort({"map_type":1})
        .then(data => {
            data.forEach(function (element){
                    var total =0;
                    element['results'].forEach(function(algo){
                        if(algo['algo_name'] === 'CBSH2-RTC'){
                            total = algo['total_ins'];
                        }
                    })
                    element['results'].forEach(function(algo){
                        algo['count'] = algo['sum_value'] /total;
                    })
                }

            )
            // console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
};

exports.findBestSolutionDomainQuery= (req, res) => {
    Submission.aggregate(
        [
            { $match : { best_solution : true } },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","map_id":"$map_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'maps',
                    localField  : '_id.map_id',
                    foreignField : '_id',
                    as : "map_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {map_type:"$map_type",algo_name:"$algo_name"},
                    sum_value: {$sum: "$count" },
                    total_instances: {$sum: "$instances" },
                    // record: { $addToSet:{algo_name: "$algo_name",count:"$count" }}
                }
            },
            {
                $group: {
                    _id: {map_type:"$_id.map_type"},
                    record: { $addToSet:{algo_name: "$_id.algo_name", sum_value: "$sum_value", total_ins : "$total_instances" }}
                }
            },
            //
            {
                $project: {
                    _id: 0,
                    map_type: "$_id.map_type",
                    results: "$record"
                }
            }
        ]
    ).sort({"map_type":1})
        .then(data => {
            data.forEach(function (element){
                var total =0;
                element['results'].forEach(function(algo){
                    if(algo['algo_name'] === 'CBSH2-RTC'){
                        total = algo['total_ins'];
                    }
                })
                element['results'].forEach(function(algo){
                    algo['count'] = algo['sum_value'] /total;
                })
                }

            )
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
};






// exports.findBestLowerGroup = (req, res) => {
//     const id = mongoose.Types.ObjectId(req.params.id);
//     Submission.aggregate(
//         [
//             { $match : { best_lower: true } },
//             {
//                 $group: {
//                     _id: {"map_id":"$map_id","algo_id" : "$algo_id"},
//                     "uniqueInstance": { $addToSet: "$instance_id" }
//                 }
//             },
//
//             {
//                 $lookup : {
//                     from : 'algorithms',
//                     localField  : '_id.algo_id',
//                     foreignField : '_id',
//                     as : "algo_info"
//                 }
//             },
//             {
//                 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
//             },
//             {
//                 $lookup : {
//                     from : 'maps',
//                     localField  : '_id.map_id',
//                     foreignField : '_id',
//                     as : "map_info"
//                 }
//             },
//             {
//                 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
//             },
//
//
//             { $project: {
//                     '_id' : "$_id",
//                     'map_type': "$map_type",
//                     'instances': "$instances",
//                     "group_label":{$cond: [{$eq: ['$_id.algo_id', id]}, "$algo_name", "State of The Art" ]},
//                     "uniqueInstance":"$uniqueInstance"
//                 }
//             },
//             {
//                 $group: {
//                     _id: {"map_type":"$map_type","group_label" : "$group_label"},
//                     "instances": {$sum: "$instances" },
//                     "uniqueInstance": { $addToSet: "$uniqueInstance" }
//                 }
//             },
//             { $addFields: {
//                     "uniqueInstance": {
//                         "$reduce": {
//                             "input": "$uniqueInstance",
//                             "initialValue": [],
//                             "in": { $setUnion: [ "$$value", "$$this" ] }
//                         }
//                     }
//                 }},
//             {$project:{"map_type":"$_id.map_type","instances": "$instances", "group_label": "$_id.group_label", "count":{$size:"$uniqueInstance"}}},
//             {
//                 $group: {
//                     _id: {"map_type": "$map_type"},
//                     record: {
//                         $addToSet: {
//                             group_label: "$_id.group_label",
//                             count : "$count",
//                             instance:  "$instances",
//                             total_amount: { $divide: [ "$count", "$instances" ]}
//                         }
//                     }
//                 }
//             },
//             // {
//             //     $lookup : {
//             //         from : 'maps',
//             //         localField  : '_id.map_id',
//             //         foreignField : '_id',
//             //         as : "map_info"
//             //     }
//             // },
//             // {
//             //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
//             // },
//
//             // {
//             //     $group: {
//             //         _id: {"map_id":"$map_id","group_label" : "$group_label"},
//             //         "uniqueInstance": { $addToSet: "$instance_id" }
//             //     }
//             // },
//             // {$project:{"map_id":"$_id.map_id","group_label": "$_id.group_label", "count":{$size:"$uniqueInstance"}}},
//
//             // {
//             //     $lookup : {
//             //         from : 'maps',
//             //         localField  : '_id.map_id',
//             //         foreignField : '_id',
//             //         as : "map_info"
//             //     }
//             // },
//             // {
//             //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
//             // },
//             // {
//             //     $group: {
//             //         _id: {"map_type": "$map_type"},
//             //         record: {
//             //             $addToSet: {group_label: "$_id.group_label",
//             //                 total_amount: {"$sum": {"$size": "$uniqueInstance"
//             //                 }}}
//             //         }
//             //     }
//             // },
//
//         ]
//     ).sort({"_id.map_type":1})
//     //
//     //
//     //
//     //
//     //
//     // Algorithm.aggregate(
//     //     [
//     //         { $project: {
//     //                 '_id' : "$_id",
//     //                 "algo_name": "$algo_name",
//     //                 "group_label":{$cond: [{$eq: ['$_id', id]}, "$algo_name", "State of The Art" ]}
//     //             }
//     //         },
//     //         {
//     //             $lookup : {
//     //                 from : 'submissions',
//     //                 localField  : '_id',
//     //                 foreignField : 'algo_id',
//     //                 as : "Submission_records"
//     //             }
//     //         },
//     //         {
//     //             $project: {
//     //                 algo_name: '$algo_name',
//     //                 group_label: '$group_label',
//     //                 Submission_records: {
//     //                     $filter: {
//     //                         input: '$Submission_records',
//     //                         cond: { $eq: [ "$$submission.best_lower", true] },
//     //                         as: 'submission',
//     //                     }
//     //                 }
//     //             }
//     //         },
//     //         {
//     //             "$unwind": "$Submission_records"
//     //         },
//     //         {
//     //             $group: {
//     //                 _id: {"map_id":"$Submission_records.map_id","group_label" : "$group_label"},
//     //                 "uniqueInstance": { $addToSet: "$Submission_records.instance_id" }
//     //             }
//     //         },
//     //         // {
//     //         //     $lookup : {
//     //         //         from : 'maps',
//     //         //         localField  : '_id.map_id',
//     //         //         foreignField : '_id',
//     //         //         as : "map_info"
//     //         //     }
//     //         // },
//     //         // {
//     //         //     $group: {
//     //         //         _id: {"map_type":"$map_info.map_type","group_label" : "$_id.group_label"},
//     //         //         totalAmount: { $sum: { $size: "$uniqueInstance"} }
//     //         //     }
//     //         // },
//     //         // {
//     //         //     $group: {
//     //         //         _id: {"map_type": "$_id.map_type"},
//     //         //         record: {$addToSet: {group_label: "$_id.group_label",total_amount: "$totalAmount" } }
//     //         //     }
//     //         // },
//     //         // {
//     //         //     $project: {
//     //         //         _id : 0,
//     //         //         name : {$first: "$_id.map_type"},
//     //         //         record: "$record"
//     //         //     }
//     //         // }
//     //     ]
//     // )
//         .then(data => {
//             data.forEach(function (element) {
//                 var total = 0
//                 element['record'].forEach(function (record){
//                         if(record['group_label'] === 'State of The Art'){
//                             total = record['instance'];
//                         }
//                     }
//                 )
//                 element['record'].forEach(function (record){
//                         element[record['group_label']] = record['count'] / total;
//                     }
//                 )
//                 element['name'] = element['_id']['map_type']
//                 delete element.record;
//                 delete element._id;
//             })
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred."
//             });
//         });
// };



// exports.findBestSolutionGroup = (req, res) => {
//     const id = mongoose.Types.ObjectId(req.params.id);
//     console.log(id)
//     Submission.aggregate(
//         [
//             { $match : { best_solution: true } },
//             {
//                 $group: {
//                     _id: {"map_id":"$map_id","algo_id" : "$algo_id"},
//                     "uniqueInstance": { $addToSet: "$instance_id" }
//                 }
//             },
//
//             {
//                 $lookup : {
//                     from : 'algorithms',
//                     localField  : '_id.algo_id',
//                     foreignField : '_id',
//                     as : "algo_info"
//                 }
//             },
//             {
//                 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
//             },
//             {
//                 $lookup : {
//                     from : 'maps',
//                     localField  : '_id.map_id',
//                     foreignField : '_id',
//                     as : "map_info"
//                 }
//             },
//             {
//                 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
//             },
//
//
//             { $project: {
//                     '_id' : "$_id",
//                     'map_type': "$map_type",
//                     'instances': "$instances",
//                     "group_label":{$cond: [{$eq: ['$_id.algo_id', id]}, "$algo_name", "State of The Art" ]},
//                     "uniqueInstance":"$uniqueInstance"
//                 }
//             },
//             {
//                 $group: {
//                     _id: {"map_type":"$map_type","group_label" : "$group_label"},
//                     "instances": {$sum: "$instances" },
//                     "uniqueInstance": { $addToSet: "$uniqueInstance" }
//                 }
//             },
//             { $addFields: {
//                     "uniqueInstance": {
//                         "$reduce": {
//                             "input": "$uniqueInstance",
//                             "initialValue": [],
//                             "in": { $setUnion: [ "$$value", "$$this" ] }
//                         }
//                     }
//                 }},
//             {$project:{"map_type":"$_id.map_type","instances": "$instances", "group_label": "$_id.group_label", "count":{$size:"$uniqueInstance"}}},
//             {
//                 $group: {
//                     _id: {"map_type": "$map_type"},
//                     record: {
//                         $addToSet: {
//                             group_label: "$_id.group_label",
//                             count : "$count",
//                             instance:  "$instances",
//                             total_amount: { $divide: [ "$count", "$instances" ]}
//                         }
//                     }
//                 }
//             },
//         ]
//     ).sort({"_id.map_type":1})
//         .then(data => {
//             console.log("query finished")
//             data.forEach(function (element) {
//                 var total = 0
//                 element['record'].forEach(function (record){
//                         if(record['group_label'] === 'State of The Art'){
//                             total = record['instance'];
//                         }
//                     }
//                 )
//                 element['record'].forEach(function (record){
//                         element[record['group_label']] = record['count'] / total;
//                     }
//                 )
//                 element['name'] = element['_id']['map_type']
//                 delete element.record;
//                 delete element._id;
//             })
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred."
//             });
//         });
// };
//
exports.findBestLowerGroup = (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    var query3 = Algorithm.find({_id:id});
    var query1 = Submission.aggregate(
        [
            {$match: {best_lower: true, algo_id: {$ne: id}}},
            {
                $group: {
                    _id: {"map_id": "$map_id"},
                    "uniqueInstance": {$addToSet: "$instance_id"}
                }
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: '_id.map_id',
                    foreignField: '_id',
                    as: "map_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$map_info", 0]}, "$$ROOT"]}}
            },

            {
                $group: {
                    _id: {"map_type": "$map_type"},
                    "instances": {$sum: "$instances"},
                    "uniqueInstance": {$addToSet: {$size :"$uniqueInstance"}}
                }
            },
            {
                $project: {
                    "map_type": "$_id.map_type",
                    "instances": "$instances",
                    "count": {$sum: "$uniqueInstance"}
                }
            },
        ]
    ).sort({"_id.map_type": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
    var query2 = Submission.aggregate(
        [
            {$match: {best_lower: true, algo_id: id}},
            {
                $group: {
                    _id: {"map_id": "$map_id", "algo_id": "$algo_id"},
                    "uniqueInstance": {$addToSet: "$instance_id"}
                }
            },
            {
                $lookup: {
                    from: 'algorithms',
                    localField: '_id.algo_id',
                    foreignField: '_id',
                    as: "algo_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$algo_info", 0]}, "$$ROOT"]}}
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: '_id.map_id',
                    foreignField: '_id',
                    as: "map_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$map_info", 0]}, "$$ROOT"]}}
            },
            {
                $group: {
                    _id: {"map_type": "$map_type","algo_name" : "$algo_name"},
                    "instances": {$sum: "$instances"},
                    "uniqueInstance": {$addToSet: {$size :"$uniqueInstance"}}
                }
            },
            {
                $project: {
                    "map_type": "$_id.map_type",
                    "instances": "$instances",
                    "algo_name": "$_id.algo_name",
                    "count": {$sum: "$uniqueInstance"}
                }
            },
        ]
    ).sort({"_id.map_type": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });

    Promise.all([query1, query2,query3]).then(result => {
            var final_results = []
            result[0].forEach(function (element) {
                var entry = {};
                entry["name"] = element.map_type;
                entry["State of The Art"] = element.count / element.instances;
                entry[result[2][0].algo_name] = 0;
                result[1].forEach(function (algo) {
                    if (algo.map_type === element.map_type) {
                        entry[algo.algo_name] = algo.count / algo.instances;
                    }
                })
                final_results.push(entry);
            })
            res.send(final_results);
        }
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    });
}

exports.findBestSolutionGroup = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    var query3 = Algorithm.find({_id:id});
    var query1 = Submission.aggregate(
        [
            {$match: {best_solution: true, algo_id: {$ne: id}}},
            {
                $group: {
                    _id: {"map_id": "$map_id"},
                    "uniqueInstance": {$addToSet: "$instance_id"}
                }
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: '_id.map_id',
                    foreignField: '_id',
                    as: "map_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$map_info", 0]}, "$$ROOT"]}}
            },

            {
                $group: {
                    _id: {"map_type": "$map_type"},
                    "instances": {$sum: "$instances"},
                    "uniqueInstance": {$addToSet: {$size :"$uniqueInstance"}}
                }
            },
            {
                $project: {
                    "map_type": "$_id.map_type",
                    "instances": "$instances",
                    "count": {$sum: "$uniqueInstance"}
                }
            },
        ]
    ).sort({"_id.map_type": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
    var query2 = Submission.aggregate(
        [
            {$match: {best_solution: true, algo_id: id}},
            {
                $group: {
                    _id: {"map_id": "$map_id", "algo_id": "$algo_id"},
                    "uniqueInstance": {$addToSet: "$instance_id"}
                }
            },
            {
                $lookup: {
                    from: 'algorithms',
                    localField: '_id.algo_id',
                    foreignField: '_id',
                    as: "algo_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$algo_info", 0]}, "$$ROOT"]}}
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: '_id.map_id',
                    foreignField: '_id',
                    as: "map_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$map_info", 0]}, "$$ROOT"]}}
            },
            {
                $group: {
                    _id: {"map_type": "$map_type","algo_name" : "$algo_name"},
                    "instances": {$sum: "$instances"},
                    "uniqueInstance": {$addToSet: {$size :"$uniqueInstance"}}
                }
            },
            {
                $project: {
                    "map_type": "$_id.map_type",
                    "instances": "$instances",
                    "algo_name": "$_id.algo_name",
                    "count": {$sum: "$uniqueInstance"}
                }
            },
        ]
    ).sort({"_id.map_type": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });

    Promise.all([query1, query2,query3]).then(result => {
            var final_results = []
            result[0].forEach(function (element) {
                var entry = {};
                entry["name"] = element.map_type;
                entry["State of The Art"] = element.count / element.instances;
                entry[result[2][0].algo_name] = 0;
                result[1].forEach(function (algo) {
                    if (algo.map_type === element.map_type) {
                        entry[algo.algo_name] = algo.count / algo.instances;
                    }
                })
                final_results.push(entry);
            })
            res.send(final_results);
        }
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    });
};

exports.findBestClosedGroup = (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.id);
    var query3 = Algorithm.find({_id:id});
    var query1 = Submission.aggregate(
        [
            {$match: {$expr: { $eq: [ "$lower_cost", "$solution_cost"] }, algo_id: {$ne: id}}},
            {
                $group: {
                    _id: {"map_id": "$map_id"},
                    "uniqueInstance": {$addToSet: "$instance_id"}
                }
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: '_id.map_id',
                    foreignField: '_id',
                    as: "map_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$map_info", 0]}, "$$ROOT"]}}
            },

            {
                $group: {
                    _id: {"map_type": "$map_type"},
                    "instances": {$sum: "$instances"},
                    "uniqueInstance": {$addToSet: {$size :"$uniqueInstance"}}
                }
            },
            {
                $project: {
                    "map_type": "$_id.map_type",
                    "instances": "$instances",
                    "count": {$sum: "$uniqueInstance"}
                }
            },
        ]
    ).sort({"_id.map_type": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
    var query2 = Submission.aggregate(
        [
            {$match: {$expr: { $eq: [ "$lower_cost", "$solution_cost"] }, algo_id: id}},
            {
                $group: {
                    _id: {"map_id": "$map_id", "algo_id": "$algo_id"},
                    "uniqueInstance": {$addToSet: "$instance_id"}
                }
            },
            {
                $lookup: {
                    from: 'algorithms',
                    localField: '_id.algo_id',
                    foreignField: '_id',
                    as: "algo_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$algo_info", 0]}, "$$ROOT"]}}
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: '_id.map_id',
                    foreignField: '_id',
                    as: "map_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$map_info", 0]}, "$$ROOT"]}}
            },
            {
                $group: {
                    _id: {"map_type": "$map_type","algo_name" : "$algo_name"},
                    "instances": {$sum: "$instances"},
                    "uniqueInstance": {$addToSet: {$size :"$uniqueInstance"}}
                }
            },
            {
                $project: {
                    "map_type": "$_id.map_type",
                    "instances": "$instances",
                    "algo_name": "$_id.algo_name",
                    "count": {$sum: "$uniqueInstance"}
                }
            },
        ]
    ).sort({"_id.map_type": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });

    Promise.all([query1, query2,query3]).then(result => {
            var final_results = []
            result[0].forEach(function (element) {
                var entry = {};
                entry["name"] = element.map_type;
                entry["State of The Art"] = element.count / element.instances;
                entry[result[2][0].algo_name] = 0;
                result[1].forEach(function (algo) {
                    if (algo.map_type === element.map_type) {
                        entry[algo.algo_name] = algo.count / algo.instances;
                    }
                })
                final_results.push(entry);
            })
            res.send(final_results);
        }
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    });


}


exports.findBestSolvedGroup = (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.id);
    var query3 = Algorithm.find({_id:id});
    var query1 = Submission.aggregate(
        [
            {$match: {$expr: {  $ne: [ "$solution_cost", null] }, algo_id: {$ne: id}}},
            {
                $group: {
                    _id: {"map_id": "$map_id"},
                    "uniqueInstance": {$addToSet: "$instance_id"}
                }
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: '_id.map_id',
                    foreignField: '_id',
                    as: "map_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$map_info", 0]}, "$$ROOT"]}}
            },

            {
                $group: {
                    _id: {"map_type": "$map_type"},
                    "instances": {$sum: "$instances"},
                    "uniqueInstance": {$addToSet: {$size :"$uniqueInstance"}}
                }
            },
            {
                $project: {
                    "map_type": "$_id.map_type",
                    "instances": "$instances",
                    "count": {$sum: "$uniqueInstance"}
                }
            },
        ]
    ).sort({"_id.map_type": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
    var query2 = Submission.aggregate(
        [
            {$match: {$expr: {  $ne: [ "$solution_cost", null]}, algo_id: id}},
            {
                $group: {
                    _id: {"map_id": "$map_id", "algo_id": "$algo_id"},
                    "uniqueInstance": {$addToSet: "$instance_id"}
                }
            },
            {
                $lookup: {
                    from: 'algorithms',
                    localField: '_id.algo_id',
                    foreignField: '_id',
                    as: "algo_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$algo_info", 0]}, "$$ROOT"]}}
            },
            {
                $lookup: {
                    from: 'maps',
                    localField: '_id.map_id',
                    foreignField: '_id',
                    as: "map_info"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$map_info", 0]}, "$$ROOT"]}}
            },
            {
                $group: {
                    _id: {"map_type": "$map_type","algo_name" : "$algo_name"},
                    "instances": {$sum: "$instances"},
                    "uniqueInstance": {$addToSet: {$size :"$uniqueInstance"}}
                }
            },
            {
                $project: {
                    "map_type": "$_id.map_type",
                    "instances": "$instances",
                    "algo_name": "$_id.algo_name",
                    "count": {$sum: "$uniqueInstance"}
                }
            },
        ]
    ).sort({"_id.map_type": 1})
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });

    Promise.all([query1, query2,query3]).then(result => {
            var final_results = []
            result[0].forEach(function (element) {
                var entry = {};
                entry["name"] = element.map_type;
                entry["State of The Art"] = element.count / element.instances;
                entry[result[2][0].algo_name] = 0;
                result[1].forEach(function (algo) {
                    if (algo.map_type === element.map_type) {
                        entry[algo.algo_name] = algo.count / algo.instances;
                    }
                })
                final_results.push(entry);
            })
            res.send(final_results);
        }
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred."
        });
    });


}

// exports.findBestSolvedGroup = (req, res) => {
//     const id = mongoose.Types.ObjectId(req.params.id);
//     Submission.aggregate(
//         [
//             { $match : { $expr: { $eq: [ "$lower_cost", "$solution_cost"] }}  },
//             {
//                 $group: {
//                     _id: {"map_id":"$map_id","algo_id" : "$algo_id"},
//                     "uniqueInstance": { $addToSet: "$instance_id" }
//                 }
//             },
//             {
//                 $lookup : {
//                     from : 'algorithms',
//                     localField  : '_id.algo_id',
//                     foreignField : '_id',
//                     as : "algo_info"
//                 }
//             },
//             {
//                 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
//             },
//             {
//                 $lookup : {
//                     from : 'maps',
//                     localField  : '_id.map_id',
//                     foreignField : '_id',
//                     as : "map_info"
//                 }
//             },
//             {
//                 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$map_info", 0 ] }, "$$ROOT" ] } }
//             },
//             { $project: {
//                     '_id' : "$_id",
//                     'map_type': "$map_type",
//                     'instances': "$instances",
//                     "group_label":{$cond: [{$eq: ['$_id.algo_id', id]}, "$algo_name", "State of The Art" ]},
//                     "uniqueInstance":"$uniqueInstance"
//                 }
//             },
//             {
//                 $group: {
//                     _id: {"map_type":"$map_type","group_label" : "$group_label"},
//                     "instances": {$sum: "$instances" },
//                     "uniqueInstance": { $addToSet: "$uniqueInstance" }
//                 }
//             },
//             { $addFields: {
//                     "uniqueInstance": {
//                         "$reduce": {
//                             "input": "$uniqueInstance",
//                             "initialValue": [],
//                             "in": { $setUnion: [ "$$value", "$$this" ] }
//                         }
//                     }
//                 }},
//             {$project:{"map_type":"$_id.map_type","instances": "$instances", "group_label": "$_id.group_label", "count":{$size:"$uniqueInstance"}}},
//             {
//                 $group: {
//                     _id: {"map_type": "$map_type"},
//                     record: {
//                         $addToSet: {
//                             group_label: "$_id.group_label",
//                             count : "$count",
//                             instance:  "$instances",
//                             total_amount: { $divide: [ "$count", "$instances" ]}
//                         }
//                     }
//                 }
//             },
//         ]
//     ).sort({"_id.map_type":1})
//         .then(data => {
//             data.forEach(function (element) {
//                 var total = 0
//                 element['record'].forEach(function (record){
//                         if(record['group_label'] === 'State of The Art'){
//                             total = record['instance'];
//                         }
//                     }
//                 )
//                 element['record'].forEach(function (record){
//                         element[record['group_label']] = record['count'] / total;
//                     }
//                 )
//                 element['name'] = element['_id']['map_type']
//                 delete element.record;
//                 delete element._id;
//             })
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred."
//             });
//         });
// };


exports.LeadingSolvedInfo = (req, res) => {
    Algorithm.aggregate(
        [
            {
                $lookup : {
                    from : 'submissions',
                    localField  : '_id',
                    foreignField : 'algo_id',
                    as : "Submission_records"
                }
            },
            {
                $project: {
                    algo_name: '$algo_name',
                    Submission_records: {
                        $filter: {
                            input: '$Submission_records',
                            cond: { $eq: [ "$$submission.leading_solution", true] },
                            as: 'submission',
                        }
                    },
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$algo_name',
                    count: { $size:"$Submission_records" }
                }
            }
        ]
    ).sort({"name":1})
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

exports.LeadingLowerInfo = (req, res) => {
    Algorithm.aggregate(
        [
            {
                $lookup : {
                    from : 'submissions',
                    localField  : '_id',
                    foreignField : 'algo_id',
                    as : "Submission_records"
                }
            },
            {
                $project: {
                    algo_name: '$algo_name',
                    Submission_records: {
                        $filter: {
                            input: '$Submission_records',
                            cond: { $eq: [ "$$submission.leading_lower", true] },
                            as: 'submission',
                        }
                    },
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$algo_name',
                    count: { $size:"$Submission_records" }
                }
            }
        ]
    ).sort({"name":1})
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

    Algorithm.findById(id)
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


exports.findScenBestClosed = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.id);
    Submission.aggregate(
        [

            {
                $match : {
                    $and :[
                        {$expr: { $eq: [ "$lower_cost", "$solution_cost"] }},
                        {$expr: { $eq: [  "$map_id", map_id] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         scen_id : 1,
            //     }
            // },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","scen_id":"$scen_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'scenarios',
                    localField  : '_id.scen_id',
                    foreignField : '_id',
                    as : "scen_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$scen_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"scen_type":"$scen_type", "type_id":"$type_id"},
                    record: { $addToSet:{algo_name: "$algo_name",count: "$count", total: "$instances"  }}
                }
            },
            {
                $project: {
                    _id: 0,
                    scen_type: "$_id.scen_type",
                    type_id: "$_id.type_id",
                    solved_instances: "$record"
                }
            }
        ]
    ).sort({scen_type:1, type_id : 1 })
        .then(data => {
            // console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findScenBestSolved = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.id);
    Submission.aggregate(
        [

            {
                $match : {
                    $and :[
                        {$expr: { $ne: [ "$solution_cost", null] }},
                        {$expr: { $eq: [  "$map_id", map_id] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         scen_id : 1,
            //     }
            // },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","scen_id":"$scen_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'scenarios',
                    localField  : '_id.scen_id',
                    foreignField : '_id',
                    as : "scen_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$scen_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"scen_type":"$scen_type", "type_id":"$type_id"},
                    record: { $addToSet:{algo_name: "$algo_name",count: "$count", total: "$instances"  }}
                }
            },
            {
                $project: {
                    _id: 0,
                    scen_type: "$_id.scen_type",
                    type_id: "$_id.type_id",
                    solved_instances: "$record"
                }
            }
        ]
    ).sort({scen_type:1, type_id : 1 })
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

exports.findScenBestLower = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.id);
    Submission.aggregate(
        [

            {
                $match : {
                    $and :[
                        {$expr: { $eq: [ "$best_lower", true] }},
                        {$expr: { $eq: [  "$map_id", map_id] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         scen_id : 1,
            //     }
            // },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","scen_id":"$scen_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'scenarios',
                    localField  : '_id.scen_id',
                    foreignField : '_id',
                    as : "scen_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$scen_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"scen_type":"$scen_type", "type_id":"$type_id"},
                    record: { $addToSet:{algo_name: "$algo_name",count: "$count", total: "$instances"  }}
                }
            },
            {
                $project: {
                    _id: 0,
                    scen_type: "$_id.scen_type",
                    type_id: "$_id.type_id",
                    solved_instances: "$record"
                }
            }
        ]
    ).sort({scen_type:1, type_id : 1 })
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


exports.findScenBestSolution = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.id);
    Submission.aggregate(
        [

            {
                $match : {
                    $and :[
                        {$expr: { $eq: [ "$best_solution", true] }},
                        {$expr: { $eq: [  "$map_id", map_id] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         scen_id : 1,
            //     }
            // },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","scen_id":"$scen_id"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $lookup : {
                    from : 'scenarios',
                    localField  : '_id.scen_id',
                    foreignField : '_id',
                    as : "scen_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$scen_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"scen_type":"$scen_type", "type_id":"$type_id"},
                    record: { $addToSet:{algo_name: "$algo_name",count: "$count", total: "$instances"  }}
                }
            },
            {
                $project: {
                    _id: 0,
                    scen_type: "$_id.scen_type",
                    type_id: "$_id.type_id",
                    solved_instances: "$record"
                }
            }
        ]
    ).sort({scen_type:1, type_id : 1 })
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



exports.findAgentBestClosed = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.id);
    Submission.aggregate(
        [
            {
                $match : {
                    $and :[
                        {$expr: { $eq: [ "$lower_cost", "$solution_cost"] }},
                        {$expr: { $eq: [  "$map_id", map_id] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         agents : 1,
            //     }
            // },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","agents":"$agents"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"agents":"$_id.agents"},
                    record: { $addToSet:{algo_name: "$algo_name",count:  "$count" }}
                }
            },
            {
                $project: {
                    _id: 0,
                    agents: "$_id.agents",
                    solved_instances: "$record"
                }
            }
        ]
    ).sort({agents : 1})
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
exports.findAgentBestSolved = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.id);
    Submission.aggregate(
        [
            {
                $match : {
                    $and :[
                        {$expr: { $ne: [ "$solution_cost", null] }},
                        {$expr: { $eq: [  "$map_id", map_id] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         agents : 1,
            //     }
            // },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","agents":"$agents"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"agents":"$_id.agents"},
                    record: { $addToSet:{algo_name: "$algo_name",count:  "$count" }}
                }
            },
            {
                $project: {
                    _id: 0,
                    agents: "$_id.agents",
                    solved_instances: "$record"
                }
            }
        ]
    ).sort({agents : 1})
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




exports.findAgentBestLower = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.id);
    Submission.aggregate(
        [
            {
                $match : {
                    $and :[
                        {$expr: { $eq: [ "$best_lower", true] }},
                        {$expr: { $eq: [  "$map_id", map_id] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         agents : 1,
            //     }
            // },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","agents":"$agents"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"agents":"$_id.agents"},
                    record: { $addToSet:{algo_name: "$algo_name",count:  "$count" }}
                }
            },
            {
                $project: {
                    _id: 0,
                    agents: "$_id.agents",
                    solved_instances: "$record"
                }
            }
        ]
    ).sort({agents : 1})
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


exports.findAgentBestSolution = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.id);
    Submission.aggregate(
        [
            {
                $match : {
                    $and :[
                        {$expr: { $eq: [ "$best_solution", true] }},
                        {$expr: { $eq: [  "$map_id", map_id] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         agents : 1,
            //     }
            // },
            {
                $group: {
                    _id: {"algo_id":"$algo_id","agents":"$agents"},
                    count: { $count: { } }
                }
            },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : '_id.algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },
            {
                $group: {
                    _id: {"agents":"$_id.agents"},
                    record: { $addToSet:{algo_name: "$algo_name",count:  "$count" }}
                }
            },
            {
                $project: {
                    _id: 0,
                    agents: "$_id.agents",
                    solved_instances: "$record"
                }
            }
        ]
    ).sort({agents : 1})
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


exports.findAgentSolutionCost = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.mapId);
    const scen_id = mongoose.Types.ObjectId(req.params.scenId);
    Submission.aggregate(
        [
            {
                $match : {
                    $and :[
                        {$expr: { $ne: [ "$solution_cost", null] }},
                        {$expr: { $eq: [  "$map_id", map_id] }},
                        {$expr: { $eq: [  "$scen_id", scen_id ] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         scen_id : 1,
            //         agents:1,
            //         solution_cost:1,
            //     }
            // },
            // {
            //     $match : {
            //         $expr: { $eq: [  "$scen_id", scen_id ] }
            //     }
            // },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : 'algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },

            {
                $group: {
                    _id: {"agents":"$agents"},
                    record: { $addToSet:{algo_name: "$algo_name", cost:  "$solution_cost" }}
                }
            },
            {
                $project:{
                    _id : 0,
                    agents : "$_id.agents",
                    record :  1,
                }
            },
        ]
    ).sort({agents : 1})
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

exports.findAgentLower = (req, res) => {
    const map_id = mongoose.Types.ObjectId(req.params.mapId);
    const scen_id = mongoose.Types.ObjectId(req.params.scenId);
    Submission.aggregate(
        [
            {
                $match : {
                    $and :[
                        {$expr: { $ne: [ "$lower_cost", null] }},
                        {$expr: { $eq: [  "$map_id", map_id] }},
                        {$expr: { $eq: [  "$scen_id", scen_id ] }}
                    ]
                }
            },
            // {
            //     $lookup : {
            //         from : 'instances',
            //         localField  : 'instance_id',
            //         foreignField : '_id',
            //         as : "instance_info"
            //     }
            // },
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$instance_info", 0 ] }, "$$ROOT" ] } }
            // },
            // {
            //     $project:{
            //         algo_id :  1,
            //         scen_id : 1,
            //         agents:1,
            //         lower_cost:1,
            //     }
            // },
            // {
            //     $match : {
            //         $expr: { $eq: [  "$scen_id", scen_id ] }
            //     }
            // },
            {
                $lookup : {
                    from : 'algorithms',
                    localField  : 'algo_id',
                    foreignField : '_id',
                    as : "algo_info"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$algo_info", 0 ] }, "$$ROOT" ] } }
            },

            {
                $group: {
                    _id: {"agents":"$agents"},
                    record: { $addToSet:{algo_name: "$algo_name", cost:  "$lower_cost" }}
                }
            },
            {
                $project:{
                    _id : 0,
                    agents : "$_id.agents",
                    record :  1,
                }
            },
        ]
    ).sort({agents : 1})
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
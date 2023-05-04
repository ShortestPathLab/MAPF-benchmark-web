module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            map_id: {type: mongoose.Schema.Types.ObjectId, ref: "map"},
            instance_id: {type: mongoose.Schema.Types.ObjectId, ref: "instance"},
            algo_id: {type: mongoose.Schema.Types.ObjectId, ref: "algorithm"},
            lower_cost: Number,
            solution_cost: Number,
            best_lower: Boolean,
            best_solution: Boolean,
            date: String,
            scen_id: {type: mongoose.Schema.Types.ObjectId, ref: "scenario"},
            agents: Number
        }
        , { versionKey: false }
    );



    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Submission = mongoose.model("submission", schema);
    return Submission ;
};
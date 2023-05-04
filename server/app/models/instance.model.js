module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            map_id: {type: mongoose.Schema.Types.ObjectId, ref: 'map'},
            scen_id: {type: mongoose.Schema.Types.ObjectId, ref: 'scenario'},
            agents: Number,

            lower_cost: Number,
            lower_algos: [{ algo_name: String, algo_id:{type: mongoose.Schema.Types.ObjectId, ref: 'algorithm'}, date: String }],
            lower_date: String,

            solution_cost: Number,
            solution_algos:  [{ algo_name: String, algo_id:{type: mongoose.Schema.Types.ObjectId, ref: 'algorithm'}, date: String }],
            solution_date: String,
            closed: Boolean,
            empty: Boolean,
            solution_path_id: {type: mongoose.Schema.Types.ObjectId, ref: 'solution_path'}
        }
    );


    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Instance = mongoose.model("instance", schema);
    return Instance;
};
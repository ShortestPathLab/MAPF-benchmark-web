module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            map_id: {type: mongoose.Schema.Types.ObjectId, ref: 'map'},
            scen_type: String,
            type_id: Number,
            instances: Number,
            instances_closed: Number,
            instances_solved: Number,
        }
    );


    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Scenario = mongoose.model("scenario", schema);
    return Scenario;
};
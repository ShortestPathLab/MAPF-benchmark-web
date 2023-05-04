module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            algo_name: String,
            authors: String,
            papers: String,
            github: String,
            comments: String,
            user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
            best_lower: Number,
            best_solution: Number,
            instances_closed: Number,
            instances_solved: Number
        }, {
            versionKey: false // You should be aware of the outcome after set to false
        }
    );


    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Algorithm = mongoose.model("algorithm", schema);
    return Algorithm;
};
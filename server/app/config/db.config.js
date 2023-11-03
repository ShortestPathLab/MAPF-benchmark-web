module.exports = {
  // url: "mongodb+srv://MAPF:MONASH@mapfbenchmark.zsijqdc.mongodb.net/MAPF_test?retryWrites=true&w=majority"
  // url: "mongodb://127.0.0.1:27017/MAPF_V2"
  url: process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/MAPF_V2"

};

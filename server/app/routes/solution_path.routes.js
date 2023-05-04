module.exports = app => {
    const solution_path = require("../controllers/solution_path.controller");

    var router = require("express").Router();
    // Retrieve a single Map with id
    router.get("/:id", solution_path.find_path);
    app.use("/api/solution_path", router);
};
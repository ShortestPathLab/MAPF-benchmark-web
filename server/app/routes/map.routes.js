module.exports = app => {
    const map = require("../controllers/map.controller.js");

    var router = require("express").Router();

    // Retrieve all Maps
    router.get("/", map.findAll);

    // Retrieve a single Map with id
    router.get("/:id", map.findOne);
    app.use("/api/map", router);
};
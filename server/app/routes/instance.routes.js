const instance = require("../controllers/instance.controller");
module.exports = app => {
    const instance = require("../controllers/instance.controller.js");

    var router = require("express").Router();

    // Retrieve all Instances
    router.get("/", instance.findAll);
    router.get("/:id",instance.findNonEmptyByScenId);
    router.get("/getAlgo/:id",instance.findAlgosRecord);
    router.get("/getPath/:id",instance.findPathById);
    router.get("/DownloadRow/:id",instance.downloadRowById);
    router.get("/DownloadInstance/:id",instance.downloadNonEmptyByScenId);
    router.get("/DownloadMapByID/:id",instance.downloadMapByID);
    router.get("/test/:id",instance.get_map_level_summary);
    // router.get("/test/:id",instance.test);
    // Retrieve a single Map with id
    app.use("/api/instance", router);
};
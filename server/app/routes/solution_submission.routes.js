const solution_submission = require("../controllers/solution_submission.controller");
module.exports = app => {
    const solution_submission = require("../controllers/solution_submission.controller.js");

    var router = require("express").Router();
    router.get("/leadingSolution/:id", solution_submission.findLeadingSolutionByInstance_id);
    router.get("/leadingSolution/:id/:agents", solution_submission.findLeadingSolutionByInstance_idAndAgents);

    app.use("/api/solution_submission", router);
};
const algorithm = require("../controllers/algorithm.controller");

module.exports = app => {
    const algorithm = require("../controllers/algorithm.controller");

    var router = require("express").Router();

    // Retrieve all Instances
    router.get("/", algorithm.findAll);
    router.get("/all_detail", algorithm.findAllDetails);
    router.get("/algo_detail/:id",algorithm.findOne);
    router.get("/submissions/:id",algorithm.findOne);
    router.get("/getClosedInfo/",algorithm.findBestClosed);
    router.get("/getLowerInfo/",algorithm.findBestLower);
    router.get("/getSolutionInfo/",algorithm.findBestSolution);
    router.get("/getSolvedInfo/",algorithm.findBestSolved);

    router.get("/getLeadingSolved/",algorithm.LeadingSolvedInfo);
    router.get("/getLeadingLower/",algorithm.LeadingLowerInfo);




    router.get("/getLowerInfoGroup/:id",algorithm.findBestLowerGroup);
    router.get("/getSolutionInfoGroup/:id",algorithm.findBestSolutionGroup);
    router.get("/getSolvedInfoGroup/:id",algorithm.findBestSolvedGroup);
    router.get("/getClosedInfoGroup/:id",algorithm.findBestClosedGroup);

    router.get("/test",algorithm.findBestLowerDomainQuery);

    router.get("/getDomainClosedInfo",algorithm.findClosedDomainQuery);
    router.get("/getDomainSolvedInfo",algorithm.findSolvedDomainQuery);
    router.get("/getDomainLowerInfo",algorithm.findBestLowerDomainQuery);
    router.get("/getDomainSolutionInfo",algorithm.findBestSolutionDomainQuery);

    router.get("/getScenClosedInfo/:id",algorithm.findScenBestClosed);
    router.get("/getScenSolvedInfo/:id",algorithm.findScenBestSolved);
    router.get("/getScenLowerInfo/:id",algorithm.findScenBestLower);
    router.get("/getScenSolutionInfo/:id",algorithm.findScenBestSolution);


    router.get("/getAgentClosedInfo/:id",algorithm.findAgentBestClosed);
    router.get("/getAgentSolvedInfo/:id",algorithm.findAgentBestSolved);
    router.get("/getAgentLowerInfo/:id",algorithm.findAgentBestLower);
    router.get("/getAgentSolutionInfo/:id",algorithm.findAgentBestSolution);


    router.get("/getAgentSolutionCost/:mapId&:scenId",algorithm.findAgentSolutionCost);
    router.get("/getAgentLower/:mapId&:scenId",algorithm.findAgentLower);

    // Retrieve a single Map with id
    app.use("/api/algorithm", router);
};
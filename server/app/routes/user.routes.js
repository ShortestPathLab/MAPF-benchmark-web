const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/userAlgo/:id", [authJwt.verifyToken], controller.findSubmittedAlgoByID);
    app.put("/api/user/updateAlgo/:id", [authJwt.verifyToken], controller.updateAlgoByID);
    app.put("/api/user/createAlgo", [authJwt.verifyToken], controller.createAlgo);
    app.post("/api/user/checkAlgo/:id", [authJwt.verifyToken], controller.checkAlgoExist);
    app.get("/api/user/getMapSubmittedInfo/:id", [authJwt.verifyToken], controller.getMapSubmittedInfo);
    app.put("/api/user/submitChunkResults/:id", [authJwt.verifyToken],  controller.submitData);
    app.put("/api/user/updateProgress/:id", [authJwt.verifyToken], controller.updateProgress);
};
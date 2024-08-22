const { Router } = require("express");
const { gethealth } = require("../handlers/health")
const healthRouter = Router();

healthRouter.get("/", gethealth);


module.exports = {
    healthRouter,
}
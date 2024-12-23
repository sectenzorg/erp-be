const useraccessController = require("../controllers/useraccess.controller");
const auth = require("../middlewares/auth");
async function routes(fastify, options){
    fastify.get("/getalluseraccess", { preHandler: auth }, useraccessController.getAllUserAccess);
}
module.exports = routes;
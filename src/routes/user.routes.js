const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

async function routes(fastify, options){
    fastify.get("/getalluser", { preHandler: auth }, userController.getAllUsers);
    fastify.get("/getuser/:id",userController.getUserById);
    fastify.post("/adduser", { preHandler: auth }, userController.createUser);
    fastify.put("/updateuser/:id",userController.updateUser);
    fastify.delete("/deleteuser/:id",userController.deleteUser);
    fastify.post("/generatevoucher", userController.generateVoucher);
}
module.exports = routes;
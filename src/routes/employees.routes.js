const employeesController = require("../controllers/employees.controller");
const auth = require("../middlewares/auth");
async function routes(fastify, options){
    // Add a global hook for token verification
    fastify.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ ack:0, error: 'Unauthorized.' }); // Handle unauthorized access
        }
    });
    fastify.get("/getjakartatime", employeesController.getjakartatime);
    fastify.get("/getallemployee", { preHandler: auth }, employeesController.getAllEmployee);
    fastify.post("/getallemployeebycode", { preHandler: auth }, employeesController.getAllEmployeeByCode);
    fastify.post("/getallemployeebydept", { preHandler: auth }, employeesController.getAllEmployeeByDept);
    fastify.post("/getemployeebyid", { preHandler: auth }, employeesController.getEmployeeById);
    fastify.post("/addemployee", { preHandler: auth }, employeesController.addEmployee);
    fastify.post("/editemployee", { preHandler: auth }, employeesController.editemployee);
    fastify.post("/updatepassword", { preHandler: auth }, employeesController.updatePassword);
    fastify.post("/passwordencrypt", { preHandler: auth }, employeesController.passencrypt);
    fastify.post("/passwordverify", { preHandler: auth }, employeesController.passwordverify);
}
module.exports = routes;
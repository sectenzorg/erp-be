const appflowsettingsController = require("../controllers/appflowsettings.controller");
const auth = require("../middlewares/auth");
async function routes(fastify, options){
    fastify.get("/getallappflow", { preHandler: auth }, appflowsettingsController.getAllAppFlow);
    fastify.post("/getappflowbymenucode", { preHandler: auth }, appflowsettingsController.getAppFlowByMenucode);
    fastify.post("/insertappflow", { preHandler: auth }, appflowsettingsController.insertAppFlow);
    fastify.post("/updateappflow", { preHandler: auth }, appflowsettingsController.updateAppFlow);
    fastify.post('/generateToken', { preHandler: auth }, async (request, reply) => {
        const guestToken = fastify.jwt.sign({ role: 'guest', sessionId: Date.now() }, { expiresIn: '1h' });
        return { token: guestToken };
    });
    fastify.post("/checkuser", { preHandler: auth }, appflowsettingsController.checkUser);
}
module.exports = routes;
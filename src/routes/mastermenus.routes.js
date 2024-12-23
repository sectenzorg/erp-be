const mastermenusController = require("../controllers/mastermenus.controller");
const auth = require("../middlewares/auth");
async function routes(fastify, options){
    fastify.get("/getallmenugroup", { preHandler: auth }, mastermenusController.getAllMenu);
    fastify.post("/getallmenubygroupid", { preHandler: auth }, mastermenusController.getAllMenuByGroupId);
    fastify.post("/getmenudata", { preHandler: auth }, mastermenusController.getAllMenuBySearch);
    fastify.post("/getmenubymenucode", { preHandler: auth }, mastermenusController.getMenuByMenuCode);
    fastify.post("/getmenubymenuname", { preHandler: auth }, mastermenusController.getMenuByMenuName);
    fastify.post("/getmenubygroupcode", { preHandler: auth }, mastermenusController.getMenuByGroupCode);
    fastify.post("/getmenubygroupname", { preHandler: auth }, mastermenusController.getMenuByGroupName);
    fastify.post("/insertmenugroup", { preHandler: auth }, mastermenusController.insertMenuGroup);
    fastify.post("/insertmenu", { preHandler: auth }, mastermenusController.insertmenu);
    fastify.post("/insertsubmenu", { preHandler: auth }, mastermenusController.insertsubmenu);
    fastify.put("/updatemenugroup",{ preHandler: auth }, mastermenusController.updatemenugroup);
    fastify.put("/updatemenu",{ preHandler: auth }, mastermenusController.updateMenu);
    fastify.put("/updatesubmenu",{ preHandler: auth }, mastermenusController.updateSubMenu);
    fastify.get("/testmenu",{ preHandler: auth }, mastermenusController.testMenu);
}
module.exports = routes;
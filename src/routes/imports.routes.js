const importsController = require("../controllers/imports.controller");
const auth = require("../middlewares/auth");
const {SecretsManagerClient, GetSecretValueCommand} = require("@aws-sdk/client-secrets-manager");
async function routes(fastify, options){
    fastify.post("/importdata",{preHandler:auth},importsController.importData);
    fastify.post("/exportdata",{preHandler:auth},importsController.exportData);
    fastify.post("/generatepdf",{preHandler:auth},importsController.generatePdf);
    fastify.post("/sendemail",{preHandler:auth},importsController.sendEmail);
    fastify.post("/sendawsemail",{preHandler:auth},importsController.sendAwsEmail);
    fastify.get("/testaws",{preHandler:auth},importsController.testaws);
}
module.exports = routes;
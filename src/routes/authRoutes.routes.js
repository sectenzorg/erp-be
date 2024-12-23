const authController = require('../controllers/authController');
async function authRoutes(fastify, options) {
    // Login route
    fastify.post('/login', (request, reply) => {
        authController.login(fastify, request, reply);
    });
}
module.exports = authRoutes;
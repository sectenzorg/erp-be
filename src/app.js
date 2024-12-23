const fastify = require("fastify")({logger: true});
const fastifyJwt = require('@fastify/jwt');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://appbekunci:Bl81YE4dkfHOmWbR@bersandev.k55o8.mongodb.net/?retryWrites=true&w=majority&appName=bersanDev";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//import env
require("dotenv").config();
const auth = require("./middlewares/auth");
//import routes
const userRoutes = require("./routes/user.routes");
const mastermenusRoutes = require("./routes/mastermenus.routes");
const employeesRoutes = require("./routes/employees.routes");
const useraccessRoutes = require("./routes/useraccess.routes");
const issuelogsRoutes = require("./routes/issuelogs.routes");
const companypoliciesRoutes = require("./routes/companypolicies.routes");
const appflowsettingsRoutes = require("./routes/appflowsettings.routes");
const authRoutes = require("./routes/authRoutes.routes");
//connect database
/*mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("connected to DB"))
.catch((e) => console.log("Error connecting to DB",e));*/
//start server
fastify.register(fastifyJwt, {
    secret: process.env.JWTOKEN
});
fastify.register(authRoutes, {prefix: '/api/v1/auth'});
fastify.register(userRoutes, {prefix: '/api/v1/users'});
fastify.register(mastermenusRoutes, {prefix: '/api/v1/menu'});
fastify.register(employeesRoutes, {prefix: '/api/v1/emp'});
fastify.register(useraccessRoutes, {prefix: '/api/v1/usraccess'});
fastify.register(issuelogsRoutes, {prefix: '/api/v1/issuelogs'});
fastify.register(companypoliciesRoutes, {prefix: '/api/v1/policy'});
fastify.register(appflowsettingsRoutes, {prefix: '/api/v1/appflow'});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
const start = async () => {
    try {
        await fastify.listen({
            port: parseInt(process.env.PORT || "3100"),
            host: "0.0.0.0",
        });
        fastify.log.info(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
};
start();
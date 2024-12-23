require('dotenv').config();
async function auth(request, reply) {
    const apiKey = request.headers['s-tkn-brsn'];
    const knownKey=process.env.APIKEY;
    if(!apiKey || apiKey!==knownKey){
        resp = {
            "statuscode"    : 401,
            "ack"           : 0,
            "message"       : 'Unauthorized',
            "datares"       : []
        }
        return reply.code(401).send(resp);
    }
}
module.exports = auth;
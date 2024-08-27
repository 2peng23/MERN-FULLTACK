const serverless = require("serverless-http");
const app = require("../../index"); // Adjust the path if necessary

module.exports.handler = serverless(app);

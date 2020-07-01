import express from "express";
import next from "next";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
var port = parseInt(process.env.PORT, 10) || 3000;
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = express();
    // Construct a schema, using GRAPHQL schema language
    var schema = buildSchema("\n      type Query {\n        hello: String\n      }\n  ");
    // The root provides a resolver for each API endpoint
    var root = {
        hello: function () {
            return "Hello World!";
        }
    };
    server.use("/graphql", graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));
    server.all("*", function (req, res) {
        return handle(req, res);
    });
    server.listen(port, function (err) {
        if (err)
            throw err;
        console.log("> Ready on http://localhost:" + port);
    });
});

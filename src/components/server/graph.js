const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const GraphQLSchema = require('./graphSchema.js');
const _ = require('lodash');
const  connect =require( "./monconn.js");
const  cors =require("cors");
connect().then(r => console.log("Connected to MongoDB"));
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: true, // Enable the GraphiQL interface for testing
}));


app.listen(5000, () => console.log('Now browse to localhost:5000/graphql'));

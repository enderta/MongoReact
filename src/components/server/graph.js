const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const GraphQLSchema = require('./graphSchema.js');
const _ = require('lodash');

const app = express();



app.use('/graphql', graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: true, // Enable the GraphiQL interface for testing
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

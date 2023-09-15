const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_SECRET });

// Exporting the client and queries for use elsewhere in your app
module.exports = {
    client,
    q
};

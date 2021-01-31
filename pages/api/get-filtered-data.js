// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GET_FILTERED_CAPACITY_DATA } from "../../graphql/queries";

export default async (req, res) => {

  const variables = {
    name: req.query['name'],
    dateOfSailing: req.query['dateOfSailing']
  }

  console.log("NAME: ", variables)
  
  if (decodeURIComponent(req.headers['x-password']) !== process.env.DASHBOARD_PASSWORD) {
    console.log("Password does not match...")
    res.statusCode = 401
    return res.json({capacity_data: []})
  }


  const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
    cache: new InMemoryCache(),
  });

  const { data, loading } = await client.query({
    query: GET_FILTERED_CAPACITY_DATA,
    variables,
  });

  res.statusCode = 200
  res.json({capacity_data: data.capacity_data})
}

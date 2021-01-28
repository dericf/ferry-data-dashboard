// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GET_LIMITED_CAPACITY_DATA } from "../../graphql/queries";

export default async (req, res) => {
  
  const client = new ApolloClient({
    uri: "https://ferry-data.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
    cache: new InMemoryCache(),
  });

  const { data, loading } = await client.query({
    query: GET_LIMITED_CAPACITY_DATA
  });

  res.statusCode = 200
  res.json({capacity_data: data.capacity_data})
}

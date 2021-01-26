// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default async (req, res) => {
  
  const client = new ApolloClient({
    uri: "https://ferry-data.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
    cache: new InMemoryCache(),
  });

  const { data, loading } = await client.query({
    query: gql`
      query GetCapacityData {
        capacity_data(order_by: {id: desc, crossing_name: asc, date_recorded: asc, time_recorded: asc }, limit: 100) {
          created_at
          crossing_name
          date_recorded
          id
          percent_available
          time_of_sailing
          date_of_sailing
          time_recorded
          updated_at
        }
      }
    `,
  });

  res.statusCode = 200
  res.json({capacity_data: data.capacity_data})
}

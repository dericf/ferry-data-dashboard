/*
  * https://www.npmjs.com/package/react-csv
*/
import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CSVLink } from "react-csv";

export default function Dashboard({ data, loading }) {
  
  const headers = [
    { label: "id", key: "id" },
    { label: "crossing_name", key: "crossing_name" },
    { label: "time_of_sailing", key: "time_of_sailing" },
    { label: "date_recorded", key: "date_recorded" },
    { label: "time_recorded", key: "time_recorded" },
    { label: "percent_available", key: "percent_available" },
    { label: "created_at", key: "created_at" },
    { label: "updated_at", key: "updated_at" },
  ];

  let formatted_date_string = new Date().toUTCString().replace(/ /g, "_").replace(/,/g, "").replace(/:/g, "_")

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Head>
        <title>Ferry Data Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          minHeight: "50vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#303030",
          color: "white",
          padding: "2rem",
        }}
      >
        <div className="flex flex-center align-center">
          <h1 style={{ textAlign: "center" }}>Capacity Data</h1>
          {/* <button className="button" onClick={downloadData}>Download</button> */}
          {!loading && (
            <CSVLink className="button" data={data} headers={headers} filename={`ferry-data-${formatted_date_string}.csv`} download={`ferry-data-${formatted_date_string}.csv`}>
              Download me
            </CSVLink>
          )}
        </div>

        {!loading && (
          <table>
            <thead>
              <tr>
                <th>Crossing Name</th>
                <th>Time of Sailing</th>
                <th className="center">Capacity (% Available)</th>
                <th>Date / Time Recorded</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="left">{row.crossing_name}</td>
                  <td className="right">{row.time_of_sailing}</td>
                  <td className="center">% {row.percent_available}</td>
                  <td className="right">
                    {row.date_recorded} at {row.time_recorded}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
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
        capacity_data(order_by: { crossing_name: asc }) {
          created_at
          crossing_name
          date_recorded
          id
          percent_available
          time_of_sailing
          time_recorded
          updated_at
        }
      }
    `,
  });
  console.log("data: ");
  console.log(data);

  return {
    props: {
      data: data.capacity_data,
      loading: loading,
    },
    revalidate: 30,
  };
}

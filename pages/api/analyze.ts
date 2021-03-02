// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestQuery } from "next/dist/next-server/server/api-utils";
import { GET_FILTERED_CAPACITY_DATA } from "../../graphql/queries";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query: NextApiRequestQuery = req.query;
  // Add all variables that the server endpoint needs to make the prediction.
  const body = {
    name: query["name"],
    dateOfSailing: query["dateOfSailing"],
    // TODO: Add time of sailing
    // TODO: Add location GPS coords
  };

  console.log("Vars: ", query);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/app/analyze`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const json = await response.json();

    res.statusCode = 200;
    res.json(json);
  } catch (error) {
    console.log("error making prediction", error);
    res.statusCode = 400;
    res.json({ error });
  }
};

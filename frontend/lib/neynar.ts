import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import { FeedType } from "@neynar/nodejs-sdk/build/api";

const config = new Configuration({
  apiKey:process.env.NEYNAR_API_KEY || '',
});

const client = new NeynarAPIClient(config);


async function fetchUser() {
  const fids = [834703];

  const { users } = await client.fetchBulkUsers({ fids });
  console.log("User :", users[0]);
}

fetchUser();

// https://docs.neynar.com/reference/lookup-user-by-username
// this will be used to fetch user's eth address by there username data at data.json
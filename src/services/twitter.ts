import fetch from "node-fetch";
import credentials from "./credentials";

const api = (
  route: string,
  method: "POST" | "GET" | "PUT" | "DELETE" = "GET"
) =>
  fetch(`https://api.twitter.com/1.1/${route}`, {
    headers: {
      authorization: `Bearer ${credentials.TWITTER_BEARER_TOKEN}`,
    },
    method,
  });

type Trend = {
  name: string;
  url: string;
  promoted_content: boolean | null;
  query: string;
  tweet_volume: number | null;
};

const getTrends = async () => {
  // Brazil WOEID
  const WOEID = "23424768";
  const response = await api(`trends/place.json?id=${WOEID}`);
  const [data] = (await response.json()) as [{ trends: Trend[] }];

  return data.trends;
};

export default {
  getTrends,
};

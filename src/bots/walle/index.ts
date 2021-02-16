import twitter from "../../services/twitter";

const getTrendsFromTwitter = async () => {
  const trends = await twitter.getTrends();
  const sortedTrends = trends.sort((a, b) =>
    (a.tweet_volume ?? 0) > (b.tweet_volume ?? 0) ? -1 : 1
  );
  return sortedTrends;
};

async function start() {
  const twitterTrends = await getTrendsFromTwitter();
  console.log({ twitterTrends });
  return [];
}

export default { start };

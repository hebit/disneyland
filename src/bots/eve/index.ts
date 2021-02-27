//@ts-ignore
import algorithmia from "algorithmia";
import { Article, WithKeywords } from "../../types";

// import twitter from "../../services/twitter";

// const getTrendsFromTwitter = async () => {
//   const trends = await twitter.getTrends();
//   const sortedTrends = trends.sort((a, b) =>
//     (a.tweet_volume ?? 0) > (b.tweet_volume ?? 0) ? -1 : 1
//   );
//   return sortedTrends;
// };

const sortTags = (tagsObj: { [key: string]: number }) => {
  const entries = Object.entries(tagsObj)
    .sort(([_, a], [__, b]) => (a > b ? 1 : -1))
    .map(([key]) => key);
  return entries;
};

const getArticleKeywords = async (client: any, article: Article) => {
  let keywords: string[] = [];
  try {
    console.log(`Getting article keywords...`);
    const analyzerAlgorithm = client.algo("outofstep/MegaAnalyzeURL/0.1.8");
    const analyzerResponse = await analyzerAlgorithm.pipe(article.url);
    const analyzerContent = analyzerResponse.get();

    keywords = sortTags(analyzerContent.tags);
  } catch {
    keywords = [];
  }
  console.log(
    `[✓] - Keywords for '${article.title}' article:`,
    keywords.join(", ")
  );
  return { ...article, keywords } as WithKeywords<Article>;
};

const start = async (articles: Article[]) => {
  const client = algorithmia(process.env.ALGORITHMIA_API_KEY);
  const articlePromises = articles.map((article) =>
    getArticleKeywords(client, article)
  );
  return await Promise.all(articlePromises);
};

export default { start };

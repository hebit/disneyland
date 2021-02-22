import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import fetch from "node-fetch";
import { Headline, Article } from "../../types";

const getHeadlinesFromGoogleNews = async () => {
  console.log("Fetching headlines...");
  const url =
    "https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRFZ4ZERBU0JYQjBMVUpTS0FBUAE?hl=pt-BR&gl=BR&ceid=BR%3Apt-419";
  const res = await fetch(url);
  const text = await res.text();
  const dom = new JSDOM(text);

  const allHeadlines = Array.from(
    dom.window.document.querySelectorAll("article")
  )
    .map((element: any) => ({
      title: element.querySelector("h3")?.textContent as string | undefined,
      url: element.querySelector("a").href as string,
    }))
    .filter((headline) => headline.title);

  const headlinesPromises = allHeadlines.slice(0, 10).map(async (headline) => {
    const res = await fetch(headline.url);
    const text = await res.text();
    const dom = new JSDOM(text);
    const url: string = dom.window.document.querySelector('a[rel="nofollow"]')
      .href;

    return { ...headline, url: url ?? headline.url };
  });

  const headlines = await Promise.all(headlinesPromises);
  console.log("[✓] - Headlines fetched (the first 10)");
  return headlines as Headline[];
};

const fetchHeadlines = async (headlines: Headline[]) => {
  console.log("Fetcing headlines content...");
  const headlinesContentPromises = headlines.map(async (headline) => {
    const res = await fetch(headline.url);
    const text = await res.text();
    const dom = new JSDOM(text);
    const reader = new Readability(dom.window.document);

    return { ...reader.parse(), url: headline.url };
  });

  const headlinesContent = await Promise.all(headlinesContentPromises);
  const validArticles = headlinesContent.filter(
    (article) => article !== null
  ) as Article[];

  console.log(
    "[✓] - Articles fetched:",
    validArticles.map((article) => article.title)
  );
  return validArticles;
};
async function start() {
  const headlines = await getHeadlinesFromGoogleNews();
  const articles = await fetchHeadlines(headlines);

  return articles;
}

export default { start };

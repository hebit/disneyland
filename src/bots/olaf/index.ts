import fs from "fs";
import path from "path";
import { WithKeywords, Article } from "../../types";

const gerenateMarkdownStr = (
  date: string,
  articles: WithKeywords<Article>[]
) => {
  console.log("Converting article data to markdown...");
  const articlesContentMarkdownStr = articles.map((article) => {
    return (
      `## ${article.title}  \n` +
      `**Keywords:${
        article.keywords.length > 0 ? " " + article.keywords.join(", ") : ""
      }**  \n` +
      `${article.summary?.replace("\t", "").trim() ?? article.textContent.trim().replace("\n", "  \n\n")}  \n` +
      `[Fonte: ${article.siteName ?? article.url}](${article.url})`
    );
  });
  console.log("[✓] - All articles converted");
  return `# ${date}  \n` + `${articlesContentMarkdownStr.join("\n\n")}`;
};

const saveMarkdownFile = (date: string, content: string) => {
  const dir = path.join(__dirname, "..", "..", "..", "out", date);
  console.log("Creating Markdown file...");
  if (!fs.existsSync(dir)) {
    console.log("\t - Creating directory...");
    fs.mkdirSync(dir);
  }
  const filename = "script.md";
  fs.writeFileSync(path.join(dir, filename), content);
  console.log("[✓] - All articles saved");
};

const start = (articles: WithKeywords<Article>[]) => {
  const dateStr = new Date().toISOString();
  const markdownContent = gerenateMarkdownStr(dateStr, articles);
  saveMarkdownFile(dateStr, markdownContent);
};

export default { start };

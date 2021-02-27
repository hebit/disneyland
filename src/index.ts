import dotenv from "dotenv";
import walle from "./bots/walle";
import eve from "./bots/eve";
import olaf from "./bots/olaf";

// load .env variables
dotenv.config();

// start application
async function start() {
  const articles = await walle.start();
  const articlesWithKeywords = await eve.start(articles);
  olaf.start(articlesWithKeywords);
}

start();

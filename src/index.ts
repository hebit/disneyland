import dotenv from "dotenv";
import walle from "./bots/walle";

// load .env variables
dotenv.config();

// start application
async function start() {
  const articles = await walle.start();
}

start();

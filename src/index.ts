import walle from "./bots/walle";

// start application
async function start() {
  const articles = await walle.start();
}

start();

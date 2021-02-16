//@ts-ignore
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import fetch from "node-fetch";

// start application

async function start() {
  // const news = walle();
  const url =
    "https://g1.globo.com/economia/pix/noticia/2021/02/16/pix-completa-3-meses-em-operacao-liderando-em-numero-de-transferencias-ted-segue-a-frente-em-valores.ghtml";
  const res = await fetch(url);
  const text = await res.text();
  // return console.log({ res, text });
  const doc: any = new JSDOM(text, {
    url,
  });

  const reader = new Readability(doc.window.document);
  console.log(reader.parse()?.content);
}

start();

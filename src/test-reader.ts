// import walle from "./bots/walle";
import { extract } from "article-parser";

// start application

async function start() {
  // const news = walle();
  const url =
    "https://www1.folha.uol.com.br/poder/2021/02/oposicao-defende-em-publico-processo-de-impeachment-mas-atua-por-desgaste-de-bolsonaro-ate-2022.shtml";
  // "https://economia.estadao.com.br/noticias/geral,na-contramao-dos-bancos-e-com-apoio-do-bc-cooperativas-abrem-agencias-no-pais,70003617673";
  // "https://g1.globo.com/economia/pix/noticia/2021/02/16/pix-completa-3-meses-em-operacao-liderando-em-numero-de-transferencias-ted-segue-a-frente-em-valores.ghtml";
  const article = await extract(url);
  console.log({ article });
}

start();

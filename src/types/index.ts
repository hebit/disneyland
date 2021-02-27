import { Readability } from "@mozilla/readability";

export type Headline = {
  title: string;
  url: string;
};

export type Article = NonNullable<ReturnType<Readability["parse"]>> & {
  url: string;
};

export type WithKeywords<T extends Article> = T & { keywords: string[] };

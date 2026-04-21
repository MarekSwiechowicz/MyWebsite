import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export type Article = ArticleMeta & {
  content: string;
};

/** Slugs z plików `*.mdx` (bez `*.pl.mdx`) — kanoniczna lista pod routing. */
export function getCanonicalArticleSlugs(): string[] {
  return fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith(".mdx") && !f.endsWith(".pl.mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readArticleMetaFromFile(fullPath: string, slug: string): ArticleMeta {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
  };
}

export function getAllArticles(locale = "en"): ArticleMeta[] {
  const slugs = getCanonicalArticleSlugs();

  return slugs
    .map((slug) => {
      const plPath = path.join(articlesDirectory, `${slug}.pl.mdx`);
      const enPath = path.join(articlesDirectory, `${slug}.mdx`);

      if (locale === "pl" && fs.existsSync(plPath)) {
        return readArticleMetaFromFile(plPath, slug);
      }

      return readArticleMetaFromFile(enPath, slug);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string, locale = "en"): Article {
  const plPath = path.join(articlesDirectory, `${slug}.pl.mdx`);
  const enPath = path.join(articlesDirectory, `${slug}.mdx`);
  const fullPath =
    locale === "pl" && fs.existsSync(plPath) ? plPath : enPath;

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Article not found: ${slug} (locale: ${locale})`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
    content,
  };
}

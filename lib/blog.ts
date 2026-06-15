import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

// Estimation du temps de lecture (~200 mots/min).
function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPostFile(slug: string): Post | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? String(data.date).slice(0, 10) : "1970-01-01",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingMinutes: readingTime(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readPostFile(f.replace(/\.mdx$/, "")))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(
      (p): PostMeta => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date,
        tags: p.tags,
        readingMinutes: p.readingMinutes,
      }),
    );
}

export function getPost(slug: string): Post | null {
  return readPostFile(slug);
}

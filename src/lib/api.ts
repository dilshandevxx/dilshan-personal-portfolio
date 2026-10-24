export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  published_at: string;
  tag_list: string[];
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  body_html?: string;
}

const DEV_TO_API_URL = "https://dev.to/api/articles";

export async function getLatestArticles(perPage = 6): Promise<DevToArticle[]> {
  try {
    const res = await fetch(`${DEV_TO_API_URL}?per_page=${perPage}&state=fresh`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return [];
  }
}

export async function getArticleById(id: string): Promise<DevToArticle | null> {
  try {
    const res = await fetch(`${DEV_TO_API_URL}/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    return null;
  }
}

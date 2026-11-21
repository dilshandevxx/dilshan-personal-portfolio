/**
 * Sanity Client & Service Interface
 * Integrates with live Sanity if environment variables are present,
 * while safely reporting configuration status so local fallback works deterministically.
 */

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
  useCdn: boolean;
}

export const sanityConfig: SanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-01",
  token: process.env.SANITY_API_TOKEN || "",
  useCdn: process.env.NODE_ENV === "production",
};

export function isSanityConfigured(): boolean {
  return Boolean(
    sanityConfig.projectId &&
      sanityConfig.projectId.trim() !== "" &&
      sanityConfig.dataset &&
      sanityConfig.dataset.trim() !== ""
  );
}

/**
 * Execute GROQ Query against Sanity API
 */
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodedQuery}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (sanityConfig.token) {
      headers["Authorization"] = `Bearer ${sanityConfig.token}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[Sanity] Query failed with status ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data.result as T;
  } catch (err) {
    console.error("[Sanity] Network error querying Sanity API:", err);
    return null;
  }
}

/**
 * Execute mutations on Sanity (Create, Patch, Delete)
 */
export async function sanityMutate(mutations: any[]): Promise<any> {
  if (!isSanityConfigured() || !sanityConfig.token) {
    return { success: false, reason: "Sanity credentials or API token missing in environment." };
  }

  try {
    const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/mutate/${sanityConfig.dataset}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sanityConfig.token}`,
      },
      body: JSON.stringify({ mutations }),
    });

    return await res.json();
  } catch (err) {
    console.error("[Sanity] Mutation failed:", err);
    return { success: false, error: err };
  }
}

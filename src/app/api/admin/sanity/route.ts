import { NextResponse } from "next/server";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "p8xc6qyp";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const TOKEN = process.env.SANITY_API_TOKEN;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, query, params, mutations } = body;

    if (!TOKEN) {
      return NextResponse.json(
        { error: "SANITY_API_TOKEN is not configured on the server." },
        { status: 500 }
      );
    }

    if (action === "query" && query) {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodedQuery}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        cache: "no-store",
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

    if (action === "mutate" && mutations) {
      const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Sanity API Error" }, { status: 500 });
  }
}

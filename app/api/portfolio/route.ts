import { NextResponse } from "next/server";
import { getPortfolioItems, addPortfolioItem } from "@/lib/db";

export async function GET() {
  try {
    const items = getPortfolioItems();
    return NextResponse.json({ success: true, data: items });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ success: false, error: "Title and category are required" }, { status: 400 });
    }

    const newItem = addPortfolioItem({
      title: body.title,
      category: body.category,
      discipline: body.discipline || "web",
      image: body.image || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=85",
      year: body.year || new Date().getFullYear().toString(),
      client: body.client || "",
      summary: body.summary || "",
      description: body.description || "",
      tags: body.tags || [],
      liveUrl: body.liveUrl || "",
      featured: Boolean(body.featured),
    });

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to add portfolio item" }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "cryptocurrency";
    const pageSize = searchParams.get("pageSize") || "20";

    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "NEWS_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const url = new URL("https://newsapi.org/v2/everything");

    url.searchParams.set("q", query);
    url.searchParams.set("pageSize", pageSize);
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("language", "en");
    url.searchParams.set("apiKey", apiKey);

    const response = await fetch(url.toString(), {
      next: {
        revalidate: 300,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data?.message || "Unable to fetch news",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("News API error:", error);

    return NextResponse.json(
      {
        message: "News request failed",
      },
      {
        status: 500,
      }
    );
  }
}
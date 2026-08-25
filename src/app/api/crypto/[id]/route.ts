import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const url = new URL(
      `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}/market_chart`
    );

    url.searchParams.set("vs_currency", "usd");
    url.searchParams.set("days", "7");

    const response = await fetch(url.toString(), {
      next: {
        revalidate: 300,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data?.error || "Unable to fetch crypto chart data",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Crypto chart API error:", error);

    return NextResponse.json(
      {
        message: "Crypto chart request failed",
      },
      {
        status: 500,
      }
    );
  }
}
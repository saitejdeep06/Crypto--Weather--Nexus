import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || "Anantapur";

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "OPENWEATHER_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const url = new URL(
      "https://api.openweathermap.org/data/2.5/forecast"
    );

    url.searchParams.set("q", city);
    url.searchParams.set("appid", apiKey);
    url.searchParams.set("units", "metric");

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
            data?.message || "Unable to fetch weather forecast.",
        },
        {
          status: response.status,
        }
      );
    }

    const dailyMap = new Map<
      string,
      {
        date: string;
        temperature: number;
        description: string;
        icon: string;
      }
    >();

    for (const item of data.list || []) {
      const date = new Date(item.dt * 1000);

      const key = date.toISOString().split("T")[0];

      if (!dailyMap.has(key)) {
        dailyMap.set(key, {
          date: date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          }),
          temperature: Math.round(item.main.temp),
          description: item.weather?.[0]?.description || "Unknown",
          icon: item.weather?.[0]?.icon || "01d",
        });
      }
    }

    const forecast = Array.from(dailyMap.values()).slice(0, 5);

    return NextResponse.json({ forecast });
  } catch (error) {
    console.error("Weather forecast API error:", error);

    return NextResponse.json(
      {
        message: "Weather forecast request failed.",
      },
      {
        status: 500,
      }
    );
  }
}
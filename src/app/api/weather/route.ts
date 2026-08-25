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

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data?.message || "Unable to fetch weather data.",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API error:", error);

    return NextResponse.json(
      {
        message: "Weather request failed.",
      },
      {
        status: 500,
      }
    );
  }
}
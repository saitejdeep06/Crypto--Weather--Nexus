import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,dogecoin&vs_currencies=usd&include_24hr_change=true",
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
          message: data?.error || "Unable to fetch crypto data",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Crypto API error:", error);

    return NextResponse.json(
      {
        message: "Crypto request failed",
      },
      {
        status: 500,
      }
    );
  }
}

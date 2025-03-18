import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received Frame Data:", data);

    return NextResponse.json(
      {
        "fc:frame": "vNext",
        "fc:frame:image": "https://yourdomain.com/response-image.png",
        "fc:frame:image:aspect_ratio": "1.91:1",
        "fc:frame:button:1": "Clicked!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Farcaster Frame",
  description: "A simple frame with a button",
  openGraph: {
    images: ["https://yourdomain.com/frame-image.png"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://yourdomain.com/frame-image.png",
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:post_url": "https://yourdomain.com/api/frame-handler",
    "fc:frame:button:1": "Click Me",
    "fc:frame:button:1:action": "post",
  },
};

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Frame</h1>
      <p>This is a Next.js-based Farcaster Frame.</p>
    </div>
  );
}

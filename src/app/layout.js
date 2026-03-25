import "./globals.css";
import ThemeBootstrap from "@/components/ThemeBootstrap";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Watt Pulse",
    template: "%s | Watt Pulse",
  },
  description:
    "Watt Pulse is a smart resource monitoring platform for live electricity, water, and carbon insights.",
  applicationName: "Watt Pulse",
  keywords: [
    "resource monitoring",
    "electricity dashboard",
    "water usage tracking",
    "carbon footprint",
    "smart monitoring",
  ],
  openGraph: {
    title: "Watt Pulse",
    description:
      "Smart resource monitoring for electricity, water, alerts, and sustainability insights.",
    type: "website",
    siteName: "Watt Pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watt Pulse",
    description:
      "Smart resource monitoring for electricity, water, alerts, and sustainability insights.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body>
        <ThemeBootstrap />
        {children}
      </body>
    </html>
  );
}

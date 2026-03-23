import "./globals.css";

export const metadata = {
  title: "Watt Pulse",
  description:
    "Watt Pulse is a smart resource monitoring platform for live electricity, water, and carbon insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body>{children}</body>
    </html>
  );
}

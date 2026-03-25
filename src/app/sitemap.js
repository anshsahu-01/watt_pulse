const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function sitemap() {
  const routes = [
    "/",
    "/login",
    "/forgot-password",
    "/dashboard",
    "/electricity",
    "/water",
    "/carbon",
    "/reports",
    "/settings",
    "/notifications",
    "/mail",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/dashboard" ? "daily" : "weekly",
    priority: route === "/dashboard" ? 1 : 0.7,
  }));
}

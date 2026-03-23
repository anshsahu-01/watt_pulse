import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/dashboard";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const data = await getDashboardData();
  return NextResponse.json(data);
}

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    publicSiteName: process.env.NEXT_PUBLIC_SITE_NAME ?? null,
    storeRegion: process.env.STORE_REGION ?? "non configurée",
    note: "storeRegion est une variable serveur, invisible côté client sans cette route",
  });
}

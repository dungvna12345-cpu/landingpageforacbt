import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenFromReq, verifyToken } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const page = await prisma.page.findUnique({
      where: { slug },
    });

    if (!page) {
      return NextResponse.json({ error: "Trang không tồn tại" }, { status: 404 });
    }

    if (page.status === "DRAFT") {
      // Allow admins or editors to preview drafts
      const token = getTokenFromReq(req);
      if (!token) {
        return NextResponse.json({ error: "Trang chưa được xuất bản" }, { status: 404 });
      }

      const payload = verifyToken(token);
      if (!payload || (payload.role !== "ADMIN" && payload.role !== "EDITOR")) {
        return NextResponse.json({ error: "Trang chưa được xuất bản" }, { status: 404 });
      }
    }

    return NextResponse.json(page);
  } catch (error: any) {
    console.error("GET Page Slug Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message || String(error) },
      { status: 500 }
    );
  }
}

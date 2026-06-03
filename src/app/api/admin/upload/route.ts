import { NextResponse, NextRequest } from "next/server";
import { getTokenFromReq, verifyToken } from "@/lib/auth";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    // 1. Verify authentication token
    const token = getTokenFromReq(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || (payload.role !== "ADMIN" && payload.role !== "EDITOR")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Parse request payload
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "Không tìm thấy file tải lên" }, { status: 400 });
    }

    // Validate size limit (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Kích thước ảnh vượt quá giới hạn 5MB" }, { status: 400 });
    }

    // Validate mime-type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Chỉ được phép tải lên tệp hình ảnh" }, { status: 400 });
    }

    // 3. Convert file to buffer and normalize file name
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const safeName = file.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9.]/g, "-")
      .replace(/-+/g, "-")
      .trim();
    const finalKey = `${timestamp}-${safeName}`;

    // 4. Save file locally inside public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads");
    
    // Ensure the directory exists
    await mkdir(uploadDir, { recursive: true });
    
    // Write buffer to file
    const filePath = join(uploadDir, finalKey);
    await writeFile(filePath, buffer);

    // 5. Construct public local URL (Next.js automatically serves files inside public/)
    const fileUrl = `/uploads/${finalKey}`;

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Local Upload API Error:", error);
    return NextResponse.json({ 
      error: "Lỗi hệ thống khi lưu ảnh cục bộ", 
      message: error?.message || String(error) 
    }, { status: 500 });
  }
}

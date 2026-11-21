import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

    const timestamp = Date.now();
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Ensure uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    const isVideo =
      file.type.startsWith("video/") ||
      [".mp4", ".webm", ".mov", ".mkv"].includes(ext);

    if (isVideo) {
      const filename = `${baseName}-${timestamp}${ext || ".mp4"}`;
      const filePath = path.join(uploadsDir, filename);
      await fs.writeFile(filePath, buffer);

      const sizeMb = (buffer.length / (1024 * 1024)).toFixed(1);
      const cleanName = path
        .basename(originalName, ext)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return NextResponse.json({
        success: true,
        asset: {
          name: cleanName,
          url: `/uploads/${filename}`,
          type: "video",
          format: ext.replace(".", "").toUpperCase() || "MP4",
          size: `${sizeMb} MB`,
        },
      });
    }

    // Process Image with Sharp for optimal performance and size
    try {
      const imageInstance = sharp(buffer);
      const meta = await imageInstance.metadata();

      const originalWidth = meta.width || 1920;
      const originalHeight = meta.height || 1080;

      // Automatically downscale oversized images (> 2560px) to prevent multi-megabyte bloat
      let pipeline = sharp(buffer);
      if (originalWidth > 2560) {
        pipeline = pipeline.resize({ width: 2560, withoutEnlargement: true });
      }

      // Convert or optimize to WebP if PNG/JPG for superior web performance
      const shouldConvertToWebp = [".png", ".jpg", ".jpeg"].includes(ext);
      let outputBuffer: Buffer;
      let targetExt = ext;
      let targetFormat = (meta.format || "jpg").toUpperCase();

      if (shouldConvertToWebp) {
        outputBuffer = await pipeline.webp({ quality: 88, effort: 4 }).toBuffer();
        targetExt = ".webp";
        targetFormat = "WEBP";
      } else {
        outputBuffer = await pipeline.toBuffer();
      }

      const filename = `${baseName}-${timestamp}${targetExt}`;
      const filePath = path.join(uploadsDir, filename);
      await fs.writeFile(filePath, outputBuffer);

      // Extract new dimensions
      const finalMeta = await sharp(outputBuffer).metadata();
      const finalSizeKb = Math.round(outputBuffer.length / 1024);
      const sizeDisplay =
        finalSizeKb > 1024
          ? `${(finalSizeKb / 1024).toFixed(1)} MB`
          : `${finalSizeKb} KB`;

      const cleanName = path
        .basename(originalName, ext)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return NextResponse.json({
        success: true,
        asset: {
          name: cleanName,
          url: `/uploads/${filename}`,
          type: "image",
          format: targetFormat,
          width: finalMeta.width || originalWidth,
          height: finalMeta.height || originalHeight,
          size: sizeDisplay,
        },
      });
    } catch (imageErr) {
      // Fallback: save raw image buffer if Sharp decoding encounters unsupported custom codec
      const filename = `${baseName}-${timestamp}${ext || ".jpg"}`;
      const filePath = path.join(uploadsDir, filename);
      await fs.writeFile(filePath, buffer);

      const sizeKb = Math.round(buffer.length / 1024);
      return NextResponse.json({
        success: true,
        asset: {
          name: path.basename(originalName, ext),
          url: `/uploads/${filename}`,
          type: "image",
          format: ext.replace(".", "").toUpperCase() || "IMG",
          size: `${sizeKb} KB`,
        },
      });
    }
  } catch (error: any) {
    console.error("[API Upload Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

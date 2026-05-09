import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Extremely simple JSON file storage since there's no DB configured
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), "demo-requests.json");
    
    let existing = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      existing = JSON.parse(fileData);
    } catch (e) {
      // file doesn't exist yet
    }

    const payload = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    existing.push(payload);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

    return NextResponse.json({ success: true, payload });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save request" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "demo-requests.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    return NextResponse.json({ success: true, data: JSON.parse(fileData) });
  } catch (e) {
    return NextResponse.json({ success: true, data: [] });
  }
}

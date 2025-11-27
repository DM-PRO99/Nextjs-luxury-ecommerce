import { NextResponse } from "next/server";
import { uploadImage } from "@/libs/cloudinary";

export async function POST(request: Request) {
  try {
    const { testImage } = await request.json();
    
    if (!testImage) {
      return NextResponse.json({ error: "No test image provided" }, { status: 400 });
    }

    console.log("Testing Cloudinary with image:", testImage.substring(0, 50) + "...");
    
    const result = await uploadImage(testImage);
    
    console.log("Cloudinary upload successful:", result);
    
    return NextResponse.json({ 
      success: true, 
      result,
      cloudinaryConfig: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
        apiKey: process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING',
        folder: process.env.CLOUDINARY_FOLDER || 'DEFAULT'
      }
    });
  } catch (error) {
    console.error("Cloudinary test error:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Unknown error",
      details: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        hasApiKey: !!process.env.CLOUDINARY_API_KEY,
        hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
      }
    }, { status: 500 });
  }
}

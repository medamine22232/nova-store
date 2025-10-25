import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Upload handler that supports Cloudinary (for Vercel) or local storage fallback
export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called - Environment:', {
      isVercel: !!process.env.VERCEL,
      hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
      nodeEnv: process.env.NODE_ENV
    });

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Check if we're on Vercel and don't have Cloudinary configured
    const isVercel = !!process.env.VERCEL;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (isVercel && !cloudName) {
      return NextResponse.json({
        error: 'File uploads require Cloudinary configuration on Vercel. Please set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET environment variables.',
        isVercel: true,
        needsCloudinary: true
      }, { status: 500 });
    }

    // If Cloudinary is configured, upload there (works on Vercel)
    if (cloudName && (uploadPreset || (apiKey && apiSecret))) {
      console.log('Attempting Cloudinary upload...');
      
      try {
        // prepare form data to send to Cloudinary
        const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const form = new FormData();
        form.append('file', file);

        const timestamp = Math.floor(Date.now() / 1000);

        if (uploadPreset) {
          // unsigned upload using upload_preset (simplest for Vercel)
          console.log('Using unsigned upload with preset:', uploadPreset);
          form.append('upload_preset', uploadPreset);
        } else {
          // signed upload: include api_key, timestamp and signature
          console.log('Using signed upload with API key');
          const crypto = await import('crypto');
          const toSign = `timestamp=${timestamp}`;
          const signature = crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');
          form.append('api_key', apiKey as string);
          form.append('timestamp', String(timestamp));
          form.append('signature', signature);
        }

        // send to Cloudinary
        const res = await fetch(cloudUrl, {
          method: 'POST',
          body: form as any,
        });

        console.log('Cloudinary response status:', res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error('Cloudinary upload failed:', res.status, text);
          return NextResponse.json({ 
            error: 'Cloudinary upload failed', 
            details: text,
            status: res.status 
          }, { status: 500 });
        }

        const body = await res.json();
        console.log('Cloudinary success:', { url: body.secure_url });
        
        // Cloudinary returns secure_url
        const imageUrl = body.secure_url || body.url || null;
        if (!imageUrl) {
          return NextResponse.json({ 
            error: 'Cloudinary upload succeeded but no URL returned',
            response: body 
          }, { status: 500 });
        }
        
        return NextResponse.json({ message: 'File uploaded to Cloudinary', imageUrl });
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return NextResponse.json({ 
          error: 'Cloudinary upload failed', 
          details: cloudinaryError instanceof Error ? cloudinaryError.message : 'Unknown cloudinary error' 
        }, { status: 500 });
      }
    }

    // Fallback to local filesystem (works in local dev only)
    if (isVercel) {
      return NextResponse.json({
        error: 'Local file uploads are not supported on Vercel. Please configure Cloudinary.',
        isVercel: true,
        needsCloudinary: true
      }, { status: 500 });
    }

    console.log('Attempting local file upload...');
    
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      console.log('Uploads directory:', uploadsDir);
      
      if (!existsSync(uploadsDir)) {
        console.log('Creating uploads directory...');
        await mkdir(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}-${randomString}.${extension}`;
      const filepath = join(uploadsDir, filename);
      
      console.log('Writing file to:', filepath);
      await writeFile(filepath, buffer);

      // Return the public URL (local)
      const imageUrl = `/uploads/${filename}`;
      console.log('Local upload success:', imageUrl);
      return NextResponse.json({ message: 'File uploaded locally', imageUrl });
    } catch (localError) {
      console.error('Local upload error:', localError);
      return NextResponse.json({
        error: 'Local file upload failed',
        details: localError instanceof Error ? localError.message : 'Unknown local error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload file', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
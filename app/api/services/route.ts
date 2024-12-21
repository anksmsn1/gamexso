import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { ourservices } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with a hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export async function PUT(req: NextRequest) {
    try {
      const formData = await req.formData();
  
      const id = formData.get('id') as string; // ID of the record to update
      const title = formData.get('title') as string;
      const image = formData.get('image') as string | null;
      const content = formData.get('content') as string;
  
      // Ensure the ID is provided
      if (!id) {
        return NextResponse.json(
          { message: 'ID is required for updating the record.' },
          { status: 400 }
        );
      }
  
      // Build the update payload dynamically
      const updatePayload: Record<string, string | null> = {};
      if (title) updatePayload.title = title;
      if (content) updatePayload.content = content;
      if (image) updatePayload.image = image; // Only include the image field if a new value is provided
  
      const updatedRecord = await db
        .update(ourservices)
        .set(updatePayload)
        .where(eq(ourservices.id, Number(id))) // Adjust based on your `id` type in the schema
        .returning();
  
      const responseRecord = updatedRecord[0]; // Adjust if returning a single object instead of an array
  
      if (!responseRecord) {
        return NextResponse.json(
          { message: 'Record not found or could not be updated.' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        id: responseRecord.id,
        title: responseRecord.title,
        image: responseRecord.image,
        content: responseRecord.content,
        message: 'Record updated successfully.',
      });
    } catch (error) {
      return NextResponse.json(
        { message: error instanceof Error ? error.message : 'An error occurred' },
        { status: 500 }
      );
    }
  }
  
  
export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData();
  
      const title = formData.get('title') as string;
 
      const image = formData.get('image') as string;
      const content = formData.get('content') as string;
      const slug = generateSlug(title);
      const insertedUser = await db.insert(ourservices).values({
        title: title,
        image: image,
        content: content
      }).returning();
  
      const responseUser = insertedUser[0]; // Adjust if insertedUser returns an array

    return NextResponse.json({
      id: responseUser.id, 
      title: responseUser.title,
      image: responseUser.image, // Assuming 'image' is stored as a string (base64 or URL)
      content: responseUser.content, // Assuming 'image' is stored as a string (base64 or URL)
      message: 'Game created successfully.'
    });
    } catch (error) {
      return NextResponse.json(
        { message: error instanceof Error ? error.message : 'An error occurred' },
        { status: 500 },
      );
    }
  }

  export async function GET(req: NextRequest) {
    try {
        // Fetch all CMS pages from the database
        const featuresData = await db.select().from(ourservices);

        return NextResponse.json(featuresData);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'An error occurred' },
            { status: 500 },
        );
    }
}

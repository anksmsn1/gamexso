import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { cms } from '../../../lib/schema';

const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with a hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData();
  
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const position = Number(formData.get('position')); // Convert to number
      const heroImage = formData.get('heroImage') as string;
      const slug = generateSlug(title);
      const insertedUser = await db.insert(cms).values({
        title: title,
        content: content,
        position: position, // Ensure this is a number
        heroImage: heroImage,
        slug:slug
      }).returning();
  
      return NextResponse.json({ user: null, message: 'Page created successfully.' });
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
        const cmsData = await db.select().from(cms);

        return NextResponse.json(cmsData);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'An error occurred' },
            { status: 500 },
        );
    }
}

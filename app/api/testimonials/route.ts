import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { testimonials } from '../../../lib/schema';

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
      const testimonial = formData.get('testimonial') as string;
 
      const image = formData.get('image') as string;
      
      const insertedUser = await db.insert(testimonials).values({
        title: title,
        testimonial: testimonial,
        image: image,
      }).returning();
  
      const responseUser = insertedUser[0]; // Adjust if insertedUser returns an array

    return NextResponse.json({
      id: responseUser.id, 
      title: responseUser.title,
      testimonial: responseUser.testimonial,
      image: responseUser.image, // Assuming 'image' is stored as a string (base64 or URL)
      message: 'Testimonial created successfully.'
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
        const featuresData = await db.select().from(testimonials);

        return NextResponse.json(featuresData);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'An error occurred' },
            { status: 500 },
        );
    }
}

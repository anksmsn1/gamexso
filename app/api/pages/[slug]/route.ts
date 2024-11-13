import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { cms } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  // Extract slug from the URL
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }

    // Query the database to get data for the specific slug
    const featuresData = await db
      .select()
      .from(cms)
      .where(eq(cms.slug, slug));

    if (featuresData.length === 0) {
      return NextResponse.json(
        { message: 'No data found for this slug' },
        { status: 404 }
      );
    }

    return NextResponse.json(featuresData);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}

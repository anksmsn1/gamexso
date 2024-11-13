import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../../lib/db';
import { cms } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
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
        .from(cms) // Adjust the table name if necessary
        .where(eq(cms.slug,slug)); // Filter by slug
  
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

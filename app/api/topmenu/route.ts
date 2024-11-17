import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../lib/db';
import { cms } from '../../../lib/schema';
import { eq } from 'drizzle-orm';
import { asc, desc } from "drizzle-orm";



  export async function GET(req: NextRequest) {
    try {
        // Fetch all CMS pages from the database
        const cmsData = await db.select({
            title: cms.title,
            slug: cms.slug
          }).from(cms).
          where(eq(cms.linkPosition,'Main Menu')).orderBy(asc(cms.position), asc(cms.title));

        return NextResponse.json(cmsData);
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'An error occurred' },
            { status: 500 },
        );
    }
}

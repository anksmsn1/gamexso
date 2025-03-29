import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../../lib/db';
import { cms } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';

const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with a hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export async function POST(req: NextRequest) {
    try {
      const {id} = await req.json();
      const cmsData = await db
      .select({
        title: cms.title,
        position: cms.position,
        heroImage: cms.heroImage,
        content: cms.content,
        linkposition: cms.linkPosition,
      })
      .from(cms)
      .where(eq(cms.id, id));
  
      return NextResponse.json({cmsData});
    } catch (error) {
      return NextResponse.json(
        { message: error instanceof Error ? error.message : 'An error occurred' },
        { status: 500 },
      );
    }
  }
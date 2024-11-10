import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../../lib/db';
import { features } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';


  export async function POST(req: NextRequest) {
    try {
        const { id } =await req.json(); // Get the ID from the request body

        if (!id) {
            return NextResponse.json({message:"ID is required"});
        }
        await db.delete(features).where(eq(features.id, id));
        return NextResponse.json({message:"Feature deleted successfully!"});
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'An error occurred' },
            { status: 500 },
        );
    }
}

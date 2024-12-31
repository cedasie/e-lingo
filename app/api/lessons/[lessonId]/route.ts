import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

// GET
export const GET = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, params.lessonId),
  });

  return NextResponse.json(data);
};

// PUT
export const PUT = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, params.lessonId))
    .returning();

  return NextResponse.json(data[0]);
};

// DELETE
export const DELETE = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, params.lessonId))
    .returning();

  return NextResponse.json(data[0]);
};

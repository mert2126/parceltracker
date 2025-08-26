import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const order = await prisma.order.findUnique({
    where: { id },
    include: { events: { orderBy: { timestamp: "desc" } } },
  });
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(order);
}

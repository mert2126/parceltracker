import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (Number.isNaN(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

    const body = await req.json();
    const { status } = body;
    if (!status) return NextResponse.json({ error: "status required" }, { status: 400 });

    try {
        const ev = await prisma.trackingEvent.create({ data: { orderId: id, status } });
        return NextResponse.json(ev, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

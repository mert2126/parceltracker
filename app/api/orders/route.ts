import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
    const orders = await prisma.order.findMany({
        include: { events: { orderBy: { timestamp: "desc" } } },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { trackingNumber, description } = body;
    if (!trackingNumber) return NextResponse.json({ error: "trackingNumber required" }, { status: 400 });

    try {
        const order = await prisma.order.create({
            data: { trackingNumber, description: description || "" },
        });
        return NextResponse.json(order, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

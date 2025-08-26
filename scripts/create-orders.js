const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const samples = [
        { trackingNumber: 'TRK123456', description: 'mert deneme  1' },
        { trackingNumber: 'TRK987654', description: 'Test order 2' },
    ];

    for (const s of samples) {
        const order = await prisma.order.upsert({
            where: { trackingNumber: s.trackingNumber },
            update: { description: s.description },
            create: { trackingNumber: s.trackingNumber, description: s.description },
        });
        console.log('Upserted order:', { id: order.id, trackingNumber: order.trackingNumber, description: order.description });
    }

    const all = await prisma.order.findMany({ include: { events: true }, orderBy: { createdAt: 'desc' } });
    console.log('\nAll orders:');
    all.forEach(o => console.log({ id: o.id, trackingNumber: o.trackingNumber, description: o.description, events: o.events.length }));

    await prisma.$disconnect();
}

main().catch(e => {
    console.error(e);
    prisma.$disconnect().then(() => process.exit(1));
});

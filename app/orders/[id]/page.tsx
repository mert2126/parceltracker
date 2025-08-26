"use client";
import { useEffect, useState } from "react";

export default function OrderDetail({ params }: { params: { id: string } }) {
    const id = params.id;
    const [order, setOrder] = useState<any>(null);
    const [status, setStatus] = useState("");

    async function fetchOrder() {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();
        setOrder(data);
    }

    useEffect(() => { fetchOrder(); }, [id]);

    async function addEvent(e: any) {
        e.preventDefault();
        await fetch(`/api/orders/${id}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        setStatus('');
        await fetchOrder();
    }

    if (!order) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl">{order.trackingNumber}</h2>
            <p className="mb-4">{order.description}</p>

            <form onSubmit={addEvent} className="mb-4">
                <input
                    placeholder="Status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="border px-2 py-1 mr-2"
                />
                <button className="px-3 py-1 bg-green-600 text-white rounded">Add Event</button>
            </form>

            <h3 className="text-xl mb-2">Events</h3>
            <ul>
                {order.events.map((ev: any) => (
                    <li key={ev.id} className="mb-2">
                        {new Date(ev.timestamp).toLocaleString()} — {ev.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}
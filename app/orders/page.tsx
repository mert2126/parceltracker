"use client";
import { useEffect, useState } from "react";

type Order = {
    id: number;
    trackingNumber: string;
    description: string;
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [description, setDescription] = useState("");

    async function fetchOrders() {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
    }

    useEffect(() => { fetchOrders(); }, []);

    async function createOrder(e: any) {
        e.preventDefault();
        await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trackingNumber, description }),
        });
        setTrackingNumber("");
        setDescription("");
        await fetchOrders();
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl mb-4">Orders</h2>
            <form onSubmit={createOrder} className="mb-6">
                <input
                    placeholder="Tracking Number"
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                    className="border px-2 py-1 mr-2"
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="border px-2 py-1 mr-2"
                />
                <button className="px-3 py-1 bg-blue-600 text-white rounded">Create</button>
            </form>
            <ul>
                {orders.map(o => (
                    <li key={o.id} className="mb-2">
                        <a href={`/orders/${o.id}`} className="text-blue-600 underline">
                            {o.trackingNumber}
                        </a> — {o.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}
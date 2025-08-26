"use client";
import { useState } from "react";

export default function AddEventForm({ orderId }: { orderId: number }) {
    const [status, setStatus] = useState("");

    async function submit(e: any) {
        e.preventDefault();
        await fetch(`/api/orders/${orderId}/events`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
        setStatus("");
        // simple client-side refresh
        window.location.reload();
    }

    return (
        <form onSubmit={submit} className="mb-4">
            <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" className="border p-2 mr-2" />
            <button className="bg-green-600 text-white px-3 py-1">Add event</button>
        </form>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
}

const SendUsMessageDetail = () => {
    const [message, setMessage] = useState<Message | null>(null);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchMessage = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/shopedia/contact-us-list/${id}`);
            setMessage(response.data);
        } catch (error) {
            console.error("Error fetching message:", error);
        }
        };

        fetchMessage();
    }, [id]);

    if (!message) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Message Details</h1>
                <div className="card shadow-md p-6">
                    <p className="text-lg">
                        <strong>ID:</strong> {message.id}
                    </p>
                    <p className="text-lg">
                        <strong>Name:</strong> {message.name}
                    </p>
                    <p className="text-lg">
                        <strong>Email:</strong> {message.email}
                    </p>
                    <p className="text-lg">
                        <strong>Message:</strong> {message.message}
                    </p>
                    <button className="btn btn-primary mt-4" onClick={() => router.back()}>
                        Back
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SendUsMessageDetail;

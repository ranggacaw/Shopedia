"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
}

const SendUsMessagePage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchMessages = async () => {
        try {
            const response = await axios.get("http://localhost:3001/shopedia/contact-us-list");
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
        };

        fetchMessages();
    }, []);

    return (
        <>
            <Header /> 
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-primary text-white">
                        <th className="p-3">ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Message</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {messages.length > 0 ? (
                        messages.map((msg) => (
                            <tr
                                key={msg.id}
                                className="cursor-pointer hover:bg-gray-100 transition"
                                onClick={() => router.push(`/contact/message/${msg.id}`)}
                            >
                                <td className="p-3">{msg.id}</td>
                                <td className="p-3">{msg.name}</td>
                                <td className="p-3">{msg.email}</td>
                                <td className="p-3 truncate max-w-[200px]">{msg.message}</td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={4} className="text-center p-5 text-gray-500">
                            No messages found.
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SendUsMessagePage;

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FollowMouse() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-10 h-10 bg-primary rounded-full pointer-events-none border border-white"
            initial={{ x: 0, y: 0 }}
            animate={{
                x: mousePosition.x - 20,
                y: mousePosition.y - 20,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
        />
    );
}

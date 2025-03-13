"use client"; // Ensure this is a client-side component

import Image from "next/image";
import { useState } from "react";

export default function FloorPlan() {
    const [path, setPath] = useState([]);

    return (
        <div style={{ position: "relative", width: "800px", height: "600px" }}>
            {/* College Floor Plan */}
            <Image
                src="/assets/cse ground floor (1).png" // Image should be in the public/ folder
                alt="College Floor Plan"
                layout="fill"
                objectFit="contain"
            />

            {/* Display path markers dynamically */}
            {path.map((point, index) => (
                <div
                    key={index}
                    style={{
                        position: "absolute",
                        left: `${point.x}%`, // Adjust these values based on image dimensions
                        top: `${point.y}%`,
                        width: "10px",
                        height: "10px",
                        backgroundColor: "red",
                        borderRadius: "50%",
                    }}
                />
            ))}
        </div>
    );
}

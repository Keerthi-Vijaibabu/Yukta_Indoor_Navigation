"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function FloorPlan() {
    const [path, setPath] = useState([]);
    const [start, setStart] = useState("101");  // Default start room
    const [end, setEnd] = useState("104");  // Default destination room

    useEffect(() => {
        if (start && end) {
            axios.get(`http://127.0.0.1:5000/getPath?src=${start}&dest=${end}`)
                .then(response => setPath(response.data.path))
                .catch(error => console.error("Error fetching path:", error));
        }
    }, [start, end]);

    return (
        <div style={{ position: "relative", width: "800px", height: "600px" }}>
            {/* Floor Plan Image */}
            <Image
                src="/assets/cse ground floor (1).png"
                alt="College Floor Plan"
                layout="fill"
                objectFit="contain"
            />

            {/* Draw Start and End Points */}
            {path.length > 0 && (
                <>
                    {/* Start Room Marker */}
                    <div
                        style={{
                            position: "absolute",
                            left: `${path[0][0]}px`,
                            top: `${path[0][1]}px`,
                            width: "12px",
                            height: "12px",
                            backgroundColor: "green",
                            borderRadius: "50%",
                        }}
                    />

                    {/* End Room Marker */}
                    <div
                        style={{
                            position: "absolute",
                            left: `${path[path.length - 1][0]}px`,
                            top: `${path[path.length - 1][1]}px`,
                            width: "12px",
                            height: "12px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                        }}
                    />
                </>
            )}

            {/* Draw Path */}
            {path.map((point, index) => (
                index > 0 && (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: `${point[0]}px`,
                            top: `${point[1]}px`,
                            width: "8px",
                            height: "8px",
                            backgroundColor: "blue",
                            borderRadius: "50%",
                        }}
                    />
                )
            ))}

            {/* Dropdowns for Room Selection */}
            <div style={{ position: "absolute", top: "10px", left: "10px", background: "white", padding: "10px" }}>
                <label>From: </label>
                <select value={start} onChange={e => setStart(e.target.value)}>
                    <option value="101">SAP LAB</option>
                    <option value="102">CISCO LAB</option>
                    <option value="103">COMPUTER CENTRE LAB</option>
                    <option value="104">CLOUD & DATA ANALYSIS</option>
                </select>

                <label> To: </label>
                <select value={end} onChange={e => setEnd(e.target.value)}>
                    <option value="101">SAP LAB</option>
                    <option value="102">CISCO LAB</option>
                    <option value="103">COMPUTER CENTRE LAB</option>
                    <option value="104">CLOUD & DATA ANALYSIS</option>
                </select>
            </div>
        </div>
    );
}

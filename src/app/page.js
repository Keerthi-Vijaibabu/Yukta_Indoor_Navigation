"use client";

import dynamic from "next/dynamic";

const FloorPlan = dynamic(() => import("../app/floor0"), { ssr: false });

export default function Page() {
    return (
        <div>
            <h1>College Indoor Navigation</h1>
            <FloorPlan />
        </div>
    );
}

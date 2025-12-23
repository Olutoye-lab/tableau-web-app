
"use client"

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NODE_COUNT = 8;
const RADIUS = 80; // Reduced radius for a tighter look

export function DecodingIntentSkeleton({ fileName = 'app/intent/decode/page.tsx' }: { fileName?: string }) {
    const [activeNode, setActiveNode] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveNode((prev) => (prev + 1) % NODE_COUNT);
        }, 300);
        return () => clearInterval(timer);
    }, []);

    const getPosition = (index: number) => {
        const angle = (index / NODE_COUNT) * 2 * Math.PI;
        const x = RADIUS * Math.cos(angle);
        const y = RADIUS * Math.sin(angle);
        return { left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` };
    };

    return (
        <div className="w-full h-full rounded-xl border border-border bg-card shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md">
                    {fileName}
                </div>
            </div>
            <div className="flex justify-center items-center h-3/4 w-full bg-muted/50 rounded-md relative overflow-hidden">
                <div className="relative w-full h-full">
                    {/* Central Orb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute w-16 h-16 bg-accent/50 rounded-full animate-pulse -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute w-12 h-12 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-primary" />
                    </div>

                    {/* Nodes and Lines */}
                    {Array.from({ length: NODE_COUNT }).map((_, index) => {
                        const angle = (index / NODE_COUNT) * 2 * Math.PI;
                        const isActive = index === activeNode;
                        const pos = getPosition(index);

                        return (
                            <div key={index}>
                                {/* Connecting Line */}
                                <div
                                    className="absolute top-1/2 left-1/2 h-px bg-accent/50 origin-left transition-all duration-300"
                                    style={{
                                        width: `${RADIUS}px`,
                                        transform: `rotate(${angle}rad) scaleX(${isActive ? 1 : 0.8})`,
                                        opacity: isActive ? 1 : 0.5,
                                    }}
                                />
                                {/* Node */}
                                <div
                                    className={cn(
                                        "absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 transition-all duration-300",
                                        isActive ? "border-primary" : "border-muted"
                                    )}
                                    style={pos}
                                >
                                    <div
                                        className={cn(
                                            "w-full h-full rounded-full transition-all duration-300",
                                            isActive && "bg-accent/50 animate-pulse"
                                        )}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

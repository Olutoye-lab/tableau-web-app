
"use client"

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NODE_COUNT_PER_SIDE = 4;
const X_OFFSET = 120;
const Y_SPACING = 30;

export function SemanticMappingSkeleton({ fileName = 'app/data/map/page.tsx' }: { fileName?: string }) {
    const [activeLine, setActiveLine] = useState(0);

    useEffect(() => {
        const totalLines = NODE_COUNT_PER_SIDE * NODE_COUNT_PER_SIDE;
        const timer = setInterval(() => {
            setActiveLine((prev) => (prev + 1) % totalLines);
        }, 200);
        return () => clearInterval(timer);
    }, []);

    const getNodePosition = (index: number, side: 'left' | 'right') => {
        return {
            x: side === 'left' ? -X_OFFSET : X_OFFSET,
            y: (index - (NODE_COUNT_PER_SIDE - 1) / 2) * Y_SPACING,
        };
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
                <div className="relative">
                    {/* Render Lines */}
                    {Array.from({ length: NODE_COUNT_PER_SIDE * NODE_COUNT_PER_SIDE }).map((_, index) => {
                        const fromIndex = Math.floor(index / NODE_COUNT_PER_SIDE);
                        const toIndex = index % NODE_COUNT_PER_SIDE;
                        const fromPos = getNodePosition(fromIndex, 'left');
                        const toPos = getNodePosition(toIndex, 'right');

                        const dx = toPos.x - fromPos.x;
                        const dy = toPos.y - fromPos.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                        const isActive = index === activeLine;

                        return (
                            <div
                                key={index}
                                className="absolute h-px bg-primary"
                                style={{
                                    left: `${fromPos.x}px`,
                                    top: `${fromPos.y}px`,
                                    width: `${distance}px`,
                                    transform: `rotate(${angle}deg)`,
                                    transformOrigin: 'left center',
                                    transition: 'opacity 0.2s ease-out',
                                    opacity: isActive ? 1 : 0,
                                }}
                            />
                        );
                    })}
                     {/* Render Nodes */}
                     {['left', 'right'].map((side) =>
                        Array.from({ length: NODE_COUNT_PER_SIDE }).map((_, index) => {
                            const pos = getNodePosition(index, side as 'left' | 'right');
                            const fromIndex = side === 'left' ? index : activeLine % NODE_COUNT_PER_SIDE;
                            const toIndex = side === 'right' ? index : Math.floor(activeLine / NODE_COUNT_PER_SIDE);
                            const isActive = fromIndex === Math.floor(activeLine / NODE_COUNT_PER_SIDE) || toIndex === activeLine % NODE_COUNT_PER_SIDE;

                            return (
                                <div
                                    key={`${side}-${index}`}
                                    className={cn("absolute w-3 h-3 bg-background border-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors",
                                        (side === 'left' && index === Math.floor(activeLine / NODE_COUNT_PER_SIDE)) || (side === 'right' && index === activeLine % NODE_COUNT_PER_SIDE)
                                        ? "border-primary" : "border-muted"
                                    )}
                                    style={{
                                        left: `${pos.x}px`,
                                        top: `${pos.y}px`,
                                    }}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

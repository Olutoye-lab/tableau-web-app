"use client"

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CLUSTER_COUNT = 7;
const NODES_PER_CLUSTER = 4;
const CLUSTER_RADIUS = 100;
const NODE_RADIUS = 25;

export function EntityResolutionSkeleton({ fileName = 'app/data/resolve/page.tsx' }: { fileName?: string }) {
    const [activeCluster, setActiveCluster] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveCluster((prev) => (prev + 1) % CLUSTER_COUNT);
        }, 500);
        return () => clearInterval(timer);
    }, []);

    const getClusterPosition = (index: number) => {
        const angle = (index / CLUSTER_COUNT) * 2 * Math.PI + Math.PI/6;
        const x = CLUSTER_RADIUS * Math.cos(angle);
        const y = CLUSTER_RADIUS * Math.sin(angle);
        return { x, y };
    };

    const getNodePosition = (clusterIndex: number, nodeIndex: number) => {
        const clusterPos = getClusterPosition(clusterIndex);
        const angle = (nodeIndex / NODES_PER_CLUSTER) * 2 * Math.PI;
        const x = clusterPos.x + NODE_RADIUS * Math.cos(angle);
        const y = clusterPos.y + NODE_RADIUS * Math.sin(angle);
        return { x, y };
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
            <div className="flex justify-center items-center h-[270px] w-full bg-zinc-400 rounded-md relative overflow-hidden">
                <div className="relative">
                    {/* Central Resolved Nodes */}
                    {Array.from({ length: CLUSTER_COUNT }).map((_, index) => {
                        const pos = getClusterPosition(index);
                        const isActive = index === activeCluster;
                        return (
                            <div
                                key={`center-${index}`}
                                className={cn(
                                    "absolute w-8 h-8 rounded-full border-2 transition-all duration-500 -translate-x-1/2 -translate-y-1/2 z-10",
                                    isActive ? "bg-slate-300 border-accent/50 scale-110" : "bg-background border-muted"
                                )}
                                style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                            />
                        );
                    })}

                    {/* Unresolved Nodes and Lines */}
                    {Array.from({ length: CLUSTER_COUNT }).map((_, clusterIndex) => 
                        Array.from({ length: NODES_PER_CLUSTER }).map((_, nodeIndex) => {
                            const nodePos = getNodePosition(clusterIndex, nodeIndex);
                            const clusterPos = getClusterPosition(clusterIndex);
                            const isActive = clusterIndex === activeCluster;

                            const dx = clusterPos.x - nodePos.x;
                            const dy = clusterPos.y - nodePos.y;
                            const distance = Math.sqrt(dx * dx + dy * dy) - 10;
                            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                            return (
                                <div key={`${clusterIndex}-${nodeIndex}`}>
                                    {/* Line */}
                                    <div
                                        className="absolute h-px bg-accent/80 transition-all duration-300"
                                        style={{
                                            left: `${nodePos.x}px`,
                                            top: `${nodePos.y}px`,
                                            width: isActive ? `${distance}px` : '0px',
                                            transform: `rotate(${angle}deg)`,
                                            transformOrigin: 'left center',
                                            opacity: isActive ? 1 : 0,
                                            transitionDelay: `${nodeIndex * 100}ms`
                                        }}
                                    />
                                    {/* Node */}
                                    <div
                                        className={cn(
                                            "absolute w-3 h-3 bg-background border-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                                            isActive ? "border-accent/80" : "border-muted/50"
                                        )}
                                        style={{ left: `${nodePos.x}px`, top: `${nodePos.y}px` }}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

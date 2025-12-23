
"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { FileScan } from "lucide-react";
import { cn } from "@/lib/utils";

const GRID_SIZE = 5;

export function MetadataScanningSkeleton({ fileName = 'app/metadata/scan/page.tsx' }: { fileName?: string }) {
    const [progress, setProgress] = useState(0);
    const [activeCells, setActiveCells] = useState<number[]>([]);

    useEffect(() => {
        const progressTimer = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
        }, 500);

        const cellTimer = setInterval(() => {
            const newActiveCells: number[] = [];
            const count = Math.floor(Math.random() * 4) + 2; // 2 to 5 active cells
            for (let i = 0; i < count; i++) {
                newActiveCells.push(Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
            }
            setActiveCells(newActiveCells);
        }, 750);


        return () => {
            clearInterval(progressTimer);
            clearInterval(cellTimer);
        };
    }, []);

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
            <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                    <FileScan className="w-8 h-8 text-primary animate-pulse" />
                    <Spinner />
                </div>
                <div className="grid grid-cols-5 gap-3 h-40 w-full p-4 bg-muted/50 rounded-md">
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
                         <div
                            key={index}
                            className={cn(
                                "w-full h-full rounded bg-background transition-colors duration-500 border-2",
                                activeCells.includes(index) ? "border-primary animate-pulse bg-accent/50" : "border-transparent"
                            )}
                        />
                    ))}
                </div>
            </CardContent>
        </div>
    );
}

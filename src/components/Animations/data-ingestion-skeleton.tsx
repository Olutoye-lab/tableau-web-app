"use client"

import { JSX, useEffect, useState } from "react";
import { Separator } from "../ui/separator";

const SkeletonLine = ({ width, className = '' }: { width: string; className?: string }) => (
  <div
    className={`h-4 bg-gray-700 rounded-md animate-pulse ${className}`}
    style={{ 
      width,
      animation: 'skeleton-gradient 1.5s infinite linear',
      background: 'linear-gradient(to right, hsl(var(--muted)) 20%, hsl(var(--accent) / 0.5) 50%, hsl(var(--muted)) 80%)',
      backgroundSize: '200% 100%',
    }}
  />
);

const SkeletonCircle = ({ className = '' }: { className?: string }) => (
    <div
      className={`h-4 w-4 bg-gray-700 rounded-full animate-pulse ${className}`}
      style={{
        animation: 'skeleton-gradient 1.5s infinite linear',
        background: 'linear-gradient(to right, hsl(var(--muted)) 20%, hsl(var(--accent) / 0.5) 50%, hsl(var(--muted)) 80%)',
        backgroundSize: '200% 100%',
      }}
    />
);


export function DataIngestionSkeleton({ fileName = 'app/page.tsx' }: { fileName?: string }) {
    const [lines, setLines] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const generateLines = () => {
            const lineCount = 10;
            const newLines: JSX.Element[] = [];
            for (let i = 0; i < lineCount; i++) {
                const width = `${Math.floor(Math.random() * 50) + 20}%`;
                const indent = `${Math.floor(Math.random() * 4) * 2}rem`;
                const hasCircle = Math.random() > 0.7;

                newLines.push(
                    <div key={i} className="flex items-center gap-2 mb-3" style={{ marginLeft: indent }}>
                        <SkeletonLine width={width} className="border-blue-300 border-2" />
                        {hasCircle && <SkeletonCircle className="border-blue-300 border-2" />}
                    </div>
                );
            }
            setLines(newLines);
        };

        generateLines();
        const interval = setInterval(generateLines, 1000);

        return () => clearInterval(interval);
    }, [fileName]);


  return (
    <div className="w-full rounded-xl border border-border bg-card shadow-lg p-6">
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
      <Separator />
      <div className="mt-4">
        {lines}
      </div>
    </div>
  );
}

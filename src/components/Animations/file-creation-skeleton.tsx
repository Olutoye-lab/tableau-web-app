
"use client"

import { useEffect, useState } from "react";
import { File, Database } from "lucide-react";

export function FileCreationSkeleton({ fileName = 'app/data/publish/page.tsx' }: { fileName?: string }) {
    const [key, setKey] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setKey(prev => prev + 1);
        }, 4000);
        return () => clearInterval(timer);
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
            <div key={key} className="flex justify-center items-center h-3/4 w-full bg-muted/50 rounded-md relative overflow-hidden">
                <div className="relative flex justify-center items-center">
                    {/* Central Database Icon */}
                    <Database className="w-16 h-16 text-primary animate-pulse" />

                    {/* Published Files */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`absolute animate-publish-${i + 1}`}>
                            <File className="w-5 h-5 text-primary" />
                        </div>
                    ))}
                </div>

                <style>
                    {`
                        @keyframes publish-1 {
                            0% { transform: translate(-100px, -80px) scale(0.7); opacity: 0; }
                            70% { opacity: 1; }
                            100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
                        }
                        .animate-publish-1 { animation: publish-1 3s ease-in; }

                        @keyframes publish-2 {
                            0% { transform: translate(100px, -60px) scale(0.7); opacity: 0; }
                            70% { opacity: 1; }
                            100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
                        }
                        .animate-publish-2 { animation: publish-2 3.5s ease-in; animation-delay: 0.2s; }
                        
                        @keyframes publish-3 {
                            0% { transform: translate(-90px, 70px) scale(0.7); opacity: 0; }
                            70% { opacity: 1; }
                            100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
                        }
                        .animate-publish-3 { animation: publish-3 3.2s ease-in; animation-delay: 0.5s; }

                        @keyframes publish-4 {
                            0% { transform: translate(110px, 80px) scale(0.7); opacity: 0; }
                            70% { opacity: 1; }
                            100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
                        }
                        .animate-publish-4 { animation: publish-4 3.8s ease-in; animation-delay: 0.8s; }
                        
                        @keyframes publish-5 {
                            0% { transform: translate(0px, 100px) scale(0.7); opacity: 0; }
                            70% { opacity: 1; }
                            100% { transform: translate(0, 0) scale(0.3); opacity: 0; }
                        }
                        .animate-publish-5 { animation: publish-5 3.6s ease-in; animation-delay: 1s; }
                    `}
                </style>
            </div>
        </div>
    );
}

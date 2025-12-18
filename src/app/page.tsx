"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const init = async () => {
      try {
        await (window as any).tableau.extensions.initializeAsync();
        const dashboard = (window as any).tableau.extensions.dashboardContent.dashboard;
        console.log("Connected to dashboard:", dashboard.name);
      } catch (err) {
        console.error("Error initializing Tableau extension:", err);
      }
    };
    init();
  }, []);

  return (
    <div className="p-6 text-center text-blue-600">
      <h1 className="text-2xl font-bold">Next.js + TS + Tailwind Tableau Extension</h1>
    </div>
  );
}

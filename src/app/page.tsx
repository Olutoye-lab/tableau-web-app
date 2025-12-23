"use client";

import { useEffect } from "react";
import Main from "@/components/Main";


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
    <Main />
  );
}

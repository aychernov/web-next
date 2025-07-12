"use client";

import { useEffect, useState } from "react";
import { StatsTable } from "@/components/StatsTable";

export default function AutoPage() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndPost() {
      try {
        const res = await fetch("https://ipapi.co/json");
        const data: { country_code: string } = await res.json();
        const dto = {
          countryCode: data.country_code.toLowerCase(),
        };

        await fetch(`/stats`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dto),
        });

        const statsRes = await fetch("/stats");
        const statsData = await statsRes.json();
        setStats(statsData);
      } catch (e) {
        setError("Failed to fetch or send data");
        console.log(e)
      } finally {
        setLoading(false);
      }
    }

    fetchAndPost();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Auto Increment & Stats</h1>
      <StatsTable stats={stats} />
    </>
  );
}

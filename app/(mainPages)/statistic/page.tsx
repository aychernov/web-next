"use client";
import { useEffect, useState } from "react";
import { StatsTable } from "../../../components/StatsTable";

export default function StatsPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setError("Failed to load stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <h1>Statistics</h1>
      <StatsTable stats={stats} />
    </>
  );
}

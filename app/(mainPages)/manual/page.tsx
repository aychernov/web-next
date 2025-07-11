"use client";
import { useState, useEffect } from "react";
import { COUNTRY_CODES } from "../../../constants/COUNTRY_CODE";
import { StatsTable } from "../../../components/StatsTable";

export default function ManualPage() {
  const [countryCode, setCountryCode] = useState("us");
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendPost() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryCode }),
      });
      if (!res.ok) throw new Error("Post request failed");

      // Обновляем статистику
      const statsRes = await fetch("/stats");
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // При загрузке получаем статистику
    fetch("/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setError("Failed to load stats"));
  }, []);

  return (
    <>
      <h1>Manual Increment</h1>
      <select
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
      >
        {COUNTRY_CODES.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </select>
      <button onClick={sendPost} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <StatsTable stats={stats} />
    </>
  );
}

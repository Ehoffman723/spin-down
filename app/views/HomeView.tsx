import { useEffect, useState } from "react";

type Leaderboard = {
  id: string;
  slug: string;
  title: string;
  description: string;
  league: string;
  formats: string[];
  banner: string;
  playerCount: number;
  tournamentCount: number;
};

export default function HomeView() {
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboards() {
      try {
        const response = await fetch("/api/leaderboards");
        const data = await response.json();
        //Takes response from server and converts JSON to JavaScript obects

        setLeaderboards(data);
      } catch (error) {
        console.error("Failed to load leaderboards:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboards();
  }, []);

  if (loading) {
    return <p>Loading leaderboards...</p>;
  }

  return (
    <main>
      <h1>WBO Down Leaderboards</h1>

      <p>{leaderboards.length} leaderboards loaded.</p>
    </main>
  );
}
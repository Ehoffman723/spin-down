import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Ranking = {
  leaderboardId: number;
  playerId: number;
  playerName: string;
  currentElo: number;
  previousElo: number;
  ratingChange: number;
  wins: number;
  losses: number;
  eventsPlayed: number;
  lastPlayedAt: string;
  rank: number;
  avatarUrl: string | null;
  country: string | null;
};

type Tournament = {
  id: number;
  title: string;
  city: string;
  format: string;
  league: string;
  eventTime: string;
  eventTimezone: string;
  playerCount: number;
};

type LeaderboardDetail = {
  id: number;
  title: string;
  slug: string;
  description: string;
  league: string;
  formats: string[];
  isOfficial: boolean;
  isFeatured: boolean;
  bannerImageUrl: string;
  createdAt: string;
  scoring: string;
  rankings: Ranking[];
  tournaments: Tournament[];
};

export default function LeaderboardView() {
  const { slug } = useParams<{ slug: string }>();

  const [leaderboard, setLeaderboard] =
    useState<LeaderboardDetail | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(`/api/leaderboards/${slug}`);

        if (!response.ok) {
          throw new Error("Leaderboard not found");
        }

        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
        setLeaderboard(null);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [slug]);

  if (loading) {
    return <p>Loading leaderboard...</p>;
  }

  if (!leaderboard) {
    return <p>Leaderboard not found.</p>;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">{leaderboard.title}</h1>

      <p className="mt-2 text-slate-600">
        {leaderboard.description}
      </p>
    </main>
  );
}

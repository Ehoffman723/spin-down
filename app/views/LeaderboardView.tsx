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

      {leaderboard.bannerImageUrl && (
        <img
          src={leaderboard.bannerImageUrl}
          alt={leaderboard.title}
          className="mt-4 h-56 w-full rounded-lg object-cover"
        />
      )}

      <div className="mt-4">
        {leaderboard.formats?.map((format) => (
          <span key={format} className="mr-2">
            {format}
          </span>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold">
        Tournaments
      </h2>

      <div className="mt-4"> 
        {leaderboard.tournaments?.map((tournament) => (
          <div key={tournament.id}
           className="mb-4 rounded border p-4" 
          > 
            <h3 className="font-bold">{tournament.title}</h3>

            <p>{tournament.city}</p> 
            <p>Format: {tournament.format}</p> 
            <p>Players: {tournament.playerCount}</p> 
          </div> 
        ))} 
      </div>

      <h2 className="mt-10 text-2xl font-bold">
        Player Rankings
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Rank</th>
              <th className="p-2 text-left">Player</th>
              <th className="p-2 text-left">Country</th>
              <th className="p-2 text-left">Elo</th>
              <th className="p-2 text-left">Wins</th>
              <th className="p-2 text-left">Losses</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.rankings?.map((player) => (
              <tr key={player.playerId} className="border-t">
                <td className="p-2">
                  #{player.rank}
                </td>

                <td className="p-2">
                  <div className="flex items-center gap-2">
                    {player.avatarUrl && (
                      <img
                        src={player.avatarUrl}
                        alt=""
                        className="h-8 w-8 rounded-full"
                      />
                    )}

                    {player.playerName}
                  </div>
                </td>

                <td className="p-2">
                  {player.country}
                </td>

                <td className="p-2">
                  {player.currentElo}
                </td>

                <td className="p-2">
                  {player.wins}
                </td>

                <td className="p-2">
                  {player.losses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

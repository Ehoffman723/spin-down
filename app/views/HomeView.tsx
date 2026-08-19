import { useEffect, useState } from "react";

type Leaderboard = {
  id: string;
  slug: string;
  title: string;
  description: string;
  league: string;
  formats: string[];
  bannerImageUrl: string;
  playerCount: number;
  tournamentCount: number;
};

export default function HomeView() {
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const filteredLeaderboards = leaderboards.filter((leaderboard) => {
    const searchText = search.toLowerCase();

    return (
      leaderboard.title.toLowerCase().includes(searchText)
    );
  });
  useEffect(() => {
    async function fetchLeaderboards() {
      try {
        const response = await fetch("/api/leaderboards");
        const data = await response.json();
        //Takes response from server and converts JSON to JavaScript objects

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
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">
        BBX Leaderboards
      </h1>

      <p className="mt-2 text-slate-600">
        Browse Beyblade leaderboards and view player rankings.
      </p>

      <input
        type="text"
        placeholder="Search leaderboards"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="mt-6 w-full rounded border p-3"
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filteredLeaderboards.map((leaderboard) => (
          <a
            key={leaderboard.id}
            href={`/leaderboards/${leaderboard.slug}`}
            className="rounded border p-4"
          >
            {leaderboard.bannerImageUrl && (
              <img
                src={leaderboard.bannerImageUrl}
                alt={leaderboard.title}
                className="mb-4 h-36 w-full rounded object-cover"
              />
            )}

            <h2 className="text-xl font-bold">
              {leaderboard.title}
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              {leaderboard.description}
            </p>

            <div className="mt-3">
              {leaderboard.formats?.map((format) => (
                <span
                  key={format}
                  className="mr-2 text-sm"
                >
                  {format}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm">
              {leaderboard.playerCount} players
            </p>

            <p className="text-sm">
              {leaderboard.tournamentCount} tournaments
            </p>
          </a>
        ))}
      </div>

      {filteredLeaderboards.length === 0 && (
        <p className="mt-8">
          No leaderboards found.
        </p>
      )}
    </main>
  )
}
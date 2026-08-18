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
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-sky-700">
        World Beyblade Organization
      </p>

      <h1 className="mt-3 text-3xl font-bold text-slate-950">
        WBO Leaderboards
      </h1>

      <p className="mt-4 max-w-2xl text-slate-600">
        Browse competitive Beyblade leaderboards and see how players rank
        across different formats.
      </p>

      <input
        type="text"
        placeholder="Search leaderboards..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="mt-8 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filteredLeaderboards.map((leaderboard) => (
          <a
            key={leaderboard.id}
            href={`/leaderboards/${leaderboard.slug}`}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {leaderboard.bannerImageUrl && (
              <img
                src={leaderboard.bannerImageUrl}
                alt={`${leaderboard.title} banner`}
                className="h-40 w-full object-cover"
              />
            )}

            <div className="p-5">
              <h2 className="text-xl font-bold text-slate-950">
                {leaderboard.title}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {leaderboard.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {leaderboard.formats?.map((format) => (
                  <span
                    key={format}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {format}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                <span>{leaderboard.playerCount} players</span>
                <span>{leaderboard.tournamentCount} tournaments</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredLeaderboards.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No leaderboards found.
        </p>
      )}
    </main>
  );
}
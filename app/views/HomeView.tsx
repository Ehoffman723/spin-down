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
    <main>
      <h1>WBO Leaderboards</h1>
    
      {filteredLeaderboards.map((leaderboard) => (
        
        <div key={leaderboard.id}>
          <a
            key={leaderboard.id}
            href={`/leaderboards/${leaderboard.slug}`}
          >
            <img src={leaderboard.banner} alt="" />

            <h2>{leaderboard.title}</h2>

            <p>{leaderboard.description}</p>

            <p>
              {leaderboard.playerCount} players {" "}
              {leaderboard.tournamentCount} tournaments
            </p>
          </a>
        </div>
      ))}
      <input
        type="text"
        placeholder="Search leaderboards..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </main>
  );
}
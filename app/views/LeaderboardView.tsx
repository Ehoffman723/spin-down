import { useParams } from "react-router";

export default function LeaderboardView() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-sky-700">Leaderboard</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950">{slug}</h1>
      <p className="mt-4 text-slate-600">
        Build this view with data from <code>/api/leaderboards/{slug}</code>.
      </p>
    </main>
  );
}

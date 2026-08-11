import RaceList from './components/RaceList';

export const revalidate = 600; // ISR: Revalidate every 10 minutes (600 seconds)

async function getRaces() {
  try {
    // In dev, Next.js proxy doesn't apply to SSR fetch, so we need absolute URL
    // In production, we'd use the deployed Vercel domain or direct function call
    // For build time SSR where VERCEL_URL might be tricky, fallback safely

    let apiUrl = 'http://127.0.0.1:8000/api/races'; // Default
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
       apiUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/races`;
    }

    const res = await fetch(apiUrl, {
      next: { revalidate: 600 } // ISR Cache: 10 mins
    });

    if (!res.ok) {
      // Don't throw to allow build to pass if backend is offline during build
      console.warn('Failed to fetch data, returning empty array');
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const races = await getRaces();

  return (
    <main className="min-h-screen bg-gray-200 py-6">
      <RaceList races={races} />
    </main>
  );
}

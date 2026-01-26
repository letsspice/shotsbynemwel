export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-black flex items-center">
      <section className="w-full max-w-5xl mx-auto px-6 py-24 sm:py-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
          Shots by Nemwel
        </h1>
        <p className="mt-3 text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
          Hiking • Landscapes • Stories
        </p>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          Documenting hiking journeys and outdoor storytelling through photography and short-form video.
        </p>
        <div className="mt-10 flex justify-center flex-wrap gap-4">
          <a
            href="#hikes"
            className="rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Explore Hikes
          </a>
          <a
            href="https://www.instagram.com/shotbynemwel/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-black px-8 py-3 font-semibold text-black transition hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-900"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@shotsbynemwel"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-black px-8 py-3 font-semibold text-black transition hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-900"
          >
            TikTok
          </a>
        </div>
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          Design by Rachael · Engineering by Nemwel
        </p>
      </section>
    </main>
  );
}

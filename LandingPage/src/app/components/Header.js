import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/file.svg"
            alt="Pocket P'tit Bac Logo"
            width={28}
            height={28}
          />
          <h1 className="text-xl font-bold text-sky-600 dark:text-sky-400">
            Pocket P'tit Bac
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/comment-jouer"
            className="text-gray-700 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400 transition"
          >
            Comment jouer
          </Link>
          <Link
            href="/a-propos"
            className="text-gray-700 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400 transition"
          >
            À propos
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/rejoindre"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Rejoindre
          </Link>
          <Link
            href="/creer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Créer une partie
          </Link>
        </div>
      </div>
    </header>
  );
}

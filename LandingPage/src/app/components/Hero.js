import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200 dark:bg-sky-900/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-70"></div>
      <div className="absolute left-0 top-1/3 w-56 h-56 bg-sky-200 dark:bg-sky-900/30 rounded-full -translate-x-1/2 blur-3xl opacity-50"></div>
      <div className="absolute right-20 bottom-20 w-44 h-44 bg-sky-200 dark:bg-sky-900/30 rounded-full blur-2xl opacity-40"></div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white">
                Pocket P'tit Bac
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Le jeu du Petit Bac dans votre poche et sans papier 😉!
              </p>
            </div>

            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-slate-700/50 shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                  <Image
                    src="/paperplane.svg"
                    alt="Icon"
                    width={46}
                    height={46}
                    className="text-sky-500"
                  />
                </div>
              </div>

              <p className="text-lg text-center mb-8">
                Jouez au célèbre jeu du Petit Bac avec vos amis, où que vous
                soyez !
              </p>

              <div className="space-y-4">
                <Link
                  href="/creer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Créer une session
                </Link>

                <Link
                  href="/rejoindre"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  Rejoindre une session
                </Link>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/comment-jouer"
                className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
              >
                Comment jouer ?
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-sky-100 dark:from-sky-900/40 dark:to-slate-900/60 rounded-3xl transform rotate-3 scale-105"></div>
              <Image
                src="/window.svg"
                alt="App Preview"
                width={500}
                height={700}
                className="relative z-10 mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Recent Games Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-4">Parties récentes</h2>
          <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-slate-700/50 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400 mb-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Aucune partie récente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

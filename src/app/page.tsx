import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
//import { api } from "~/trpc/server";
import { NavBar } from "./_components/navbar";
import { TriviaSettingsForm } from "./_components/questionRelated/settings/TriviaSettingsForm";
import { Suspense } from "react";
import LoadingSuspense from "./loading";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <Suspense fallback={<LoadingSuspense />}>
      <main className="relative flex min-h-screen flex-col items-center bg-gradient-to-t from-blue-100 via-blue-300 to-blue-500 font-sans">
        <NavBar session={session} />
        <div className="container flex flex-grow flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Link className="punchy-btn" href={"/game"}>
            Quick Play
          </Link>
          <TriviaSettingsForm />

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
          </div>
        </div>
      </main>
    </Suspense>
  );
}

/* async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.trivia.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
 */
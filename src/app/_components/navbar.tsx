"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { Button, buttonVariants } from "./@/components/ui/button";
import { type Session } from "node_modules/next-auth/core/types";

export function NavBar({ session }: { session: Session | null }) {
  return (
    <div
      className="sticky left-0 top-0 z-10 flex h-16 w-full items-center justify-between
    border-b-2 border-trivia-400 bg-gradient-to-r from-trivia-400 via-trivia-200 to-trivia-300 px-4 text-trivia-100"
    >
      <div className="flex flex-1 items-center text-start">
        <Link
          href="https://github.com/JustAnotherHeroRiding"
          className={`${buttonVariants({
            variant: "outline",
          })} flex items-center hover:underline`}
          target="_blank"
        >
          JustAnotherHeroRiding
          <FontAwesomeIcon
            icon={faGithub}
            className="ml-2 h-6 w-6 hover:text-trivia-200"
          />
        </Link>
      </div>
      <Link
        href={"/"}
        className={`${buttonVariants({
          variant: "link",
        })}flex-1 text-center `}
      >
        <span className="rounded-lg border bg-trivia-100 p-2 font-sans text-2xl font-black  text-trivia-400">
          Trivial
        </span>
      </Link>
      <div className="flex flex-1 items-center justify-end gap-2">
        <Button variant={"outline"}>How to play</Button>
        <Link
          className={`${buttonVariants({
            variant: "outline",
          })} gap-2 rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20`}
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}

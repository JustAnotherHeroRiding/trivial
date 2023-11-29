import { api } from "~/trpc/server";
import { NavBar } from "../_components/navbar";
import { QuestionCard } from "../_components/questionRelated/questionCard";
import { LoadingSpinner } from "../_components/utilities/LoadingSpinner";
import { getServerAuthSession } from "~/server/auth";

export default async function Game({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerAuthSession();
  //console.log(searchParams.limit); This prints 2 as passed
  // Lets try and pass all the params instead of just the limit, it should be compatible with the object expected
  const limit = searchParams.limit ?? 2; // Default to 2 if not provided
  const questions = await api.trivia.getQuestions.query({
    limit: Number(limit),
  });

  // Let's create a brand new client component to pass all this data to
  return (
    <main className="relative flex min-h-screen flex-col items-center bg-gradient-to-t from-blue-100 via-blue-300 to-blue-500 font-sans">
      {" "}
      <NavBar session={session} />
      <div className="container flex flex-grow flex-col items-center justify-center gap-12 px-4 py-16 ">
        {questions.length === 0 ? (
          <>
            <LoadingSpinner />
            <p>No questions found</p>
          </>
        ) : (
          questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>
    </main>
  );
}

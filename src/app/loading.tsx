import { LoadingSpinner } from "./_components/utilities/LoadingSpinner";

export default function LoadingSuspense() {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-gradient-to-t from-blue-100 via-blue-300 to-blue-500">
      <div className="flex flex-col items-center gap-8 justify-center rounded-xl border bg-black shadow-lg shadow-gray-600 p-4 text-white">
        <LoadingSpinner className="" />
        <p className="text-center text-4xl ">Loading content...</p>
      </div>
    </div>
  );
}

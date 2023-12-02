import { LoadingSpinner } from "./_components/utilities/LoadingSpinner";

export default function LoadingSuspense() {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-gradient-to-t from-blue-100 via-blue-300 to-blue-500">
      <div className="flex flex-col items-center justify-center gap-8 rounded-xl border bg-black p-4 text-white shadow-lg shadow-gray-600">
        <LoadingSpinner className="" />
        <p className="text-center text-4xl ">Loading content...</p>
      </div>
    </div>
  );
}

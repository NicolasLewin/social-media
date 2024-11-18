export default function Home() {
  return (
    <>
      <header className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">Home</h1>
      </header>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-400">Welcome to your feed!</p>
        </div>
      </div>
    </>
  );
}

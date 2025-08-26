
export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">ParcelTracking Dashboard</h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 w-full max-w-md">
        <p className="mb-4 text-lg">Hoş geldiniz! Sipariş ve kargo takibi için panel yakında burada olacak.</p>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
         <li>Sipariş ekleme</li>
          <li>Sipariş listeleme</li>
          <li>Kargo hareketleri</li>
        </ul>
      </div>
    </div>
  );
}

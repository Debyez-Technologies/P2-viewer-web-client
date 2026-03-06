export default function CommonInfo({children}) {
    return (
    <div className="mt-6 p-4 border-t border-gray-300">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Common Info: </h2>
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}
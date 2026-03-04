export default function OfficeDecorations() {
  return (
    <>
      {/* Meeting Room */}
      <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 p-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <span className="text-sm font-medium">Meeting Room</span>
        </div>
        <p className="mt-1 text-xs text-indigo-400">Available</p>
      </div>

      {/* Water Cooler */}
      <div className="flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4">
        <span className="text-2xl">💧</span>
        <div>
          <p className="text-sm font-medium text-cyan-700">Water Cooler</p>
          <p className="text-xs text-cyan-400">Break area</p>
        </div>
      </div>

      {/* Plants */}
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
        <span className="text-2xl">🪴</span>
        <div>
          <p className="text-sm font-medium text-emerald-700">Office Plants</p>
          <p className="text-xs text-emerald-400">+15% productivity</p>
        </div>
      </div>

      {/* Coffee Machine */}
      <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
        <span className="text-2xl">☕</span>
        <div>
          <p className="text-sm font-medium text-orange-700">Coffee Station</p>
          <p className="text-xs text-orange-400">Freshly brewed</p>
        </div>
      </div>
    </>
  );
}

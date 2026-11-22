export function RatingTable({ name, unit, values }: { name: string; unit: string; values: readonly (readonly [string | number, number])[] }) {
  return <table className="w-full border-collapse bg-surface text-sm">
    <caption className="mb-2 text-left font-display text-base">{name}</caption>
    <thead className="border-b-2 border-line text-left"><tr><th scope="col" className="px-3 py-2">Code</th><th scope="col" className="px-3 py-2">{unit}</th></tr></thead>
    <tbody className="font-mono">{values.map(([code, value]) => <tr className="border-b border-line" key={code}>
      <th scope="row" className="px-3 py-1.5 text-left font-semibold">{code}</th><td className="px-3 py-1.5">{value}</td>
    </tr>)}</tbody>
  </table>;
}

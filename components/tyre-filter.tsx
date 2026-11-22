"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { categories, type CategoryId } from '../content/brands';

type Group = { category: CategoryId; count: number; content: ReactNode };

export function TyreFilter({ groups }: { groups: Group[] }) {
  const [selected, setSelected] = useState<CategoryId | 'all'>('all');
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const shown = selected === 'all' ? groups : groups.filter(group => group.category === selected);
  const count = shown.reduce((total, group) => total + group.count, 0);
  const options = [['all', 'All'], ...Object.entries(categories)] as [CategoryId | 'all', string][];

  return <>
    {ready && <div className="mb-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter tyre ranges">
        {options.map(([id, label]) => <button type="button" className="filter-chip" key={id}
          aria-pressed={selected === id} onClick={() => setSelected(id)}>{label}</button>)}
      </div>
      <p role="status" className="spec mt-4 text-muted">{count} {count === 1 ? 'range' : 'ranges'}</p>
    </div>}
    <div className="grid gap-8">
      {shown.map(group => <div key={group.category}>{group.content}</div>)}
      {count === 0 && <p>No ranges in this category.</p>}
    </div>
  </>;
}

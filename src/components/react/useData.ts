import { useEffect, useState } from 'react';
import { listPublished, getSingleton } from '../../lib/db';

/** Renders `fallback` immediately (SSR + first paint), then swaps in live rows. */
export function usePublished<T = any>(table: string, fallback: T[]): T[] {
  const [data, setData] = useState<T[]>(fallback);
  useEffect(() => {
    let on = true;
    listPublished<T>(table).then((rows) => { if (on && rows && rows.length) setData(rows); });
    return () => { on = false; };
  }, [table]);
  return data;
}

export function useSingleton<T = any>(table: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);
  useEffect(() => {
    let on = true;
    getSingleton<T>(table).then((row) => { if (on && row) setData({ ...fallback, ...row }); });
    return () => { on = false; };
  }, [table]);
  return data;
}

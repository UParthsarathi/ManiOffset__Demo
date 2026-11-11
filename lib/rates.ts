import { createClient } from '@/lib/supabase/server';
import { DEFAULT_RATES, parseRates, type RateCard } from '@/lib/offset-pricing';

export interface RateVersion {
  id: number;
  created_at: string;
  note: string | null;
  rates: RateCard;
}

// Published rate cards, newest first. Empty when nothing is published yet.
// ponytail: read on every request and falls back to the built-in sheet rates if the
// table is unreachable; add caching / an "unavailable" state if either starts to matter.
export async function getRateVersions(limit = 1): Promise<RateVersion[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('rate_cards')
      .select('id, created_at, note, rates')
      .order('id', { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.flatMap((row) => {
      const rates = parseRates(row.rates);
      return rates ? [{ id: row.id, created_at: row.created_at, note: row.note, rates }] : [];
    });
  } catch {
    return [];
  }
}

export async function getPublishedRates(): Promise<RateCard> {
  return (await getRateVersions(1))[0]?.rates ?? DEFAULT_RATES;
}

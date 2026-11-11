// Owner-facing price calculator. Two tabs, named like the pricing workbook:
// Quotation (all six cost lines) and Costing Database (the editable rate card).
import { AdminCalculator } from '@/components/calculator/AdminCalculator';
import { DEFAULT_RATES } from '@/lib/offset-pricing';
import { getRateVersions } from '@/lib/rates';

export default async function AdminCalculatorPage() {
  const versions = await getRateVersions(10);
  return <AdminCalculator published={versions[0]?.rates ?? DEFAULT_RATES} versions={versions} />;
}

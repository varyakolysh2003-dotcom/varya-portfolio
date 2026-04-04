import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const casePage = path.join(root, 'src/pages/CasePage.tsx');
const outFile = path.join(root, 'src/cases/tbank/TBankCase.tsx');

const lines = fs.readFileSync(casePage, 'utf8').split(/\r?\n/);
// 1-based: 765 .. 1479 inclusive
const start = 764; // 0-based start at line 765
const end = 1479; // 1-based end line, exclusive in slice => slice(764, 1479) gives lines 765-1479

const slice = lines.slice(start, end);
const openRe = /^\s*\{\s*caseStudy\.id\s*===\s*['"]t-bank['"]\s*&&\s*\(\s*$/;
const closeRe = /^\s*\)\}\s*$/;

const out = [];
for (const line of slice) {
  if (openRe.test(line)) continue;
  if (closeRe.test(line)) continue;
  out.push(line);
}

const header = `import type { Dispatch, SetStateAction } from 'react';
import type { Locale } from '../../types';
import { typograph } from '../../utils/typograph';

/** T-Bank testing block: prototype screens in filename order (same for RU/EN). */
const TBANK_TESTING_PROTOTYPE_IMAGES = [
  '/covers/T-bank/1_1.webp',
  '/covers/T-bank/1_2.webp',
  '/covers/T-bank/1_3.webp',
  '/covers/T-bank/1_4.webp',
] as const;

export type TBankCaseProps = {
  locale: Locale;
  activePersona: 'families' | 'friends' | 'colleagues' | 'couples' | 'students' | 'rvp' | 'vnzh';
  setActivePersona: Dispatch<SetStateAction<'families' | 'friends' | 'colleagues' | 'couples' | 'students' | 'rvp' | 'vnzh'>>;
  activeTbankTestChip: number;
  setActiveTbankTestChip: Dispatch<SetStateAction<number>>;
};

export default function TBankCase({
  locale,
  activePersona,
  setActivePersona,
  activeTbankTestChip,
  setActiveTbankTestChip,
}: TBankCaseProps) {
  return (
    <>
`;

const footer = `    </>
  );
}
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, header + out.join('\n') + '\n' + footer, 'utf8');
console.log('Wrote', outFile, 'body lines', out.length);

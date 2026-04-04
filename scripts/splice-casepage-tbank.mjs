import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const casePage = path.join(root, 'src/pages/CasePage.tsx');

let text = fs.readFileSync(casePage, 'utf8');
const lines = text.split(/\r?\n/);

const before = lines.slice(0, 764); // lines 1-764 (keep through line 764 blank after okolo closing)
const after = lines.slice(1479); // from line 1480 onward (LavkaCase)

const insertion = [
  '            {caseStudy.id === \'t-bank\' && (',
  '              <TBankCase',
  '                locale={locale}',
  '                activePersona={activePersona}',
  '                setActivePersona={setActivePersona}',
  '                activeTbankTestChip={activeTbankTestChip}',
  '                setActiveTbankTestChip={setActiveTbankTestChip}',
  '              />',
  '            )}',
];

const newLines = [...before, ...insertion, ...after];
fs.writeFileSync(casePage, newLines.join('\n'), 'utf8');
console.log('Spliced CasePage t-bank section');

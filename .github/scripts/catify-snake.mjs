import { readFile, writeFile } from "node:fs/promises";

const cat = `<g class="s s0">
  <path d="M1 5 L2.4 1.2 L5.2 3.1 A6 6 0 0 1 10.8 3.1 L13.6 1.2 L15 5 V10.2 A5.6 5.6 0 0 1 9.4 15 H6.6 A5.6 5.6 0 0 1 1 10.2 Z" fill="#F59E0B"/>
  <circle cx="5.4" cy="8" r="1" fill="#1F2937"/>
  <circle cx="10.6" cy="8" r="1" fill="#1F2937"/>
  <path d="M7.1 10.2 L8 11 L8.9 10.2 M8 11 V12" fill="none" stroke="#1F2937" stroke-width=".75" stroke-linecap="round"/>
</g>`;

for (const file of process.argv.slice(2)) {
  const svg = await readFile(file, "utf8");
  const result = svg.replace(
    /<rect class="s s0"[^>]*\/>/,
    cat,
  );

  if (result === svg) {
    throw new Error(`Could not find the animated snake head in ${file}`);
  }

  await writeFile(file, result);
}

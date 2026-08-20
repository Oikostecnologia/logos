const fs = require('fs');
const BASE = 'https://oikostecnologia.github.io/logos/';
const rows = fs.readFileSync('names.tsv', 'utf8').trim().split('\n').map(l => l.split('\t'));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fileFor = slug => ['png','jpg','webp'].map(e => slug+'.'+e).find(f => fs.existsSync(f)) || null;

const cards = rows.map(([slug, name]) => {
  const f = fileFor(slug);
  if (!f) return '';
  const url = BASE + f;
  const emp = slug.startsWith('empresa-');
  return `    <article class="card${emp ? ' emp' : ''}">
      <div class="thumb"><img src="${f}" alt="${esc(name)}"></div>
      <h2>${esc(name)}</h2>
      <input class="url" value="${url}" readonly>
    </article>`;
}).filter(Boolean).join('\n');

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Logos Grupo OIKOS</title>
<style>
:root{--bg:#f5f6f8;--card:#fff;--ink:#1d2330;--muted:#5b6472;--line:#e3e6ea;--azul:#2f3f7c}
*{box-sizing:border-box}
body{margin:0;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--ink)}
header{background:var(--azul);color:#fff;padding:26px 20px}
header .w{max-width:1100px;margin:0 auto}
header h1{margin:0 0 6px;font-size:22px}header p{margin:0;opacity:.85;font-size:14px}
main{max-width:1100px;margin:0 auto;padding:24px 20px 60px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px}
.card.emp{border-color:var(--azul)}
.thumb{height:120px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px}
.thumb img{max-width:100%;max-height:110px;object-fit:contain}
.card h2{margin:0;font-size:14px;font-weight:600}
.url{font-size:11px;padding:6px 8px;border:1px solid var(--line);border-radius:6px;color:var(--muted);background:#fafbfc;width:100%}
footer{text-align:center;color:var(--muted);font-size:12px;padding:20px}
</style></head>
<body>
<header><div class="w"><h1>Logos Grupo OIKOS — Catalogo de URLs</h1>
<p>URLs publicas y permanentes para insertar los logos en correos HTML.</p></div></header>
<main><div class="grid">
${cards}
</div></main>
<footer>Grupo Empresarial OIKOS</footer>
</body></html>
`;
fs.writeFileSync('index.html', html);
console.log('index.html OK -', rows.length, 'logos');

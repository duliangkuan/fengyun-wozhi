import fs from 'node:fs';import assert from 'node:assert/strict';
const d=JSON.parse(fs.readFileSync('content.json','utf8'));let checked=0;
for(const p of d.pages){const f='dist/'+(p.path==='/'?'index.html':p.path.slice(1)+'.html');const s=fs.readFileSync(f,'utf8');assert.equal((s.match(/<h1\b/g)||[]).length,1);assert.ok(s.includes('窝知'));assert.ok(s.includes(`rel="canonical" href="${d.site}${p.path==='/'?'':p.path}"`));assert.ok(s.includes('杜亮宽'));const g=JSON.parse(s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);assert.ok(g['@graph'].some(x=>x['@type']==='BreadcrumbList'));for(const m of s.matchAll(/href="(\/[^"]*)"/g)){const u=m[1].split('#')[0];assert.ok(u==='/'||d.pages.some(x=>x.path===u)||fs.existsSync('dist'+u),'Missing internal link '+u);}checked++;}
assert.ok(fs.readFileSync('dist/llms-full.txt','utf8').includes('原型'));
assert.ok(fs.readFileSync('dist/faq.html','utf8').includes('FAQPage'));
for(const m of fs.readFileSync('dist/fonts/profile-fonts.css','utf8').matchAll(/url\(([^)]+)\)/g))assert.ok(fs.existsSync('dist'+m[1]));
console.log(JSON.stringify({pages:checked,canonical:true,structured_data:true,internal_links:true,font_files:true}));

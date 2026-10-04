import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
const basePath=process.env.NEXT_PUBLIC_BASE_PATH || '/mny-fitness-club';
function localPath(url){
 if(!url.startsWith(basePath+'/'))throw Error(`Asset/link misses Pages base path: ${url}`);
 return url.slice(basePath.length);
}
const routes=['','about','facilities','classes','personal-training','membership','gallery','contact','blog','privacy','terms'];
let links=0,assets=0;
for(const route of routes){
 const file=path.join(root,route,'index.html');
 if(!fs.existsSync(file))throw Error(`Missing route: /${route}`);
 const html=fs.readFileSync(file,'utf8');
 if((html.match(/<h1\b/g)||[]).length!==1)throw Error(`Expected one H1: /${route}`);
 for(const token of ['<title>','name="description"','rel="canonical"','application/ld+json'])if(!html.includes(token))throw Error(`Missing ${token}: /${route}`);
 for(const [,href] of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
  const local=localPath(href);
  const target=path.join(root,local.endsWith('/')?local+'index.html':local);
  if(!fs.existsSync(target))throw Error(`Broken internal link: ${href}`);
  links++;
 }
 for(const [,src] of html.matchAll(/(?:src|srcSet)="([^" ]+)/g)){
  if(!src.startsWith('/'))continue;
  if(!fs.existsSync(path.join(root,localPath(src))))throw Error(`Missing image: ${src}`);
  assets++;
 }
 console.log(`PASS /${route} — heading, metadata, links, images`);
}
for(const file of fs.readdirSync(path.join(root,'_next/static/chunks')).filter(f=>f.endsWith('.css'))){
 const css=fs.readFileSync(path.join(root,'_next/static/chunks',file),'utf8');
 for(const [,url] of css.matchAll(/url\(["']?(\/[^)"']+)["']?\)/g)){
  if(!fs.existsSync(path.join(root,localPath(url))))throw Error(`Missing CSS asset: ${url}`);
 }
}
fs.writeFileSync(path.join(root,'.nojekyll'),'');
for(const file of ['robots.txt','sitemap.xml'])if(!fs.existsSync(path.join(root,file)))throw Error(`Missing ${file}`);
console.log(`Verified ${routes.length} routes, ${links} internal links, ${assets} image references, robots and sitemap.`);

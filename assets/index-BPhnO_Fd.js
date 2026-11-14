(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`picgallery`,t=1,n=`uploads`,r=null;function i(){return r||(r=new Promise((r,i)=>{let a=indexedDB.open(e,t);a.onupgradeneeded=()=>{let e=a.result;e.objectStoreNames.contains(n)||e.createObjectStore(n,{keyPath:`id`})},a.onsuccess=()=>r(a.result),a.onerror=()=>i(a.error)}),r)}function a(e,t){return i().then(r=>new Promise((i,a)=>{let o=r.transaction(n,e),s=t(o.objectStore(n));o.oncomplete=()=>i(s),o.onerror=()=>a(o.error),o.onabort=()=>a(o.error)}))}async function o(e){await a(`readwrite`,t=>t.put(e))}async function s(){return a(`readonly`,e=>{let t=e.getAll(),n=[];return t.onsuccess=()=>{n=t.result},{get value(){return n}}}).then(e=>e.value)}async function c(e){await a(`readwrite`,t=>t.delete(e))}var l=[{id:`paintings`,name:`Pintura clásica`,color:`#c8553d`},{id:`abstract`,name:`Abstracto`,color:`#1b2aff`},{id:`automotive`,name:`Automoción`,color:`#d8a400`},{id:`nature`,name:`Naturaleza`,color:`#3e7c4a`},{id:`textile`,name:`Diseño textil`,color:`#7a4b9e`},{id:`inbox`,name:`Sin clasificar`,color:`#8c8a85`}],u=[{id:`alegoria-celeste`,title:`Alegoría celeste`,description:`Fresco barroco con figuras suspendidas entre nubes.`,file:`img/formats/alegoria-celeste.png`,format:`PNG`,width:640,height:800,bytes:802808,folderId:`paintings`,favorite:!0,tags:[`barroco`,`mitología`,`fresco`],createdAt:`2026-11-12T09:20:00.000Z`},{id:`jardin-interior`,title:`Jardín interior`,description:`Óleo abstracto en verdes, azules y violetas.`,file:`img/formats/jardin-interior.webp`,format:`WEBP`,width:640,height:427,bytes:54666,folderId:`abstract`,tags:[`abstracto`,`óleo`,`jardín`],createdAt:`2026-11-11T16:10:00.000Z`},{id:`ferrari-ciudad`,title:`Ferrari en la ciudad`,description:`Amarillo intenso sobre el skyline al atardecer.`,file:`img/pexels-dbaler-30112301.jpg`,format:`JPG`,width:1280,height:1920,bytes:250090,folderId:`automotive`,tags:[`coche`,`urbano`,`amarillo`],createdAt:`2026-11-11T11:40:00.000Z`},{id:`bodegon-flores`,title:`Bodegón de flores`,description:`Composición floral sobre fondo oscuro.`,file:`img/formats/bodegon-flores.png`,format:`PNG`,width:640,height:911,bytes:881303,folderId:`paintings`,favorite:!0,tags:[`bodegón`,`flores`,`clásico`],createdAt:`2026-11-10T18:05:00.000Z`},{id:`geometria-cromatica`,title:`Geometría cromática`,description:`Bloques de color y trazos gestuales.`,file:`img/formats/geometria-cromatica.webp`,format:`WEBP`,width:640,height:399,bytes:67390,folderId:`abstract`,tags:[`abstracto`,`geometría`,`color`],createdAt:`2026-11-10T10:30:00.000Z`},{id:`ferrari-amarillo`,title:`Rojo amarillo`,description:`Estudio urbano de un Ferrari amarillo.`,file:`img/formats/raw/ferrari-amarillo.raw-preview.jpg`,format:`RAW`,proxy:!0,width:1280,height:853,bytes:199984,folderId:`automotive`,tags:[`coche`,`urbano`,`amarillo`],createdAt:`2026-11-09T15:15:00.000Z`},{id:`bosque-escarlata`,title:`Bosque escarlata`,description:`Reflejos otoñales sobre la lámina del lago.`,file:`img/ken-cheung-Z2M2KkdNLWQ-unsplash.jpg`,format:`JPG`,width:640,height:427,bytes:76418,folderId:`nature`,tags:[`paisaje`,`bosque`,`otoño`],createdAt:`2026-11-09T09:05:00.000Z`},{id:`sol-de-oleo`,title:`Sol de óleo`,description:`Amarillos y rojos de factura matérica.`,file:`img/formats/sol-de-oleo.webp`,format:`WEBP`,width:640,height:425,bytes:59170,folderId:`abstract`,tags:[`abstracto`,`óleo`,`cálido`],createdAt:`2026-11-08T17:45:00.000Z`},{id:`el-rebano`,title:`El rebaño`,description:`Paisaje pastoril con ovejas y robles.`,file:`img/birmingham-museums-trust-8wcoY3wcbL0-unsplash.jpg`,format:`JPG`,width:640,height:517,bytes:126854,folderId:`paintings`,tags:[`paisaje`,`rural`,`clásico`],createdAt:`2026-11-07T12:20:00.000Z`},{id:`ferrari-azul`,title:`Azul cobalto`,description:`Ferrari azul frente al ladrillo rojo.`,file:`img/formats/raw/ferrari-azul.raw-preview.jpg`,format:`RAW`,proxy:!0,width:1280,height:853,bytes:203285,folderId:`automotive`,favorite:!0,tags:[`coche`,`urbano`,`azul`],createdAt:`2026-11-06T16:55:00.000Z`},{id:`bodegon-frutas`,title:`Bodegón de frutas`,description:`Uvas, melocotones y granadas sobre piedra.`,file:`img/formats/bodegon-frutas.png`,format:`PNG`,width:640,height:505,bytes:469771,folderId:`paintings`,tags:[`bodegón`,`frutas`,`clásico`],createdAt:`2026-11-05T10:10:00.000Z`},{id:`rafaga-cromatica`,title:`Ráfaga cromática`,description:`Gesto azul, verde y naranja sobre lienzo.`,file:`img/formats/rafaga-cromatica.webp`,format:`WEBP`,width:640,height:480,bytes:68516,folderId:`abstract`,tags:[`abstracto`,`gesto`,`color`],createdAt:`2026-11-04T14:35:00.000Z`},{id:`patron-morris`,title:`Patrón Morris`,description:`Estampado floral de inspiración Arts & Crafts.`,file:`img/birmingham-museums-trust--KfLa4I4eTo-unsplash.jpg`,format:`JPG`,width:640,height:434,bytes:181672,folderId:`textile`,tags:[`textil`,`patrón`,`floral`],createdAt:`2026-11-03T09:50:00.000Z`},{id:`cordillera-en-calma`,title:`Cordillera en calma`,description:`Estudio de montaña entre brumas.`,file:`img/birmingham-museums-trust-HEEvYhNzpEo-unsplash-2.jpg`,format:`JPG`,width:640,height:487,bytes:97313,folderId:`paintings`,tags:[`paisaje`,`montaña`,`niebla`],createdAt:`2026-11-02T18:25:00.000Z`},{id:`oleo-en-azul`,title:`Óleo en azul`,description:`Azul cobalto sobre naranja encendido.`,file:`img/steve-johnson-RLyEzLmhR98-unsplash.jpg`,format:`JPG`,width:640,height:445,bytes:101562,folderId:`abstract`,favorite:!0,tags:[`abstracto`,`óleo`,`azul`],createdAt:`2026-11-01T11:15:00.000Z`},{id:`la-calle-del-reloj`,title:`La calle del reloj`,description:`Acuarela urbana del siglo XIX.`,file:`img/birmingham-museums-trust-_fXZDGdrYZk-unsplash.jpg`,format:`JPG`,width:640,height:465,bytes:68394,folderId:`paintings`,tags:[`urbano`,`acuarela`,`clásico`],createdAt:`2026-10-30T15:40:00.000Z`},{id:`cordillera-al-alba`,title:`Cordillera al alba`,description:`Montañas, niebla y vegetación otoñal.`,file:`img/birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg`,format:`JPG`,width:640,height:440,bytes:60577,folderId:`paintings`,tags:[`paisaje`,`montaña`,`otoño`],createdAt:`2026-10-28T09:30:00.000Z`},{id:`el-olimpo`,title:`El Olimpo`,description:`Escena mitológica entre nubes y querubines.`,file:`img/lukas-meier-aAxn9pYE8L0-unsplash.jpg`,format:`JPG`,width:640,height:360,bytes:55113,folderId:`paintings`,tags:[`mitología`,`clásico`,`nubes`],createdAt:`2026-10-25T17:05:00.000Z`}],d=`picgallery:v1`;function f(){try{let e=window.localStorage.getItem(d);return e?JSON.parse(e):null}catch{return null}}function ee(e){try{window.localStorage.setItem(d,JSON.stringify(e))}catch{}}function p(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function m(e){let t=Number(e)||0;if(t<1024)return`${t} B`;let n=[`KB`,`MB`,`GB`,`TB`],r=t,i=-1;do r/=1024,i+=1;while(r>=1024&&i<n.length-1);return`${new Intl.NumberFormat(`es-ES`,{maximumFractionDigits:+(r<10)}).format(r)} ${n[i]}`}function h(e){return new Intl.NumberFormat(`es-ES`).format(Number(e)||0)}function te(e){let t=e instanceof Date?e:new Date(e);return Number.isNaN(t.getTime())?`—`:new Intl.DateTimeFormat(`es-ES`,{day:`2-digit`,month:`short`,year:`numeric`}).format(t)}function ne(e,t){return`${String(e+1).padStart(2,`0`)} / ${String(t).padStart(2,`0`)}`}function re(e){return`/7_GalleryPic/${String(e).replace(/^\/+/,``)}`}function ie(){return globalThis.crypto?.randomUUID?globalThis.crypto.randomUUID():`img-${Date.now()}-${Math.random().toString(16).slice(2)}`}function ae(e,t=200){let n=0;return(...r)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...r),t)}}function oe(e){return String(e).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)}function se(e){let t=String(e).replace(/\.[^.]+$/,``).replace(/[-_]+/g,` `).replace(/\s+/g,` `).trim();return t?t.charAt(0).toUpperCase()+t.slice(1):`Sin título`}function ce(e){try{let t=new URL(e,window.location.href).pathname.match(/\.([a-z0-9]+)$/i);return t?t[1].toLowerCase():`jpg`}catch{return`jpg`}}async function le(e){try{return await navigator.clipboard.writeText(e),!0}catch{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.append(t),t.select();try{return document.execCommand(`copy`)}catch{return!1}finally{t.remove()}}}function ue(e,t,n){return Math.min(Math.max(e,t),n)}function de(e){let t=String(e).replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t.padEnd(6,`0`).slice(0,6);return[Number.parseInt(n.slice(0,2),16),Number.parseInt(n.slice(2,4),16),Number.parseInt(n.slice(4,6),16)]}function fe(e,t,n){return`#${[e,t,n].map(e=>ue(Math.round(e),0,255).toString(16).padStart(2,`0`)).join(``).toUpperCase()}`}function pe(e,t,n){let r=e/255,i=t/255,a=n/255,o=Math.max(r,i,a),s=Math.min(r,i,a),c=(o+s)/2,l=o-s;if(l===0)return{h:0,s:0,l:c};let u=l/(1-Math.abs(2*c-1)),d=0;return d=o===r?(i-a)/l%6:o===i?(a-r)/l+2:(r-i)/l+4,d*=60,d<0&&(d+=360),{h:d,s:u,l:c}}function me(e){return e<15||e>=345?`red`:e<45?`orange`:e<70?`yellow`:e<165?`green`:e<200?`cyan`:e<255?`blue`:`purple`}function he(e,t){return Math.sqrt((e[0]-t[0])**2+(e[1]-t[1])**2+(e[2]-t[2])**2)}function ge({src:e,title:t,format:n}){let r=document.createElement(`a`),i=n===`PNG`?`png`:n===`WEBP`?`webp`:ce(e);r.href=e,r.download=`${oe(t)||`imagen`}.${i}`,r.rel=`noopener`,document.body.append(r),r.click(),r.remove()}var g=64,_e=48,ve=44,ye=6;async function be(e){let t=await fetch(e);if(!t.ok)throw Error(`No se pudo leer ${e}`);return xe(await t.blob())}async function xe(e){let t=await createImageBitmap(e);try{return Se(t)}finally{t.close?.()}}function Se(e){let t=document.createElement(`canvas`);t.width=g,t.height=g;let n=t.getContext(`2d`,{willReadFrequently:!0});n.drawImage(e,0,0,g,g);let{data:r}=n.getImageData(0,0,g,g);return Ce(r)}function Ce(e){let t=new Map;for(let n=0;n<e.length;n+=4){if(e[n+3]<128)continue;let r=e[n],i=e[n+1],a=e[n+2],o=r>>4<<8|i>>4<<4|a>>4,s=t.get(o);s||(s={count:0,red:0,green:0,blue:0},t.set(o,s)),s.count+=1,s.red+=r,s.green+=i,s.blue+=a}let n=[...t.values()].map(e=>({count:e.count,rgb:[e.red/e.count,e.green/e.count,e.blue/e.count]})).sort((e,t)=>t.count-e.count).slice(0,_e),r=[];for(let e of n){let t=r.find(t=>he(t.rgb,e.rgb)<ve);if(!t){r.push({count:e.count,rgb:[...e.rgb]});continue}let n=t.count+e.count;t.rgb=[(t.rgb[0]*t.count+e.rgb[0]*e.count)/n,(t.rgb[1]*t.count+e.rgb[1]*e.count)/n,(t.rgb[2]*t.count+e.rgb[2]*e.count)/n],t.count=n}r.sort((e,t)=>t.count-e.count);let i=r.slice(0,ye).map(e=>fe(e.rgb[0],e.rgb[1],e.rgb[2]));for(;i.length<ye;){let e=de(i.at(-1)||`#8c8a85`),t=.72+i.length*.07;i.push(fe(e[0]*t,e[1]*t,e[2]*t))}return i}function we(e){if(!Array.isArray(e)||e.length===0)return`neutral`;let t=new Map;return e.forEach((n,r)=>{let[i,a,o]=de(n),{h:s,s:c,l}=pe(i,a,o);if(c<.18||l<.08||l>.94)return;let u=me(s),d=(1-r/e.length)*(.35+c)*(l>.2&&l<.8?1:.6);t.set(u,(t.get(u)||0)+d)}),t.size===0?`neutral`:[...t.entries()].sort((e,t)=>t[1]-e[1])[0][0]}var Te=8,Ee=[`#c8553d`,`#1b2aff`,`#3e7c4a`,`#7a4b9e`,`#d8a400`,`#2b9c9c`],_={folders:l.map(e=>({...e})),images:u.map(e=>({...e,tags:[...e.tags??[]],src:re(e.file),origin:`seed`,palette:null})),sort:`recent`,activeFolder:`all`,filters:{query:``,colors:[],formats:[],tags:[]},view:{layout:`grid`,columns:4,gap:16,showMeta:!0},selectedIds:[],activeImageId:null,sidebarOpen:!1,sidebarCollapsed:!1,inspectorOpen:!0,inspectorDrawer:!1,deletedIds:[],deletedFolderIds:[],ready:!1},De=new Set,Oe=ae(()=>{ee({version:2,folders:_.folders,images:_.images.map(({src:e,...t})=>t),orderIds:_.images.map(e=>e.id),sort:_.sort,activeFolder:_.activeFolder,activeImageId:_.activeImageId,inspectorOpen:_.inspectorOpen,sidebarCollapsed:_.sidebarCollapsed,filters:_.filters,view:_.view,deletedIds:_.deletedIds,deletedFolderIds:_.deletedFolderIds})},250);function v(e=`update`){Oe();for(let t of De)t(_,e)}function y(){let e=C();e.some(e=>e.id===_.activeImageId)||(_.activeImageId=e[0]?.id??null)}function ke(e){return De.add(e),()=>De.delete(e)}function b(){return _}function x(e){return _.folders.find(t=>t.id===e)}function S(e){return e===`all`?`Todas las imágenes`:e===`favorites`?`Favoritos`:e===`recent`?`Recientes`:x(e)?.name??`Colección`}function Ae(e){return e===`all`?`Biblioteca`:e===`favorites`?`Selección personal`:e===`recent`?`Últimas incorporaciones`:`Carpeta`}function C(e=_){let t=e.images;e.activeFolder===`favorites`?t=t.filter(e=>e.favorite):e.activeFolder===`recent`?t=[...t].sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)).slice(0,Te):e.activeFolder!==`all`&&(t=t.filter(t=>t.folderId===e.activeFolder));let n=e.filters.query.trim().toLowerCase();return n&&(t=t.filter(e=>{let t=S(e.folderId).toLowerCase();return`${e.title} ${e.description??``} ${t}`.toLowerCase().includes(n)})),e.filters.formats.length>0&&(t=t.filter(t=>e.filters.formats.includes(t.format))),e.filters.colors.length>0&&(t=t.filter(t=>t.palette?e.filters.colors.includes(we(t.palette)):!1)),e.filters.tags.length>0&&(t=t.filter(t=>{let n=t.tags??[];return e.filters.tags.every(e=>n.includes(e))})),e.sort===`recent`?t=[...t].sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)):e.sort===`name`?t=[...t].sort((e,t)=>e.title.localeCompare(t.title,`es`,{sensitivity:`base`})):e.sort===`size`&&(t=[...t].sort((e,t)=>t.bytes-e.bytes)),t}function w(e=_.images){return e.reduce((e,t)=>e+(Number(t.bytes)||0),0)}function je(e=_.images){return[`JPG`,`PNG`,`WEBP`,`RAW`].map(t=>{let n=e.filter(e=>e.format===t);return{format:t,count:n.length,bytes:w(n)}})}function Me(e=_){let t=Object.fromEntries(e.folders.map(t=>[t.id,e.images.filter(e=>e.folderId===t.id).length]));return{total:e.images.length,favorites:e.images.filter(e=>e.favorite).length,recent:Math.min(Te,e.images.length),folders:t,formats:Object.fromEntries(je(e.images).map(e=>[e.format,e.count]))}}function Ne(e=_.images){let t=new Map;for(let n of e)for(let e of n.tags??[])t.set(e,(t.get(e)??0)+1);return[...t.entries()].sort((e,t)=>t[1]-e[1]||e[0].localeCompare(t[0],`es`,{sensitivity:`base`})).map(([e,t])=>({tag:e,count:t}))}function Pe(e=_){return e.images.find(t=>t.id===e.activeImageId)??null}function Fe(e=_){let t=new Set(e.selectedIds);return e.images.filter(e=>t.has(e.id))}function Ie(e){([`all`,`favorites`,`recent`].includes(e)||x(e))&&(_.activeFolder=e,_.selectedIds=[],_.sidebarOpen=!1,_.activeImageId=C()[0]?.id??null,v(`folder`))}function Le(e){_.filters.query=e,_.selectedIds=[];let t=C();t.some(e=>e.id===_.activeImageId)||(_.activeImageId=t[0]?.id??null),v(`filters`)}function Re(e){if(e===`all`)_.filters.colors=[];else{let t=new Set(_.filters.colors);t.has(e)?t.delete(e):t.add(e),_.filters.colors=[...t]}_.selectedIds=[];let t=C();t.some(e=>e.id===_.activeImageId)||(_.activeImageId=t[0]?.id??null),v(`filters`)}function ze(e){let t=new Set(_.filters.formats);t.has(e)?t.delete(e):t.add(e),_.filters.formats=[...t],_.selectedIds=[];let n=C();n.some(e=>e.id===_.activeImageId)||(_.activeImageId=n[0]?.id??null),v(`filters`)}function Be(e){let t=new Set(_.filters.tags);t.has(e)?t.delete(e):t.add(e),_.filters.tags=[...t],_.selectedIds=[];let n=C();n.some(e=>e.id===_.activeImageId)||(_.activeImageId=n[0]?.id??null),v(`filters`)}function Ve(){_.filters={query:``,colors:[],formats:[],tags:[]},_.selectedIds=[];let e=C();e.some(e=>e.id===_.activeImageId)||(_.activeImageId=e[0]?.id??null),v(`filters`)}function He(e){[`recent`,`name`,`size`,`manual`].includes(e)&&(_.sort=e,v(`sort`))}function Ue(e){_.images.some(t=>t.id===e)&&(_.activeImageId=e,v(`active`))}function We(e,t){let n=new Set(_.selectedIds);t??!n.has(e)?n.add(e):n.delete(e),_.selectedIds=[...n],_.activeImageId=e,v(`selection`)}function Ge(e){_.selectedIds=[...e],v(`selection`)}function Ke(){_.selectedIds.length!==0&&(_.selectedIds=[],v(`selection`))}function qe(e){let t=_.images.find(t=>t.id===e);if(t)return t.favorite=!t.favorite,y(),v(`favorite`),t.favorite}function Je(e,t){let n=new Set(e),r=!1;for(let e of _.images)n.has(e.id)&&(e.favorite=!!t,r=!0);r&&(y(),v(`favorite`))}function Ye(e,t){if(!x(t))return;let n=new Set(e);for(let e of _.images)n.has(e.id)&&(e.folderId=t);_.selectedIds=[],y(),v(`move`)}function Xe(e){let t=new Set(e),n=_.images.filter(e=>t.has(e.id));if(n.length===0)return 0;_.images=_.images.filter(e=>!t.has(e.id));let r=new Set(_.deletedIds);for(let e of n)r.add(e.id),e.origin===`upload`&&(c(e.id).catch(()=>null),e.src?.startsWith(`blob:`)&&URL.revokeObjectURL(e.src));return _.deletedIds=[...r],_.selectedIds=_.selectedIds.filter(e=>!t.has(e)),t.has(_.activeImageId)&&(_.activeImageId=null),y(),v(`delete`),n.length}function Ze(e){return Xe([e])}function Qe(e,t){let n=_.images.find(t=>t.id===e);if(!n)return null;let r=String(t??``).trim();return r?(n.title===r||(n.title=r,v(`update`)),r):null}function $e(){return Xe(_.images.map(e=>e.id))}function et(e,t){let n=x(e);if(!n)return null;let r=String(t??``).trim();return r?(n.name===r||(n.name=r,v(`update`)),r):null}function tt(e){if(e===`inbox`||!x(e))return!1;for(let t of _.images)t.folderId===e&&(t.folderId=`inbox`);return _.folders=_.folders.filter(t=>t.id!==e),_.deletedFolderIds.includes(e)||_.deletedFolderIds.push(e),_.activeFolder===e&&(_.activeFolder=`all`),y(),v(`folder-delete`),!0}function T(e,t=`view-style`){let n={..._.view,...e};_.view={layout:n.layout===`list`?`list`:`grid`,columns:Math.min(8,Math.max(3,Number(n.columns)||4)),gap:Math.min(48,Math.max(0,Number(n.gap)||0)),showMeta:n.showMeta!==!1},v(t)}function nt(e,t,n){let r=new Set(e);if(r.size===0||r.has(t))return;let i=_.images.filter(e=>r.has(e.id)),a=_.images.filter(e=>!r.has(e.id)),o=a.findIndex(e=>e.id===t);if(o===-1||i.length===0)return;let s=n===`after`?o+1:o;_.images=[...a.slice(0,s),...i,...a.slice(s)],_.sort=`manual`,_.selectedIds=[],v(`reorder`)}function rt(e){let t=e.trim();if(!t)return null;let n=oe(t)||`carpeta`,r=n,i=2;for(;_.folders.some(e=>e.id===r);)r=`${n}-${i}`,i+=1;return _.folders.push({id:r,name:t,color:Ee[_.folders.length%Ee.length]}),_.deletedFolderIds=_.deletedFolderIds.filter(e=>e!==r),v(`folder-create`),r}function it(e){let t=!1;for(let[n,r]of Object.entries(e)){let e=_.images.find(e=>e.id===n);e&&!e.palette&&Array.isArray(r)&&(e.palette=r,t=!0)}t&&(y(),v(`palettes`))}function at(e){e.length&&(_.images=[...e,..._.images],_.activeImageId=e[0].id,_.selectedIds=[],v(`upload`))}function E(e){_.sidebarOpen=!!e,v(`ui`)}function ot(e){_.sidebarCollapsed=!!e,v(`ui`)}function st(e){_.inspectorOpen=!!e,v(`ui`)}function D(e){_.inspectorDrawer=!!e,v(`ui`)}function ct(){(_.sidebarOpen||_.inspectorDrawer)&&(_.sidebarOpen=!1,_.inspectorDrawer=!1,v(`ui`))}async function lt(){let e=f();if(e){_.deletedIds=Array.isArray(e.deletedIds)?[...new Set(e.deletedIds)]:[],_.deletedFolderIds=Array.isArray(e.deletedFolderIds)?[...new Set(e.deletedFolderIds)]:[];let t=new Set(_.deletedFolderIds);if(_.folders=_.folders.filter(e=>!t.has(e.id)),Array.isArray(e.folders)&&e.folders.length>0){let n=e.folders.filter(e=>!t.has(e.id)),r=new Set(n.map(e=>e.id)),i=l.filter(e=>!r.has(e.id)&&!t.has(e.id));_.folders=[...n,...i]}e.sort&&(_.sort=e.sort),e.activeFolder&&(_.activeFolder=e.activeFolder),e.activeImageId&&(_.activeImageId=e.activeImageId),typeof e.inspectorOpen==`boolean`&&(_.inspectorOpen=e.inspectorOpen),typeof e.sidebarCollapsed==`boolean`&&(_.sidebarCollapsed=e.sidebarCollapsed),e.filters&&(_.filters={query:typeof e.filters.query==`string`?e.filters.query:``,colors:Array.isArray(e.filters.colors)?e.filters.colors:[],formats:Array.isArray(e.filters.formats)?e.filters.formats:[],tags:Array.isArray(e.filters.tags)?e.filters.tags:[]}),e.view&&(_.view={layout:e.view.layout===`list`?`list`:`grid`,columns:Math.min(8,Math.max(3,Number(e.view.columns)||4)),gap:Math.min(48,Math.max(0,Number(e.view.gap)||0)),showMeta:e.view.showMeta!==!1});let n=new Set(_.deletedIds);_.images=_.images.filter(e=>!n.has(e.id));let r=new Map((e.images??[]).filter(e=>!n.has(e.id)).map(e=>[e.id,e]));_.images=_.images.map(e=>{let t=r.get(e.id);return t?{...e,...t,src:e.src,origin:`seed`}:e});let i=(e.images??[]).filter(e=>e.origin===`upload`&&!n.has(e.id));if(i.length>0){let e=await s().catch(()=>[]),t=new Map(e.map(e=>[e.id,e]));for(let e of i){let n=t.get(e.id);n?.blob&&_.images.push({...e,src:URL.createObjectURL(n.blob),origin:`upload`})}}if(Array.isArray(e.orderIds)){let t=new Map(_.images.map(e=>[e.id,e])),n=new Set(e.orderIds),r=e.orderIds.map(e=>t.get(e)).filter(Boolean),i=_.images.filter(e=>!n.has(e.id));_.images=[...r,...i]}}return[`all`,`favorites`,`recent`].includes(_.activeFolder)||x(_.activeFolder)||(_.activeFolder=`all`),_.images.some(e=>e.id===_.activeImageId)||(_.activeImageId=_.images[0]?.id??null),_.ready=!0,v(`init`),_}var ut=[{id:`red`,label:`Rojos`,color:`#d93a2b`},{id:`orange`,label:`Naranjas`,color:`#e87722`},{id:`yellow`,label:`Amarillos`,color:`#e8b923`},{id:`green`,label:`Verdes`,color:`#3e7c4a`},{id:`cyan`,label:`Cian`,color:`#2b9c9c`},{id:`blue`,label:`Azules`,color:`#2a4bd7`},{id:`purple`,label:`Morados`,color:`#7a4b9e`},{id:`neutral`,label:`Neutros`,color:`#8c8a85`}],dt=[`JPG`,`PNG`,`WEBP`,`RAW`],O={library:!0,folders:!0,filters:!0,view:!1,tags:!1},ft=new Set;function k(e){return`aria-label="${e}" data-tooltip="${e}"`}function A(e,t,n=``){return`
    <svg class="icon" aria-hidden="true"><use href="#icon-${e}"></use></svg>
    <span class="sidebar__summary-label">${t}</span>
    ${n}
    <svg class="sidebar__chevron icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
  `}function j(e){return O[e]?`open`:``}function pt(e){e.querySelectorAll(`[data-section]`).forEach(e=>{O[e.dataset.section]=e.open})}function mt(e,t,n,r,i){let a=e.activeFolder===t;return`
    <button
      class="nav-item${a?` is-active`:``}"
      type="button"
      data-action="folder"
      data-folder="${t}"
      data-focus-key="folder-${t}"
      data-tooltip="${t===`all`?`Ver toda la biblioteca`:`Ver solo las imágenes marcadas como favoritas`}"
      ${a?`aria-current="page"`:``}
    >
      <svg class="icon" aria-hidden="true"><use href="#icon-${r}"></use></svg>
      <span class="nav-item__text">${n}</span>
      <span class="nav-item__count mono">${h(i)}</span>
    </button>
  `}function ht(e,t,n){let r=e.activeFolder===t.id,i=p(t.name),a=t.id!==`inbox`;return`
    <div class="folder-row">
      <button
        class="folder-item${r?` is-active`:``}"
        type="button"
        data-action="folder"
        data-folder="${p(t.id)}"
        data-drop-folder="${p(t.id)}"
        data-focus-key="folder-${p(t.id)}"
        data-tooltip="Abrir la carpeta ${i}"
        style="--dot: ${p(t.color)}"
        ${r?`aria-current="page"`:``}
      >
        <span class="folder-item__dot" aria-hidden="true"></span>
        <span class="folder-item__name">${i}</span>
        <span class="folder-item__count mono">${h(n)}</span>
      </button>
      <button
        class="folder-rename"
        type="button"
        data-action="rename-folder"
        data-folder="${p(t.id)}"
        data-focus-key="rename-folder-${p(t.id)}"
        aria-label="Renombrar la carpeta ${i}"
        data-tooltip="Renombrar carpeta"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-pencil"></use></svg>
      </button>
      ${a?`
            <button
              class="folder-delete"
              type="button"
              data-action="delete-folder"
              data-folder="${p(t.id)}"
              data-focus-key="delete-folder-${p(t.id)}"
              aria-label="Eliminar la carpeta ${i}"
              data-tooltip="Eliminar carpeta"
            >
              <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
            </button>
          `:``}
    </div>
  `}function gt(e){let t=e.filters.colors,n=ut.map(e=>`
      <button
        class="chip${t.includes(e.id)?` is-active`:``}"
        type="button"
        data-action="toggle-color"
        data-color="${e.id}"
        data-focus-key="color-${e.id}"
        data-tooltip="Filtrar por color ${e.label.toLowerCase()}"
        aria-pressed="${t.includes(e.id)}"
      >
        <span class="chip__dot" style="--dot: ${e.color}" aria-hidden="true"></span>
        ${e.label}
      </button>
    `).join(``);return`
    <div class="chips chips--dark" role="group" aria-label="Filtrar por color dominante">
      <button
        class="chip${t.length===0?` is-active`:``}"
        type="button"
        data-action="toggle-color"
        data-color="all"
        data-focus-key="color-all"
        data-tooltip="${t.length>0?`Quitar el filtro de color`:`Ver todas las imágenes`}"
        aria-pressed="${t.length===0}"
      >
        <span class="chip__dot chip__dot--all" aria-hidden="true"></span>
        Todos
      </button>
      ${n}
    </div>
  `}function _t(e,t){return`
    <div class="segmented segmented--dark" role="group" aria-label="Filtrar por formato de archivo">
      ${dt.map(n=>{let r=e.filters.formats.includes(n);return`
          <button
            class="segmented__item${r?` is-active`:``}"
            type="button"
            data-action="toggle-format"
            data-format="${n}"
            data-focus-key="format-${n}"
            data-tooltip="${r?`Quitar el filtro por formato ${n}`:`Filtrar por formato ${n}`}"
            aria-pressed="${r}"
          >
            ${n} <span class="mono">${h(t.formats[n]??0)}</span>
          </button>
        `}).join(``)}
    </div>
  `}function vt(e){let t=Ne(e.images);if(t.length===0)return``;let n=e.filters.tags;return`
    <details class="sidebar__section sidebar__section--nested" data-section="tags" ${(ft.has(`tags`)?O.tags:O.tags||n.length>0)?`open`:``}>
      <summary class="sidebar__summary sidebar__summary--nested" ${k(`Etiquetas`)}>
        ${A(`tag`,`Etiquetas`,`<span class="sidebar__summary-count mono">${h(t.length)}</span>`)}
      </summary>
      <div class="sidebar__section-body">
        <div class="tag-list" role="group" aria-label="Filtrar por etiquetas">
          ${t.map(({tag:e,count:t})=>`
                <button
                  class="tag${n.includes(e)?` is-active`:``}"
                  type="button"
                  data-action="toggle-tag"
                  data-tag="${p(e)}"
                  data-focus-key="tag-${p(e)}"
                  data-tooltip="${n.includes(e)?`Quitar el filtro por esta etiqueta`:`Filtrar por esta etiqueta`}"
                  aria-pressed="${n.includes(e)}"
                >
                  ${p(e)}
                  <span class="mono">${h(t)}</span>
                </button>
              `).join(``)}
        </div>
      </div>
    </details>
  `}function yt(e){let{layout:t,columns:n,gap:r,showMeta:i}=e.view;return`
    <details class="sidebar__section" data-section="view" ${j(`view`)}>
      <summary class="sidebar__summary" ${k(`Vista`)}>
        ${A(`layout`,`Vista`)}
      </summary>
      <div class="sidebar__section-body">
        <label class="sidebar__field">
          <span>Diseño</span>
          <select data-view-layout data-focus-key="view-layout">
            <option value="grid" ${t===`grid`?`selected`:``}>Cuadrícula</option>
            <option value="list" ${t===`list`?`selected`:``}>Lista</option>
          </select>
        </label>

        <div class="sidebar__range">
          <label for="view-columns">
            Columnas
            <output for="view-columns" data-output="columns">${n} × ${n}</output>
          </label>
          <input
            id="view-columns"
            type="range"
            min="3"
            max="8"
            step="1"
            value="${n}"
            data-view-columns
            data-focus-key="view-columns"
          />
        </div>

        <div class="sidebar__range">
          <label for="view-gap">
            Separación
            <output for="view-gap" data-output="gap">${r} px</output>
          </label>
          <input
            id="view-gap"
            type="range"
            min="0"
            max="48"
            step="2"
            value="${r}"
            data-view-gap
            data-focus-key="view-gap"
          />
        </div>

        <label class="toggle-field toggle-field--dark">
          <input
            type="checkbox"
            data-view-meta
            data-focus-key="view-meta"
            ${i?`checked`:``}
          />
          Mostrar nombre y datos
        </label>
      </div>
    </details>
  `}function bt(e){pt(e);let t=b(),n=Me(t),r=w(t.images),i=t.filters.query.trim()!==``||t.filters.colors.length>0||t.filters.formats.length>0||t.filters.tags.length>0,a=t.filters.colors.length+t.filters.formats.length+t.filters.tags.length,o=t.folders.map(e=>ht(t,e,n.folders[e.id]??0)).join(``);e.innerHTML=`
    <div class="brand">
      <span class="brand__mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      <span class="brand__text">
        <strong>PicGallery</strong>
      </span>
      <button
        class="sidebar__close"
        type="button"
        data-action="close-sidebar"
        aria-label="Cerrar menú de navegación"
        data-tooltip="Cerrar menú"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
      </button>
    </div>

    <details class="sidebar__section" data-section="library" ${j(`library`)}>
      <summary class="sidebar__summary" ${k(`Biblioteca`)}>
        ${A(`grid`,`Biblioteca`,`<span class="sidebar__summary-count mono">${h(n.total)}</span>`)}
      </summary>
      <div class="sidebar__section-body">
        <nav class="sidebar__nav" aria-label="Biblioteca">
          ${mt(t,`all`,`Todas las imágenes`,`grid`,n.total)}
          ${mt(t,`favorites`,`Favoritos`,`star`,n.favorites)}
        </nav>
      </div>
    </details>

    <details class="sidebar__section" data-section="folders" ${j(`folders`)}>
      <summary class="sidebar__summary" ${k(`Carpetas`)}>
        ${A(`folder`,`Carpetas`)}
      </summary>
      <div class="sidebar__section-body">
        <div class="sidebar__section-head">
          <span class="sidebar__sublabel">Organización</span>
          <button
            class="icon-btn icon-btn--dark"
            type="button"
            data-action="new-folder"
            aria-label="Crear carpeta"
            data-tooltip="Crear carpeta"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
          </button>
        </div>
        <div class="sidebar__folders">${o}</div>
        ${vt(t)}
      </div>
    </details>

    <details class="sidebar__section" data-section="filters" ${j(`filters`)}>
      <summary class="sidebar__summary" ${k(`Filtros`)}>
        ${A(`sliders`,`Filtros`,a>0?`<span class="sidebar__summary-count mono">${h(a)}</span>`:``)}
      </summary>
      <div class="sidebar__section-body">
        <div class="sidebar__section-head">
          <span class="sidebar__sublabel">Refinar</span>
          <button
            class="sidebar__reset"
            type="button"
            data-action="clear-filters"
            data-focus-key="sidebar-clear-filters"
            data-tooltip="Quitar todos los filtros activos"
            ${i?``:`disabled`}
          >
            Limpiar
          </button>
        </div>
        <div class="sidebar__filter">
          <span class="sidebar__sublabel">Color</span>
          ${gt(t)}
        </div>
        <div class="sidebar__filter">
          <span class="sidebar__sublabel">Formato</span>
          ${_t(t,n)}
        </div>
      </div>
    </details>

    ${yt(t)}

    <div class="sidebar__foot">
      <button
        class="sidebar__export"
        type="button"
        data-action="open-export"
        data-focus-key="sidebar-export"
        data-tooltip="Exportar la colección"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
        <span>Exportar colección</span>
      </button>

      <p class="sidebar__stamp">
        ${h(n.total)} imágenes · ${m(r)}
      </p>
    </div>
  `,e.querySelectorAll(`[data-section]`).forEach(e=>{e.addEventListener(`toggle`,()=>{ft.add(e.dataset.section),O[e.dataset.section]=e.open})})}function xt(e=b()){let t=C(e),n=e.filters.query.trim()!==``||e.filters.colors.length>0||e.filters.formats.length>0||e.filters.tags.length>0,r=w(e.images),i=w(t);return n?`${h(t.length)} de ${h(e.images.length)} imágenes · ${m(i)}`:`${h(e.images.length)} imágenes · ${m(r)}`}function St(e){let t=b(),n=xt(t),r=t.inspectorOpen||t.inspectorDrawer,i=window.matchMedia(`(max-width: 1024px)`).matches,a=i?t.sidebarOpen:!t.sidebarCollapsed;e.innerHTML=`
    <button
      class="icon-btn topbar__menu"
      type="button"
      data-action="toggle-sidebar"
      aria-label="${i?a?`Cerrar menú de navegación`:`Abrir menú de navegación`:a?`Ocultar menú de navegación`:`Mostrar menú de navegación`}"
      aria-expanded="${a}"
      aria-controls="sidebar"
      data-tooltip="${a?`Ocultar el menú`:`Mostrar el menú`}"
    >
      <svg class="icon" aria-hidden="true"><use href="#icon-menu"></use></svg>
    </button>

    <div class="topbar__heading">
      <p class="eyebrow">${Ae(t.activeFolder)} <span>/ Archivo</span></p>
      <h1 class="topbar__title">${p(S(t.activeFolder))}</h1>
      <p class="topbar__sub">${n}</p>
    </div>

    <div class="topbar__actions">
      <label class="search">
        <svg class="icon" aria-hidden="true"><use href="#icon-search"></use></svg>
        <span class="visually-hidden">Buscar imágenes por título</span>
        <input
          type="search"
          data-search
          data-focus-key="search"
          placeholder="Buscar por título…"
          autocomplete="off"
          value="${p(t.filters.query)}"
        />
      </label>

      <button
        class="btn btn--primary"
        type="button"
        data-action="open-upload"
        data-focus-key="upload"
        data-tooltip="Añadir imágenes a la biblioteca"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
        Añadir imágenes
      </button>

      <button
        class="icon-btn"
        type="button"
        data-action="toggle-inspector"
        aria-label="${r?`Ocultar ficha técnica`:`Mostrar ficha técnica`}"
        aria-expanded="${r}"
        aria-controls="inspector"
        data-focus-key="inspector-toggle"
        data-tooltip="${r?`Ocultar ficha técnica`:`Mostrar ficha técnica`}"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-info"></use></svg>
      </button>
    </div>
  `}function Ct(e){return e.view.layout===`list`?`Lista`:`Cuadrícula ${e.view.columns} × ${e.view.columns}`}function M(e){let t=b(),n=C(t),r=t.filters.colors.length>0||t.filters.formats.length>0||t.filters.tags.length>0||t.filters.query.trim()!==``,i=n.length>0&&n.every(e=>t.selectedIds.includes(e.id)),{layout:a,columns:o,gap:s}=t.view,c=a===`list`;e.innerHTML=`
    <div class="toolbar__group toolbar__group--view">
      <span class="toolbar__label">Vista</span>
      <div class="toolbar__view">
        <div class="segmented segmented--icons" role="group" aria-label="Modo de vista">
          <button
            class="segmented__item${c?``:` is-active`}"
            type="button"
            data-action="view-layout"
            data-layout="grid"
            data-focus-key="layout-grid"
            aria-pressed="${!c}"
            data-tooltip="Ver en cuadrícula"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-grid"></use></svg>
            <span class="visually-hidden">Cuadrícula</span>
          </button>
          <button
            class="segmented__item${c?` is-active`:``}"
            type="button"
            data-action="view-layout"
            data-layout="list"
            data-focus-key="layout-list"
            aria-pressed="${c}"
            data-tooltip="Ver en lista"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-list"></use></svg>
            <span class="visually-hidden">Lista</span>
          </button>
        </div>

        <label class="toolbar__range">
          <span>Columnas</span>
          <input
            id="toolbar-columns"
            type="range"
            min="3"
            max="8"
            step="1"
            value="${o}"
            data-view-columns
            data-focus-key="toolbar-columns"
          />
          <output for="toolbar-columns" data-output="columns">${o} × ${o}</output>
        </label>

        <label class="toolbar__range">
          <span>Separación</span>
          <input
            id="toolbar-gap"
            type="range"
            min="6"
            max="20"
            step="2"
            value="${s}"
            data-view-gap
            data-focus-key="toolbar-gap"
          />
          <output for="toolbar-gap" data-output="gap">${s} px</output>
        </label>
      </div>
    </div>

    <div class="toolbar__group toolbar__group--display">
      <span class="toolbar__label">Datos de las imágenes</span>
      <div class="toolbar__checks">
        <label class="toolbar__check">
          <input
            type="checkbox"
            data-view-meta
            data-focus-key="toolbar-view-meta"
            ${t.view.showMeta?`checked`:``}
          />
          Mostrar nombre y datos
        </label>
      </div>
    </div>

    <div class="toolbar__end">
      <span class="toolbar__count">${h(n.length)} de ${h(t.images.length)}</span>
      <button
        class="text-btn"
        type="button"
        data-action="select-all"
        data-focus-key="select-all"
        data-tooltip="${i?`Deseleccionar todas las imágenes visibles`:`Seleccionar todas las imágenes visibles`}"
        ${n.length===0?`disabled`:``}
      >
        ${i?`Quitar selección`:`Seleccionar todo`}
      </button>
      <button
        class="text-btn"
        type="button"
        data-action="clear-filters"
        data-focus-key="clear-filters"
        data-tooltip="Quitar todos los filtros activos"
        ${r?``:`disabled`}
      >
        Limpiar filtros
      </button>
      <button
        class="text-btn text-btn--danger"
        type="button"
        data-action="delete-all-images"
        data-focus-key="delete-all-images"
        aria-label="Eliminar todas las imágenes de la biblioteca"
        data-tooltip="Eliminar todas las imágenes"
        ${t.images.length===0?`disabled`:``}
      >
        Eliminar todas
      </button>

      <label class="sort toolbar__sort">
        <svg class="icon" aria-hidden="true"><use href="#icon-sort"></use></svg>
        <span class="visually-hidden">Ordenar imágenes</span>
        <select data-sort-select data-focus-key="sort">
          <option value="recent" ${t.sort===`recent`?`selected`:``}>Más recientes</option>
          <option value="name" ${t.sort===`name`?`selected`:``}>Nombre A–Z</option>
          <option value="size" ${t.sort===`size`?`selected`:``}>Peso mayor</option>
          <option value="manual" ${t.sort===`manual`?`selected`:``}>Orden manual</option>
        </select>
      </label>
    </div>
  `}function wt(){let e=b(),{layout:t,columns:n,gap:r}=e.view,i=t===`list`,a=document.querySelector(`[data-toolbar-layout-label]`);a&&(a.textContent=Ct(e));let o=document.querySelector(`[data-toolbar-gap-label]`);o&&(o.textContent=`Separación ${r} px`),document.querySelector(`.toolbar__summary use`)?.setAttribute(`href`,i?`#icon-list`:`#icon-grid`),document.querySelectorAll(`[data-action="view-layout"]`).forEach(e=>{let n=e.dataset.layout===t;e.classList.toggle(`is-active`,n),e.setAttribute(`aria-pressed`,String(n))}),document.querySelectorAll(`[data-view-layout]`).forEach(e=>{e.value!==t&&(e.value=t)}),document.querySelectorAll(`[data-view-columns]`).forEach(e=>{e.value!==String(n)&&(e.value=String(n))}),document.querySelectorAll(`[data-view-gap]`).forEach(e=>{e.value!==String(r)&&(e.value=String(r))}),document.querySelectorAll(`[data-view-meta]`).forEach(t=>{t.checked!==e.view.showMeta&&(t.checked=e.view.showMeta)}),document.querySelectorAll(`[data-output="columns"]`).forEach(e=>{e.textContent=`${n} × ${n}`}),document.querySelectorAll(`[data-output="gap"]`).forEach(e=>{e.textContent=`${r} px`})}function Tt(e){return(Array.isArray(e.palette)&&e.palette.length>0?e.palette:[`#d7d3ca`,`#d7d3ca`,`#d7d3ca`,`#d7d3ca`,`#d7d3ca`,`#d7d3ca`]).map(e=>`<span style="--swatch: ${p(e)}"></span>`).join(``)}function Et(e,t,n){let r=n.selectedIds.includes(e.id),i=n.activeImageId===e.id,a=!!e.favorite,o=p(e.title),s=p(e.format),c=e.format===`RAW`?`RAW · vista previa JPG`:e.format,l=n.view.layout===`list`,u=p(S(e.folderId)),d=(e.tags??[]).map(e=>`<li>${p(e)}</li>`).join(``),f=e.description?`<p class="card__desc">${p(e.description)}</p>`:``,ee=l?`
      <dl class="card__facts">
        <div>
          <dt>Formato</dt>
          <dd>${s}${e.format===`RAW`?` · proxy JPG`:``}</dd>
        </div>
        <div class="card__fact--dimensions">
          <dt>Dimensiones</dt>
          <dd>${e.width} × ${e.height} px</dd>
        </div>
        <div class="card__fact--size">
          <dt>Peso</dt>
          <dd>${m(e.bytes)}</dd>
        </div>
        <div>
          <dt>Carpeta</dt>
          <dd>${u}</dd>
        </div>
        ${d?`
              <div class="card__fact--tags">
                <dt>Etiquetas</dt>
                <dd><ul class="card__tags">${d}</ul></dd>
              </div>
            `:``}
      </dl>
    `:``;return`
    <article
      class="card${l?` card--list`:``}${r?` is-selected`:``}${i?` is-active`:``}"
      data-card-id="${p(e.id)}"
      draggable="true"
      style="--i: ${t}"
    >
      <div class="card__media">
        <button
          class="card__open"
          type="button"
          data-action="open-image"
          data-id="${p(e.id)}"
          data-focus-key="open-${p(e.id)}"
          aria-label="Abrir ${o} en el visor"
          data-tooltip="Abrir en grande"
          draggable="true"
        >
          <img
            class="card__img"
            src="${p(e.src)}"
            alt="${o}"
            loading="lazy"
            decoding="async"
          />
          <span class="card__zoom" aria-hidden="true">
            <svg class="icon"><use href="#icon-arrow-up-right"></use></svg>
          </span>
        </button>

        <div class="card__palette" aria-hidden="true">${Tt(e)}</div>

        <label class="card__select">
          <input
            type="checkbox"
            data-select="${p(e.id)}"
            data-focus-key="select-${p(e.id)}"
            ${r?`checked`:``}
            aria-label="Seleccionar ${o}"
          />
          <span class="card__check">
            <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
          </span>
        </label>

        <button
          class="card__fav${a?` is-fav`:``}"
          type="button"
          data-action="favorite"
          data-id="${p(e.id)}"
          data-focus-key="fav-${p(e.id)}"
          aria-pressed="${a}"
          aria-label="${a?`Quitar ${o} de favoritos`:`Añadir ${o} a favoritos`}"
          data-tooltip="${a?`Quitar de favoritos`:`Añadir a favoritos`}"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
        </button>

        <button
          class="card__rename"
          type="button"
          data-action="rename-image"
          data-id="${p(e.id)}"
          data-focus-key="rename-${p(e.id)}"
          aria-label="Cambiar el nombre de ${o}"
          data-tooltip="Cambiar nombre"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-pencil"></use></svg>
        </button>

        <button
          class="card__delete"
          type="button"
          data-action="delete-image"
          data-id="${p(e.id)}"
          data-focus-key="delete-${p(e.id)}"
          aria-label="Eliminar ${o}"
          data-tooltip="Eliminar imagen"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
        </button>

        <span class="format-badge" data-format="${s}" title="${c}">
          ${s}
        </span>
      </div>

      <div class="card__meta">
        <div class="card__heading">
          <h3 class="card__title" title="${o}">${o}</h3>
          <span class="card__spec">
            <span class="card__spec-dims">${e.width}×${e.height}</span>
            <span class="card__spec-sep" aria-hidden="true"> · </span>
            <span class="card__spec-size">${m(e.bytes)}</span>
          </span>
        </div>
        ${f}
        ${ee}
      </div>
    </article>
  `}function Dt(e,t){return e.images.length===0?`
      <div class="gallery-empty">
        <span class="gallery-empty__icon" aria-hidden="true">
          <svg class="icon"><use href="#icon-image"></use></svg>
        </span>
        <h2>Tu biblioteca está vacía</h2>
        <p>Añade tu primera imagen para empezar a organizar la colección.</p>
        <button
          class="btn btn--primary"
          type="button"
          data-action="open-upload"
          data-tooltip="Elegir imágenes del equipo"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
          Añadir imágenes
        </button>
      </div>
    `:t?`
      <div class="gallery-empty">
        <span class="gallery-empty__icon" aria-hidden="true">
          <svg class="icon"><use href="#icon-search"></use></svg>
        </span>
        <h2>Nada por aquí</h2>
        <p>No hay imágenes que coincidan con los filtros activos. Prueba con otro color, formato, etiqueta o búsqueda.</p>
        <button
          class="btn btn--ghost"
          type="button"
          data-action="clear-filters"
          data-tooltip="Quitar todos los filtros activos"
        >
          Limpiar filtros
        </button>
      </div>
    `:`
    <div class="gallery-empty">
      <span class="gallery-empty__icon" aria-hidden="true">
        <svg class="icon"><use href="#icon-folder"></use></svg>
      </span>
      <h2>Esta carpeta está vacía</h2>
      <p>Mueve imágenes desde otra carpeta o añade nuevas piezas a la colección.</p>
      <button
        class="btn btn--primary"
        type="button"
        data-action="open-upload"
        data-tooltip="Elegir imágenes del equipo"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
        Añadir imágenes
      </button>
    </div>
  `}function N(e,t={}){let n=b(),r=C(n),i=n.filters.query.trim()!==``||n.filters.colors.length>0||n.filters.formats.length>0||n.filters.tags.length>0;if(r.length===0){e.innerHTML=`
      <section class="gallery-wrap" aria-label="Imágenes de la colección">
        ${Dt(n,i)}
      </section>
    `;return}let a=r.map((e,t)=>Et(e,t,n)).join(``),{layout:o,columns:s,gap:c,showMeta:l}=n.view;e.innerHTML=`
    <section class="gallery-wrap" aria-label="Imágenes de la colección">
      <h2 class="visually-hidden">Imágenes de la colección</h2>
      <div
        class="gallery${o===`list`?` is-list`:``}${l?``:` is-meta-hidden`}${t.animate?` is-entering`:``}"
        id="gallery"
        style="--cols: ${s}; --gap: ${c}px"
      >
        ${a}
      </div>
    </section>
  `,t.animate&&window.setTimeout(()=>{document.getElementById(`gallery`)?.classList.remove(`is-entering`)},1100)}function Ot(){let e=b(),t=document.getElementById(`gallery`);if(!t)return;let{layout:n,columns:r,gap:i,showMeta:a}=e.view;t.style.setProperty(`--cols`,String(r)),t.style.setProperty(`--gap`,`${i}px`),t.classList.toggle(`is-list`,n===`list`),t.classList.toggle(`is-meta-hidden`,!a)}function kt(){let e=b();document.querySelectorAll(`[data-card-id]`).forEach(t=>{let n=e.selectedIds.includes(t.dataset.cardId),r=t.querySelector(`input[data-select]`);t.classList.toggle(`is-selected`,n),r&&(r.checked=n)})}function At(){let e=b();document.querySelectorAll(`[data-card-id]`).forEach(t=>{t.classList.toggle(`is-active`,t.dataset.cardId===e.activeImageId)})}function jt(){let e=b();document.querySelectorAll(`[data-card-id]`).forEach(t=>{let n=e.images.find(e=>e.id===t.dataset.cardId),r=t.querySelector(`.card__palette`);n?.palette&&r&&(r.innerHTML=n.palette.map(e=>`<span style="--swatch: ${p(e)}"></span>`).join(``))})}var Mt=!0;function Nt(e){return!Array.isArray(e.palette)||e.palette.length===0?`<p class="palette__empty">Extrayendo la paleta de la imagen…</p>`:`
    <div class="palette__grid">
      ${e.palette.map((t,n)=>`
            <button
              class="swatch"
              type="button"
              data-action="copy-hex"
              data-hex="${p(t)}"
              data-focus-key="swatch-${p(e.id)}-${n}"
              aria-label="Copiar el color ${p(t)}"
              data-tooltip="Copiar ${p(t)}"
            >
              <span class="swatch__color" style="--hex: ${p(t)}"></span>
              <span class="swatch__hex">${p(t)}</span>
            </button>
          `).join(``)}
    </div>
  `}function P(e){let t=e.querySelector(`.inspector__data`);t&&(Mt=t.open);let n=Pe(b());if(!n){e.innerHTML=`
      <div class="inspector__head">
        <span class="inspector__label">Ficha técnica</span>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-inspector"
          aria-label="Cerrar ficha técnica"
          data-tooltip="Cerrar ficha técnica"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </div>
      <div class="inspector__empty">
        <svg class="icon" aria-hidden="true"><use href="#icon-image"></use></svg>
        <strong>Selecciona una imagen</strong>
        <p>Haz clic en una tarjeta para ver sus datos técnicos y su paleta de color.</p>
      </div>
    `;return}let r=x(n.folderId),i=S(n.folderId),a=r?.color??`#8c8a85`,o=n.format===`RAW`?`Vista previa JPG`:``,s=!!n.favorite,c=p(n.title);e.innerHTML=`
    <div class="inspector__head">
      <span class="inspector__label">Ficha técnica</span>
      <button
        class="icon-btn icon-btn--bare"
        type="button"
        data-action="close-inspector"
        aria-label="Cerrar ficha técnica"
        data-tooltip="Cerrar ficha técnica"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
      </button>
    </div>

    <div class="inspector__preview">
      <div class="inspector__spine" aria-hidden="true">${(n.palette??[`#d7d3ca`]).map(e=>`<span style="--swatch: ${p(e)}"></span>`).join(``)}</div>
      <button
        class="inspector__open"
        type="button"
        data-action="open-image"
        data-id="${p(n.id)}"
        aria-label="Abrir ${c} en el visor"
        data-tooltip="Abrir en el visor"
      >
        <img src="${p(n.src)}" alt="${c}" />
      </button>
      <span class="format-badge" data-format="${p(n.format)}">
        ${p(n.format)}
      </span>
      <button
        class="inspector__fav${s?` is-fav`:``}"
        type="button"
        data-action="favorite"
        data-id="${p(n.id)}"
        data-focus-key="inspector-fav"
        aria-pressed="${s}"
        aria-label="${s?`Quitar ${c} de favoritos`:`Añadir ${c} a favoritos`}"
        data-tooltip="${s?`Quitar de favoritos`:`Añadir a favoritos`}"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
      </button>
    </div>

    <h2 class="inspector__title">${c}</h2>
    <p class="inspector__folder">
      <i style="--dot: ${p(a)}" aria-hidden="true"></i>
      ${p(i)}
    </p>
    ${n.tags?.length?`<ul class="tag-chips" aria-label="Etiquetas de la imagen">
            ${n.tags.map(e=>`<li>${p(e)}</li>`).join(``)}
          </ul>`:``}

    <div class="inspector__actions">
      <button
        class="btn btn--dark btn--sm"
        type="button"
        data-action="open-image"
        data-id="${p(n.id)}"
        data-tooltip="Ver la imagen a pantalla completa"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-arrow-up-right"></use></svg>
        Ver en grande
      </button>
      <button
        class="btn btn--ghost btn--sm"
        type="button"
        data-action="open-move"
        data-id="${p(n.id)}"
        data-tooltip="Mover la imagen a otra carpeta"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-move"></use></svg>
        Mover
      </button>
      <button
        class="icon-btn icon-btn--bare"
        type="button"
        data-action="rename-image"
        data-id="${p(n.id)}"
        aria-label="Cambiar el nombre de ${c}"
        data-tooltip="Cambiar nombre"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-pencil"></use></svg>
      </button>
      <button
        class="icon-btn icon-btn--bare"
        type="button"
        data-action="download"
        data-id="${p(n.id)}"
        aria-label="Descargar ${c}"
        data-tooltip="Descargar"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
      </button>
      <button
        class="icon-btn icon-btn--bare icon-btn--danger"
        type="button"
        data-action="delete-image"
        data-id="${p(n.id)}"
        aria-label="Eliminar ${c}"
        data-tooltip="Eliminar imagen"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
      </button>
    </div>

    <details class="inspector__data" ${Mt?`open`:``}>
      <summary class="inspector__summary">
        <span>Datos técnicos</span>
        <svg class="icon inspector__chevron" aria-hidden="true">
          <use href="#icon-chevron-right"></use>
        </svg>
      </summary>
      <dl class="meta-list">
        <div class="meta-row">
          <dt>Dimensiones</dt>
          <dd>${n.width} × ${n.height} px</dd>
        </div>
        <div class="meta-row">
          <dt>Peso</dt>
          <dd>${m(n.bytes)}</dd>
        </div>
        <div class="meta-row">
          <dt>Formato</dt>
          <dd>${p(n.format)}${o?`<small>${o}</small>`:``}</dd>
        </div>
        <div class="meta-row">
          <dt>Carpeta</dt>
          <dd>${p(i)}</dd>
        </div>
        <div class="meta-row">
          <dt>Añadida</dt>
          <dd>${te(n.createdAt)}</dd>
        </div>
      </dl>
    </details>

    <section class="palette" aria-labelledby="palette-title">
      <div class="palette__head">
        <h3 class="palette__title" id="palette-title">Paleta extraída · HEX</h3>
        ${n.palette?`<button class="text-btn" type="button" data-action="copy-palette" data-id="${p(n.id)}" data-tooltip="Copiar todos los colores de la paleta">Copiar paleta</button>`:``}
      </div>
      ${Nt(n)}
      <p class="palette__hint">Haz clic en un color para copiar su código HEX.</p>
    </section>
  `}function F(e){let t=Fe(b());if(t.length===0){e.innerHTML=``;return}let n=t.every(e=>e.favorite);e.innerHTML=`
    <section class="bulk" aria-label="Acciones de selección">
      <span class="bulk__count">${`${h(t.length)} ${t.length===1?`seleccionada`:`seleccionadas`}`} · ${m(w(t))}</span>
      <span class="bulk__divider" aria-hidden="true"></span>
      <button class="bulk__btn bulk__btn--primary" type="button" data-action="bulk-move" data-focus-key="bulk-move" data-tooltip="Mover la selección a otra carpeta">
        <svg class="icon" aria-hidden="true"><use href="#icon-move"></use></svg>
        Mover a…
      </button>
      <button class="bulk__btn" type="button" data-action="bulk-favorite" data-focus-key="bulk-favorite" data-tooltip="${n?`Quitar la selección de favoritos`:`Añadir la selección a favoritos`}">
        <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
        ${n?`Quitar favorito`:`Favorito`}
      </button>
      <button class="bulk__btn bulk__btn--danger" type="button" data-action="bulk-delete" data-focus-key="bulk-delete" data-tooltip="Eliminar las imágenes seleccionadas">
        <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
        Eliminar
      </button>
      <button class="bulk__btn" type="button" data-action="bulk-clear" data-focus-key="bulk-clear" data-tooltip="Vaciar la selección">
        <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        Quitar selección
      </button>
    </section>
  `}var Pt=null;function Ft(){return Pt||=document.getElementById(`toast-region`),Pt}function I(e,t={}){let{type:n=`info`,icon:r=`check`}=t,i=Ft();if(!i)return;let a=document.createElement(`div`);a.className=`toast toast--${n}`,a.innerHTML=`
    <svg class="icon" aria-hidden="true"><use href="#icon-${r}"></use></svg>
    <span>${p(e)}</span>
  `,i.append(a),window.setTimeout(()=>{a.classList.add(`is-leaving`),window.setTimeout(()=>a.remove(),220)},2800)}var L=[];function It(){document.querySelectorAll(`.is-drop-target`).forEach(e=>{e.classList.remove(`is-drop-target`)}),document.querySelectorAll(`.drop-before, .drop-after`).forEach(e=>{e.classList.remove(`drop-before`,`drop-after`),delete e.dataset.dropPosition})}function Lt(){It(),document.querySelectorAll(`.is-dragging`).forEach(e=>{e.classList.remove(`is-dragging`)}),document.body.classList.remove(`is-dragging-cards`),L=[]}function Rt(){document.addEventListener(`dragstart`,e=>{let t=e.target.closest(`[data-card-id]`);if(!t)return;let n=b(),r=t.dataset.cardId;L=n.selectedIds.includes(r)&&n.selectedIds.length>1?[...n.selectedIds]:[r],e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(`application/x-picgallery`,JSON.stringify(L)),e.dataTransfer.setData(`text/plain`,L.join(`,`)),t.classList.add(`is-dragging`),document.body.classList.add(`is-dragging-cards`)}),document.addEventListener(`dragend`,Lt),document.addEventListener(`dragover`,e=>{if(L.length===0)return;let t=e.target.closest(`[data-drop-folder]`);if(t){e.preventDefault(),e.dataTransfer.dropEffect=`move`,It(),t.classList.add(`is-drop-target`);return}let n=e.target.closest(`[data-card-id]`);if(!n||L.includes(n.dataset.cardId))return;e.preventDefault(),e.dataTransfer.dropEffect=`move`,It();let r=n.getBoundingClientRect(),i=n.classList.contains(`card--list`)?e.clientY<r.top+r.height/2?`before`:`after`:e.clientX<r.left+r.width/2?`before`:`after`;n.classList.add(i===`before`?`drop-before`:`drop-after`),n.dataset.dropPosition=i}),document.addEventListener(`dragleave`,e=>{let t=e.target.closest(`[data-drop-folder]`);t&&t.classList.remove(`is-drop-target`)}),document.addEventListener(`drop`,e=>{if(L.length===0)return;let t=e.target.closest(`[data-drop-folder]`);if(t){e.preventDefault();let n=t.dataset.dropFolder,r=x(n)?.name??`la carpeta`,i=L.length;Ye(L,n),I(i===1?`Imagen movida a ${r}`:`${i} imágenes movidas a ${r}`),Lt();return}let n=e.target.closest(`[data-card-id]`);n?.dataset.dropPosition&&(e.preventDefault(),nt(L,n.dataset.cardId,n.dataset.dropPosition),Lt())})}var zt=new Set([`dng`,`cr2`,`cr3`,`crw`,`nef`,`nrw`,`arw`,`srf`,`sr2`,`raf`,`orf`,`rw2`,`pef`,`srw`,`3fr`,`fff`,`iiq`,`mos`]);function Bt(e){let t=e.name.split(`.`).pop()?.toLowerCase()||``;return zt.has(t)?`RAW`:t===`png`||e.type===`image/png`?`PNG`:t===`webp`||e.type===`image/webp`?`WEBP`:[`jpg`,`jpeg`].includes(t)||e.type===`image/jpeg`?`JPG`:null}async function Vt(e){let t=Bt(e);if(!t)throw Error(`${e.name}: formato no compatible.`);if(t===`RAW`)throw Error(`${e.name}: los RAW necesitan un proxy JPG para verse en el navegador.`);let n=await createImageBitmap(e);try{return{width:n.width,height:n.height,format:t,bytes:e.size,palette:Se(n)}}finally{n.close?.()}}var Ht=26214400,R=null,z=null,Ut=!1,B=0;function Wt(){return R||=document.getElementById(`upload-dialog`),R}function Gt(){let e=b();return e.folders.some(t=>t.id===e.activeFolder)?e.activeFolder:`inbox`}function Kt(){return R?.querySelector(`#upload-folder`)?.value||Gt()}function qt(){let e=b(),t=Gt(),n=e.folders.map(e=>`
        <option value="${p(e.id)}" ${e.id===t?`selected`:``}>
          ${p(e.name)}
        </option>
      `).join(``);R.innerHTML=`
    <form class="dialog__form" id="upload-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Añadir</p>
          <h2 class="dialog__title" id="upload-title">Añadir imágenes</h2>
          <p class="dialog__sub">Se guardan en este navegador, listas para organizar.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="upload-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <label
          class="dropzone"
          id="upload-dropzone"
          for="upload-file-input"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-image"></use></svg>
          <strong>Arrastra imágenes aquí</strong>
          <span>o haz clic para elegirlas desde tu equipo</span>
          <input
            type="file"
            id="upload-file-input"
            accept="image/jpeg,image/png,image/webp"
            multiple
            hidden
          />
        </label>

        <label class="field" style="margin-top: 1.25rem">
          <span>Carpeta de destino</span>
          <select id="upload-folder">${n}</select>
        </label>

        <p class="hint">
          Formatos admitidos: JPG, PNG y WEBP · máximo 25 MB por archivo.
          Los RAW se muestran en el catálogo como proxy JPG, pero no se pueden subir.
        </p>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="upload-dialog"
          data-tooltip="Cerrar sin añadir imágenes"
        >
          Cerrar
        </button>
        <button
          class="btn btn--primary"
          type="button"
          data-action="pick-files"
          data-tooltip="Explorar imágenes en el equipo"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
          Elegir imágenes
        </button>
      </footer>
    </form>
  `,z=R.querySelector(`#upload-file-input`);let r=R.querySelector(`#upload-dropzone`);r.addEventListener(`dragover`,e=>{e.preventDefault(),e.stopPropagation(),r.classList.add(`is-dragover`)}),r.addEventListener(`dragleave`,()=>{r.classList.remove(`is-dragover`)}),r.addEventListener(`drop`,e=>{e.preventDefault(),e.stopPropagation(),r.classList.remove(`is-dragover`),B=0;let t=document.getElementById(`drop-overlay`);t&&(t.hidden=!0);let n=[...e.dataTransfer.files];n.length>0&&Jt(n,Kt())}),z.addEventListener(`change`,()=>{let e=[...z.files];e.length>0&&Jt(e,Kt()),z.value=``})}async function Jt(e,t){if(Ut)return;Ut=!0;let n=[],r=[];for(let i of e){if(i.size>Ht){r.push(`${i.name}: supera el límite de 25 MB.`);continue}let e=Bt(i);if(!e)r.push(`${i.name}: formato no compatible.`);else if(e===`RAW`)r.push(`${i.name}: los RAW necesitan un proxy JPG.`);else try{let e=await Vt(i),r=ie(),a=URL.createObjectURL(i),s={id:r,title:se(i.name),description:``,src:a,format:e.format,width:e.width,height:e.height,bytes:i.size,folderId:t,favorite:!1,createdAt:new Date().toISOString(),origin:`upload`,palette:e.palette},{src:c,...l}=s;await o({id:r,blob:i,meta:l}).catch(()=>null),n.push(s)}catch(e){r.push(e.message||`${i.name}: no se pudo procesar.`)}}if(Ut=!1,n.length>0){at(n),Ve(),Ie(t),He(`recent`);let e=Wt();e.open&&e.close(),I(n.length===1?`Imagen añadida`:`${n.length} imágenes añadidas`)}r.length>0&&I(r[0],{type:`error`,icon:`info`})}function Yt(){R=document.getElementById(`upload-dialog`);let e=document.getElementById(`drop-overlay`);window.addEventListener(`dragenter`,t=>{t.dataTransfer?.types.includes(`Files`)&&(t.preventDefault(),B+=1,e&&(e.hidden=!1))}),window.addEventListener(`dragover`,e=>{e.dataTransfer?.types.includes(`Files`)&&e.preventDefault()}),window.addEventListener(`dragleave`,t=>{t.dataTransfer?.types.includes(`Files`)&&(B=Math.max(0,B-1),B===0&&e&&(e.hidden=!0))}),window.addEventListener(`drop`,t=>{if(!t.dataTransfer?.files?.length)return;t.preventDefault(),B=0,e&&(e.hidden=!0);let n=[...t.dataTransfer.files];n.length>0&&Jt(n,Gt())})}function Xt(){qt();let e=Wt();e.open||e.showModal()}function Zt(){z?.click()}var V=[],Qt=null;function $t(){return Qt||=document.getElementById(`move-dialog`),Qt}function en(){let e=b(),t=$t(),n=e.images.find(e=>e.id===V[0])?.folderId??e.folders[0]?.id,r=V.length,i=e.folders.map(t=>{let n=e.images.filter(e=>e.folderId===t.id).length;return`
        <label class="folder-choice__item" style="--dot: ${p(t.color)}">
          <input
            type="radio"
            name="target-folder"
            value="${p(t.id)}"
          />
          <span>${p(t.name)}</span>
          <span class="mono">${h(n)}</span>
          <i aria-hidden="true"></i>
        </label>
      `}).join(``);t.innerHTML=`
    <form class="dialog__form" id="move-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Organizar</p>
          <h2 class="dialog__title" id="move-title">
            Mover ${r===1?`1 imagen`:`${r} imágenes`}
          </h2>
          <p class="dialog__sub">Elige la carpeta de destino para la selección.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="move-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <fieldset class="field" style="border: 0; padding: 0; margin: 0">
          <legend class="visually-hidden">Carpeta de destino</legend>
          <div class="folder-choice">${i}</div>
        </fieldset>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="move-dialog"
          data-tooltip="Cancelar el movimiento"
        >
          Cancelar
        </button>
        <button
          class="btn btn--primary"
          type="submit"
          data-tooltip="Mover las imágenes seleccionadas"
        >
          Mover aquí
        </button>
      </footer>
    </form>
  `;let a=t.querySelector(`input[name="target-folder"][value="${CSS.escape(n)}"]`);a&&(a.checked=!0),t.querySelector(`#move-form`)?.addEventListener(`submit`,n=>{n.preventDefault();let r=t.querySelector(`input[name="target-folder"]:checked`);if(!r)return;let i=e.folders.find(e=>e.id===r.value),a=V.length;Ye(V,r.value),t.close(),I(a===1?`Imagen movida a ${i?.name??`la carpeta`}`:`${a} imágenes movidas a ${i?.name??`la carpeta`}`)})}function tn(e){if(V=[...new Set(e)],V.length===0)return;en();let t=$t();t.open||t.showModal()}var nn=null,H=null;function rn(){return nn||=document.getElementById(`rename-dialog`),nn}function an(){return H?.type===`folder`?{eyebrow:`Organizar`,title:`Renombrar carpeta`,sub:`Actualiza el nombre con el que se muestra la carpeta en la biblioteca.`,field:`Nombre de la carpeta`,hint:`El nuevo nombre se usará también en la ficha técnica de sus imágenes.`}:{eyebrow:`Editar`,title:`Cambiar nombre`,sub:`Actualiza el nombre con el que se muestra la imagen en la biblioteca.`,field:`Nombre de la imagen`,hint:`El nuevo nombre se usará también en la ficha técnica y en las presentaciones exportadas.`}}function on(){let e=b();return H?.type===`folder`?e.folders.find(e=>e.id===H.id)?.name??``:e.images.find(e=>e.id===H.id)?.title??``}function sn(){let e=b();return H?H.type===`folder`?e.folders.some(e=>e.id===H.id):e.images.some(e=>e.id===H.id):!1}function cn(){if(!sn())return;let e=an(),t=rn();t.innerHTML=`
    <form class="dialog__form" id="rename-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">${e.eyebrow}</p>
          <h2 class="dialog__title" id="rename-title">${e.title}</h2>
          <p class="dialog__sub">${e.sub}</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="rename-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <label class="field">
          <span>${e.field}</span>
          <input
            type="text"
            data-rename-input
            value="${p(on())}"
            maxlength="120"
            autocomplete="off"
            required
          />
        </label>
        <p class="hint">${e.hint}</p>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="rename-dialog"
          data-tooltip="Descartar el cambio"
        >
          Cancelar
        </button>
        <button
          class="btn btn--primary"
          type="submit"
          data-tooltip="Guardar el nuevo nombre"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
          Guardar nombre
        </button>
      </footer>
    </form>
  `;let n=t.querySelector(`#rename-form`),r=t.querySelector(`[data-rename-input]`);r&&(r.focus(),r.select()),n?.addEventListener(`submit`,e=>{e.preventDefault();let n=r?.value.trim()??``;n?(H.type===`folder`?I(et(H.id,n)?`Carpeta “${n}” renombrada`:`No se pudo renombrar la carpeta`):(Qe(H.id,n),I(`Nombre actualizado`)),t.close()):r?.focus()})}function ln(e){if(!b().images.some(t=>t.id===e))return;H={type:`image`,id:e},cn();let t=rn();t.open||t.showModal()}function un(e){if(!b().folders.some(t=>t.id===e))return;H={type:`folder`,id:e},cn();let t=rn();t.open||t.showModal()}var dn=null,U=[],W=0,G=null;function K(){return dn||=document.getElementById(`lightbox`),dn}function fn(){return b().images.find(e=>e.id===U[W])??null}function pn(e){return U.map((t,n)=>{let r=e.images.find(e=>e.id===t);return r?`
        <button
          class="lightbox__thumb${n===W?` is-active`:``}"
          type="button"
          data-action="lightbox-go"
          data-index="${n}"
          aria-label="Ver ${p(r.title)}"
          data-tooltip="${p(r.title)}"
          ${n===W?`aria-current="true"`:``}
        >
          <img src="${p(r.src)}" alt="" loading="lazy" />
        </button>
      `:``}).join(``)}function mn(e){let t=K();t.innerHTML=`
    <div class="lightbox__inner">
      <header class="lightbox__top">
        <div class="lightbox__heading">
          <span class="lightbox__counter mono" id="lightbox-counter" aria-live="polite"></span>
          <h2 class="lightbox__title" id="lightbox-title"></h2>
        </div>
        <div class="lightbox__tools">
          <button
            class="lightbox__tool"
            id="lightbox-fav"
            type="button"
            data-action="lightbox-favorite"
            aria-label="Añadir a favoritos"
            data-tooltip="Añadir a favoritos"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-heart"></use></svg>
          </button>
          <button
            class="lightbox__tool"
            id="lightbox-rename"
            type="button"
            data-action="rename-image"
            aria-label="Cambiar nombre"
            data-tooltip="Cambiar nombre"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-pencil"></use></svg>
          </button>
          <button
            class="lightbox__tool"
            id="lightbox-download"
            type="button"
            data-action="download"
            aria-label="Descargar imagen"
            data-tooltip="Descargar imagen"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
          </button>
          <button
            class="lightbox__tool lightbox__tool--danger"
            id="lightbox-delete"
            type="button"
            data-action="delete-image"
            aria-label="Eliminar imagen"
            data-tooltip="Eliminar imagen"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
          </button>
          <button
            class="lightbox__tool"
            type="button"
            data-action="lightbox-close"
            aria-label="Cerrar visor"
            data-tooltip="Cerrar visor"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>
      </header>

      <div class="lightbox__stage" id="lightbox-stage">
        <img class="lightbox__img is-loading" id="lightbox-image" alt="" />
        <button
          class="lightbox__nav lightbox__nav--prev"
          type="button"
          data-action="lightbox-prev"
          aria-label="Imagen anterior"
          data-tooltip="Imagen anterior"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-chevron-left"></use></svg>
        </button>
        <button
          class="lightbox__nav lightbox__nav--next"
          type="button"
          data-action="lightbox-next"
          aria-label="Imagen siguiente"
          data-tooltip="Imagen siguiente"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
        </button>
      </div>

      <div class="lightbox__foot">
        <div class="lightbox__meta" id="lightbox-meta"></div>
        <div class="lightbox__palette" id="lightbox-palette"></div>
      </div>

      <div class="lightbox__filmstrip" id="lightbox-filmstrip" role="group" aria-label="Miniaturas de la colección">
        ${pn(e)}
      </div>
    </div>
  `,t.onclick=e=>{e.target===t&&t.close()},t.onkeydown=e=>{e.key===`ArrowLeft`?(e.preventDefault(),q(-1)):e.key===`ArrowRight`&&(e.preventDefault(),q(1))};let n=t.querySelector(`#lightbox-stage`);n.addEventListener(`pointerdown`,e=>{e.target.closest(`button`)||(G=e.clientX)}),n.addEventListener(`pointerup`,e=>{if(G===null)return;let t=e.clientX-G;G=null,Math.abs(t)<50||q(t>0?-1:1)}),n.addEventListener(`pointercancel`,()=>{G=null})}function hn(){let e=K(),t=b(),n=fn();if(!n)return;let r=e.querySelector(`#lightbox-image`),i=e.querySelector(`#lightbox-counter`),a=e.querySelector(`#lightbox-title`),o=e.querySelector(`#lightbox-meta`),s=e.querySelector(`#lightbox-palette`),c=e.querySelector(`#lightbox-fav`),l=e.querySelector(`#lightbox-download`),u=e.querySelector(`#lightbox-rename`),d=e.querySelector(`#lightbox-delete`),f=e.querySelector(`#lightbox-filmstrip`);i.textContent=ne(W,U.length),a.textContent=n.title,r.getAttribute(`src`)===n.src?r.classList.remove(`is-loading`):(r.classList.add(`is-loading`),r.src=n.src),r.onload=()=>r.classList.remove(`is-loading`),r.onerror=()=>r.classList.remove(`is-loading`),r.alt=n.title,o.innerHTML=`
    <span>${n.width} × ${n.height} px</span>
    <span>${m(n.bytes)}</span>
    <span>${p(n.format)}${n.format===`RAW`?` · proxy JPG`:``}</span>
    <span>${p(S(n.folderId))}</span>
  `,s.innerHTML=(n.palette??[]).map(e=>`
        <button
          class="lightbox__swatch"
          type="button"
          data-action="copy-hex"
          data-hex="${p(e)}"
          style="--hex: ${p(e)}"
          aria-label="Copiar el color ${p(e)}"
          data-tooltip="Copiar ${p(e)}"
        ></button>
      `).join(``),c.classList.toggle(`is-fav`,!!n.favorite),c.setAttribute(`aria-pressed`,String(!!n.favorite)),c.setAttribute(`aria-label`,n.favorite?`Quitar de favoritos`:`Añadir a favoritos`),c.setAttribute(`data-tooltip`,n.favorite?`Quitar de favoritos`:`Añadir a favoritos`),l.dataset.id=n.id,l.setAttribute(`aria-label`,`Descargar ${n.title}`),u&&(u.dataset.id=n.id,u.setAttribute(`aria-label`,`Cambiar el nombre de ${n.title}`)),d&&(d.dataset.id=n.id,d.setAttribute(`aria-label`,`Eliminar ${n.title}`)),f&&(f.querySelectorAll(`[data-action="lightbox-go"]`).forEach(e=>{let t=Number(e.dataset.index)===W;e.classList.toggle(`is-active`,t),t?e.setAttribute(`aria-current`,`true`):e.removeAttribute(`aria-current`)}),f.querySelector(`.lightbox__thumb.is-active`)?.scrollIntoView({block:`nearest`,inline:`center`})),t.images.findIndex(e=>e.id===n.id);let ee=[U[(W+1)%U.length],U[(W-1+U.length)%U.length]];for(let e of ee){let n=t.images.find(t=>t.id===e);if(n){let e=new Image;e.src=n.src}}}function q(e){if(U.length===0)return;W=(W+e+U.length)%U.length;let t=U[W];hn(),Ue(t)}function gn(e){if(e<0||e>=U.length)return;W=e;let t=U[W];hn(),Ue(t)}function _n(e){let t=b(),n=C(t),r=n.length>0?n:t.images,i=r.findIndex(t=>t.id===e);if(i===-1&&(r=t.images,i=r.findIndex(t=>t.id===e)),i===-1)return;U=r.map(e=>e.id),W=i;let a=K();mn(t),a.open||a.showModal(),hn(),Ue(e),a.querySelector(`[data-action="lightbox-close"]`)?.focus()}function vn(){let e=K();e?.open&&e.close()}function yn(){return!!K()?.open}function bn(){if(!yn())return;let e=K(),t=fn();if(!e||!t)return;let n=e.querySelector(`#lightbox-title`);n&&(n.textContent=t.title);let r=e.querySelector(`#lightbox-image`);r&&(r.alt=t.title);let i=e.querySelector(`#lightbox-fav`);i?.classList.toggle(`is-fav`,!!t.favorite),i?.setAttribute(`aria-pressed`,String(!!t.favorite)),e.querySelector(`#lightbox-download`)?.setAttribute(`aria-label`,`Descargar ${t.title}`),e.querySelector(`#lightbox-rename`)?.setAttribute(`aria-label`,`Cambiar el nombre de ${t.title}`),e.querySelector(`#lightbox-delete`)?.setAttribute(`aria-label`,`Eliminar ${t.title}`);let a=e.querySelector(`#lightbox-palette`);a&&(a.innerHTML=(t.palette??[]).map(e=>`
          <button
            class="lightbox__swatch"
            type="button"
            data-action="copy-hex"
            data-hex="${p(e)}"
            style="--hex: ${p(e)}"
            aria-label="Copiar el color ${p(e)}"
            data-tooltip="Copiar ${p(e)}"
          ></button>
        `).join(``))}function xn(){let e=fn();if(!e)return;let t=qe(e.id);bn(),I(t?`Añadida a favoritos`:`Quitada de favoritos`)}function Sn(e){q(e)}function Cn(e){gn(e)}var J=null,Y={title:``,client:``,date:``,notes:``,columns:3,scope:`collection`,palette:!0,name:!0,meta:!0};function X(){return J||=document.getElementById(`export-dialog`),J}function wn(){let e=b();return e.activeFolder===`all`?`Colección completa`:S(e.activeFolder)}function Tn(){return new Date().toISOString().slice(0,10)}function En(e,t){let n=[];for(let r=0;r<e.length;r+=t)n.push(e.slice(r,r+t));return n}function Dn(e){return Number(e)===2?4:Number(e)===4?12:9}function On(e){let t=[];for(let n of e)for(let e of n.palette??[])if(t.includes(e)||t.push(e),t.length>=12)return t;return t}function kn(e,t){let n=Number(t.columns)||3,r=En(e,Dn(n)),i=w(e),a=t.palette?On(e):[];return`<div class="sheet">${`
    <article class="sheet__cover">
      <div class="sheet__brand"><i></i> PicGallery · Archivo visual</div>
      <div class="sheet__cover-rule"></div>
      <h1>${p(t.title||`Colección PicGallery`)}</h1>
      ${t.client?`<p class="sheet__cover-client">Para ${p(t.client)}</p>`:``}
      <div class="sheet__cover-meta">
        <span>${te(new Date(`${t.date||Tn()}T12:00:00`))}</span>
        <span>${h(e.length)} imágenes</span>
        <span>${m(i)}</span>
      </div>
      ${t.notes?`<p class="sheet__cover-notes">${p(t.notes)}</p>`:``}
      ${a.length>0?`<div class="sheet__cover-palette">${a.map(e=>`<span class="sheet__cover-swatch" style="--hex: ${p(e)}"></span>`).join(``)}</div>`:``}
      <div class="sheet__cover-footer">
        <span>PicGallery</span>
        <span>Presentación</span>
      </div>
    </article>
  `}${r.map((e,i)=>`
        <section class="sheet__page">
          <header class="sheet__page-head">
            <span class="sheet__page-title">${p(t.title||`Colección PicGallery`)}</span>
            <span class="sheet__page-num">${String(i+1).padStart(2,`0`)} / ${String(r.length).padStart(2,`0`)}</span>
          </header>
          <div class="sheet__grid" style="--cols: ${n}">
            ${e.map(e=>`
                  <figure class="sheet__figure">
                    <img
                      src="${p(e.src)}"
                      alt="${p(e.title)}"
                      loading="eager"
                      decoding="async"
                    />
                    ${t.name||t.meta?`
                          <figcaption class="sheet__caption">
                            ${t.name?`<strong>${p(e.title)}</strong>`:``}
                            ${t.meta?`<span>${p(e.format)} · ${e.width}×${e.height} · ${m(e.bytes)}</span>`:``}
                          </figcaption>
                        `:``}
                    ${t.palette&&e.palette?`<div class="sheet__palette" aria-hidden="true">${e.palette.map(e=>`<i style="--hex: ${p(e)}"></i>`).join(``)}</div>`:``}
                  </figure>
                `).join(``)}
          </div>
        </section>
      `).join(``)}</div>`}function An(){return Y.scope===`selection`?Fe():C()}function jn(){let e=X(),t=e.querySelector(`#export-preview`),n=document.getElementById(`print-sheet`),r=e.querySelector(`#export-page-count`),i=e.querySelector(`[data-action="export-print"]`),a=An();if(!t||!n)return;if(a.length===0){t.innerHTML=`
      <div class="export__empty">
        <strong>No hay imágenes para presentar</strong>
        <p>Selecciona alguna imagen o cambia el alcance de la presentación.</p>
      </div>
    `,n.innerHTML=``,r&&(r.textContent=`0 imágenes`),i&&(i.disabled=!0);return}let o=kn(a,Y),s=Math.ceil(a.length/Dn(Y.columns));t.innerHTML=o,n.innerHTML=o,r&&(r.textContent=`${h(a.length)} imágenes · ${s} ${s===1?`página`:`páginas`}`),i&&(i.disabled=!1)}function Mn(){let e=X();if(!e)return;let t=t=>e.querySelector(`[data-export-field="${t}"]`)?.value??``;Y={title:t(`title`).trim(),client:t(`client`).trim(),date:t(`date`),notes:t(`notes`).trim(),columns:Number(t(`columns`))||3,scope:e.querySelector(`input[name="export-scope"]:checked`)?.value??`collection`,palette:!!e.querySelector(`[data-export-field="palette"]`)?.checked,name:!!e.querySelector(`[data-export-field="name"]`)?.checked,meta:!!e.querySelector(`[data-export-field="meta"]`)?.checked}}function Nn(e){(e.target.matches(`[data-export-field]`)||e.target.matches(`input[name="export-scope"]`))&&(Mn(),jn())}function Pn(){let e=b(),t=Fe(e),n=C(e).length,r=t.length>0;Y={title:wn(),client:``,date:Tn(),notes:``,columns:3,scope:r?`selection`:`collection`,palette:!0,name:!0,meta:!0};let i=X();i.classList.remove(`is-settings-open`),i.innerHTML=`
    <form class="dialog__form" id="export-form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Presentación</p>
          <h2 class="dialog__title" id="export-title">Exportar colección</h2>
          <p class="dialog__sub">Prepara una hoja en cuadrícula lista para clientes.</p>
        </div>
        <div class="dialog__head-actions">
          <button
            class="btn btn--ghost export__options-toggle"
            type="button"
            data-action="toggle-export-settings"
            data-focus-key="export-options"
            aria-expanded="false"
            aria-controls="export-settings"
            data-tooltip="Mostrar u ocultar las opciones"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-sliders"></use></svg>
            <span class="btn__label">Opciones</span>
          </button>
          <button
            class="icon-btn icon-btn--bare"
            type="button"
            data-action="close-dialog"
            data-dialog="export-dialog"
            aria-label="Cerrar"
            data-tooltip="Cerrar"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>
      </header>

      <div class="export__body">
        <div class="export__settings" id="export-settings">
          <label class="field">
            <span>Título de la presentación</span>
            <input data-export-field="title" value="${p(Y.title)}" />
          </label>

          <div class="field field--row">
            <label class="field">
              <span>Cliente</span>
              <input data-export-field="client" placeholder="Nombre del cliente" />
            </label>
            <label class="field">
              <span>Fecha</span>
              <input type="date" data-export-field="date" value="${Y.date}" />
            </label>
          </div>

          <label class="field">
            <span>Notas</span>
            <textarea
              data-export-field="notes"
              placeholder="Una breve introducción para la presentación…"
            ></textarea>
          </label>

          <label class="field">
            <span>Columnas de la cuadrícula</span>
            <select data-export-field="columns">
              <option value="2" ${Y.columns===2?`selected`:``}>2 columnas · formato amplio</option>
              <option value="3" ${Y.columns===3?`selected`:``}>3 columnas · equilibrio</option>
              <option value="4" ${Y.columns===4?`selected`:``}>4 columnas · catálogo</option>
            </select>
          </label>

          <fieldset class="export__scope">
            <legend>Imágenes a incluir</legend>
            <label class="toggle-field">
              <input type="radio" name="export-scope" value="collection" ${Y.scope===`collection`?`checked`:``} />
              Toda la colección (${h(n)})
            </label>
            <label class="toggle-field">
              <input type="radio" name="export-scope" value="selection" ${Y.scope===`selection`?`checked`:``} ${r?``:`disabled`} />
              Solo la selección (${h(t.length)})
            </label>
          </fieldset>

          <label class="toggle-field">
            <input type="checkbox" data-export-field="palette" ${Y.palette?`checked`:``} />
            Mostrar paleta de color
          </label>
          <label class="toggle-field">
            <input type="checkbox" data-export-field="name" ${Y.name?`checked`:``} />
            Mostrar nombre
          </label>
          <label class="toggle-field">
            <input type="checkbox" data-export-field="meta" ${Y.meta?`checked`:``} />
            Mostrar ficha técnica
          </label>
        </div>

        <div class="export__preview-wrap">
          <div class="export__preview-head">
            <span class="eyebrow">Vista previa</span>
            <span class="mono" id="export-page-count"></span>
          </div>
          <div class="export__preview" id="export-preview"></div>
        </div>
      </div>

      <footer class="dialog__foot">
        <span class="hint" style="margin-right: auto">Se imprimirá en A4 horizontal.</span>
        <button
          class="btn btn--ghost"
          type="button"
          data-action="close-dialog"
          data-dialog="export-dialog"
          data-tooltip="Cerrar sin exportar"
        >
          Cancelar
        </button>
        <button
          class="btn btn--primary"
          type="button"
          data-action="export-print"
          data-tooltip="Imprimir o guardar la presentación como PDF"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
          Imprimir / Guardar PDF
        </button>
      </footer>
    </form>
  `,jn()}function Fn(){J=document.getElementById(`export-dialog`),J.addEventListener(`click`,e=>{e.target===J&&J.close()}),J.addEventListener(`input`,Nn),J.addEventListener(`change`,Nn)}function In(){if(C().length===0){I(`No hay imágenes visibles para exportar.`,{type:`error`,icon:`info`});return}Pn();let e=X();e.open||e.showModal()}function Ln(e){let t=X();if(!t)return;let n=t.classList.toggle(`is-settings-open`);e&&e.setAttribute(`aria-expanded`,String(n))}async function Rn(){if(An().length===0){I(`No hay imágenes para presentar.`,{type:`error`,icon:`info`});return}let e=[...document.getElementById(`print-sheet`).querySelectorAll(`img`)];await Promise.all(e.map(e=>new Promise(t=>{e.complete?t():(e.addEventListener(`load`,t,{once:!0}),e.addEventListener(`error`,t,{once:!0}))})));let t=document.title;document.title=`${Y.title||`PicGallery`} — PicGallery`;let n=()=>{document.title=t,window.removeEventListener(`afterprint`,n)};window.addEventListener(`afterprint`,n),window.print()}var zn=null,Bn=null;function Vn(){return zn||=document.getElementById(`confirm-dialog`),zn}function Hn({title:e,message:t,confirmLabel:n=`Confirmar`,cancelLabel:r=`Cancelar`,danger:i=!1}={}){let a=Vn();return a?(Bn&&=(Bn(!1),null),a.open&&a.close(),a.innerHTML=`
    <form method="dialog" class="dialog__form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Confirmar acción</p>
          <h2 class="dialog__title" id="confirm-title">${p(e)}</h2>
        </div>
      </header>
      <div class="dialog__body">
        <p class="confirm__message">${p(t)}</p>
      </div>
      <footer class="dialog__foot">
        <button
          class="btn btn--ghost"
          type="submit"
          value="cancel"
          data-tooltip="Volver sin ejecutar la acción"
        >
          ${p(r)}
        </button>
        <button
          class="btn ${i?`btn--danger`:`btn--primary`}"
          type="submit"
          value="confirm"
          data-tooltip="Confirmar la acción"
        >
          ${p(n)}
        </button>
      </footer>
    </form>
  `,a.returnValue=``,a.showModal(),new Promise(e=>{Bn=e,a.addEventListener(`close`,()=>{let t=a.returnValue===`confirm`;Bn=null,e(t)},{once:!0})})):Promise.resolve(!1)}var Un=document.getElementById(`app`),Wn=document.getElementById(`sidebar`),Z=document.getElementById(`topbar`),Gn=document.getElementById(`toolbar`),Q=document.getElementById(`gallery-region`),$=document.getElementById(`inspector`),Kn=document.getElementById(`bulk-bar`),qn=document.getElementById(`scrim`),Jn=0,Yn=0;function Xn(){let e=document.activeElement;return!e||!e.dataset?.focusKey?null:{key:e.dataset.focusKey,start:e.selectionStart,end:e.selectionEnd}}function Zn(e){if(!e)return;let t=document.querySelector(`[data-focus-key="${CSS.escape(e.key)}"]`);if(t&&(t.focus({preventScroll:!0}),typeof e.start==`number`&&typeof t.setSelectionRange==`function`))try{t.setSelectionRange(e.start,e.end)}catch{}}function Qn(e){let t=window.matchMedia(`(max-width: 1200px)`).matches,n=window.matchMedia(`(max-width: 1024px)`).matches;Un.classList.toggle(`is-sidebar-open`,e.sidebarOpen),Un.classList.toggle(`is-sidebar-collapsed`,!n&&e.sidebarCollapsed),Un.classList.toggle(`is-inspector-open`,t?e.inspectorDrawer:e.inspectorOpen);let r=n&&e.sidebarOpen||t&&e.inspectorDrawer;qn.hidden=!r,qn.classList.toggle(`is-visible`,r);let i=Z.querySelector(`[data-action="toggle-sidebar"]`);if(i){let t=n?e.sidebarOpen:!e.sidebarCollapsed;i.setAttribute(`aria-expanded`,String(t)),i.setAttribute(`data-tooltip`,t?`Ocultar el menú`:`Mostrar el menú`),i.setAttribute(`aria-label`,n?t?`Cerrar menú de navegación`:`Abrir menú de navegación`:t?`Ocultar menú de navegación`:`Mostrar menú de navegación`)}let a=Z.querySelector(`[data-action="toggle-inspector"]`);if(a){let n=t?e.inspectorDrawer:e.inspectorOpen;a.setAttribute(`aria-expanded`,String(n)),a.setAttribute(`data-tooltip`,n?`Ocultar ficha técnica`:`Mostrar ficha técnica`),a.setAttribute(`aria-label`,n?`Ocultar ficha técnica`:`Mostrar ficha técnica`)}}function $n(e){let t=Z.querySelector(`.topbar__sub`);t&&(t.textContent=xt(e))}function er(e){let t=Z.querySelector(`[data-search]`);t&&t.value!==e.filters.query&&(t.value=e.filters.query)}function tr(e){let t=document.querySelector(`[data-sort-select]`);t&&t.value!==e.sort&&(t.value=e.sort)}function nr(e=`update`){let t=Xn(),n=b();e===`init`||e===`folder`||e===`folder-delete`||e===`move`||e===`upload`||e===`delete`||e===`favorite`||e===`update`?(bt(Wn),St(Z),M(Gn),N(Q,{animate:e===`init`}),P($),F(Kn),wt(),bn(),(e===`folder`||e===`upload`)&&window.scrollTo({top:0,behavior:`smooth`})):e===`filters`?($n(n),er(n),bt(Wn),M(Gn),N(Q),P($),F(Kn)):e===`selection`?(kt(),At(),M(Gn),P($),F(Kn)):e===`active`?(At(),P($)):e===`palettes`?(jt(),P($),bn(),n.filters.colors.length>0&&(N(Q),F(Kn))):e===`sort`||e===`reorder`?(N(Q),tr(n)):e===`view`?(M(Gn),N(Q),wt()):e===`view-style`?(Ot(),wt()):e===`folder-create`&&bt(Wn),Qn(n),Zn(t)}function rr(){let e=b(),t=C(e);t.length>0&&t.every(t=>e.selectedIds.includes(t.id))?Ke():Ge(t.map(e=>e.id))}function ir(){let e=Fe();if(e.length===0)return;let t=e.every(e=>e.favorite);Je(e.map(e=>e.id),!t),I(t?`Selección quitada de favoritos`:`Selección añadida a favoritos`)}function ar(e){I(qe(e)?`Añadida a favoritos`:`Quitada de favoritos`)}function or(e){let t=b().images.find(t=>t.id===e);t&&(ge(t),I(t.format===`RAW`?`Descargando proxy JPG`:`Descarga iniciada`))}async function sr(e){if(!e)return;let t=await le(e);I(t?`${e} copiado`:`No se pudo copiar el color`,{type:t?`info`:`error`,icon:t?`copy`:`info`})}async function cr(e){let t=b().images.find(t=>t.id===e);if(!t?.palette?.length)return;let n=await le(t.palette.join(`, `));I(n?`Paleta copiada`:`No se pudo copiar la paleta`,{type:n?`info`:`error`,icon:n?`copy`:`info`})}function lr(e){let t=document.getElementById(e);t?.open&&t.close()}function ur(e){ct(),_n(e)}function dr(){let e=Wn.querySelector(`.sidebar__folders`);if(!e||e.querySelector(`.folder-create`))return;let t=document.createElement(`form`);t.className=`folder-create`,t.innerHTML=`
    <input
      type="text"
      name="folder-name"
      placeholder="Nueva carpeta"
      aria-label="Nombre de la nueva carpeta"
      autocomplete="off"
    />
    <button type="submit" aria-label="Crear carpeta" data-tooltip="Crear carpeta">
      <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
    </button>
  `,e.append(t);let n=t.querySelector(`input`);n.focus(),t.addEventListener(`submit`,e=>{e.preventDefault();let t=n.value.trim();if(!t){n.focus();return}let r=rt(t);I(`Carpeta “${t}” creada`),r&&window.requestAnimationFrame(()=>{document.querySelector(`[data-focus-key="folder-${CSS.escape(r)}"]`)?.focus()})}),t.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.stopPropagation(),t.remove())})}function fr(){document.addEventListener(`click`,async e=>{e.target.closest(`.sidebar__summary`)&&Un.classList.contains(`is-sidebar-collapsed`)&&!window.matchMedia(`(max-width: 1024px)`).matches&&ot(!1);let t=e.target.closest(`[data-action]`);if(t)switch(t.dataset.action){case`folder`:Ie(t.dataset.folder);break;case`toggle-sidebar`:{let e=b();window.matchMedia(`(max-width: 1024px)`).matches?(e.sidebarOpen||D(!1),E(!e.sidebarOpen)):ot(!e.sidebarCollapsed);break}case`close-sidebar`:E(!1);break;case`toggle-inspector`:{let e=b();window.matchMedia(`(max-width: 1200px)`).matches?(e.inspectorDrawer||E(!1),D(!e.inspectorDrawer)):st(!e.inspectorOpen);break}case`close-inspector`:window.matchMedia(`(max-width: 1200px)`).matches?D(!1):st(!1);break;case`new-folder`:dr();break;case`open-upload`:Xt();break;case`pick-files`:Zt();break;case`open-export`:In();break;case`toggle-export-settings`:Ln(t);break;case`export-print`:await Rn();break;case`open-move`:tn([t.dataset.id]);break;case`rename-image`:ln(t.dataset.id);break;case`rename-folder`:un(t.dataset.folder);break;case`view-layout`:T({layout:t.dataset.layout===`list`?`list`:`grid`},`view`);break;case`bulk-move`:tn(b().selectedIds);break;case`bulk-favorite`:ir();break;case`bulk-delete`:{let e=b().selectedIds;if(e.length===0||!await Hn({title:`Eliminar selección`,message:`Se eliminarán ${e.length} ${e.length===1?`imagen`:`imágenes`} de la biblioteca. Esta acción no se puede deshacer.`,confirmLabel:`Eliminar`,danger:!0}))break;yn()&&vn();let t=Xe(e);I(t===1?`Imagen eliminada`:`${t} imágenes eliminadas`);break}case`bulk-clear`:Ke();break;case`select-all`:rr();break;case`clear-filters`:Ve();break;case`delete-image`:{let e=b().images.find(e=>e.id===t.dataset.id);if(!e||!await Hn({title:`Eliminar imagen`,message:`Se eliminará “${e.title}” de la biblioteca. Esta acción no se puede deshacer.`,confirmLabel:`Eliminar`,danger:!0}))break;yn()&&vn(),Ze(e.id),I(`Imagen eliminada`);break}case`delete-all-images`:{let e=b();if(e.images.length===0||!await Hn({title:`Eliminar todas las imágenes`,message:`Se eliminarán las ${e.images.length} imágenes de la biblioteca. Esta acción no se puede deshacer.`,confirmLabel:`Eliminar todas`,danger:!0}))break;yn()&&vn();let t=$e();I(t===1?`Imagen eliminada`:`${t} imágenes eliminadas`);break}case`delete-folder`:{let e=x(t.dataset.folder);if(!e||!await Hn({title:`Eliminar carpeta`,message:`Se eliminará la carpeta “${e.name}”. Las imágenes que contenga se moverán a “Sin clasificar”.`,confirmLabel:`Eliminar carpeta`,danger:!0}))break;tt(e.id)&&I(`Carpeta “${e.name}” eliminada`);break}case`toggle-color`:Re(t.dataset.color);break;case`toggle-format`:ze(t.dataset.format);break;case`toggle-tag`:Be(t.dataset.tag);break;case`open-image`:ur(t.dataset.id);break;case`favorite`:ar(t.dataset.id);break;case`download`:or(t.dataset.id);break;case`copy-hex`:await sr(t.dataset.hex);break;case`copy-palette`:await cr(t.dataset.id);break;case`close-dialog`:lr(t.dataset.dialog);break;case`lightbox-close`:vn();break;case`lightbox-prev`:Sn(-1);break;case`lightbox-next`:Sn(1);break;case`lightbox-favorite`:xn();break;case`lightbox-go`:Cn(Number(t.dataset.index))}}),document.addEventListener(`change`,e=>{let t=e.target.closest(`input[data-select]`);if(t){We(t.dataset.select,t.checked);return}let n=e.target.closest(`[data-view-layout]`);if(n){T({layout:n.value},`view`);return}let r=e.target.closest(`[data-view-meta]`);if(r){T({showMeta:r.checked},`view-style`);return}let i=e.target.closest(`[data-sort-select]`);i&&He(i.value)}),document.addEventListener(`input`,e=>{let t=e.target.closest(`[data-view-columns]`);if(t){T({columns:Number(t.value)},`view-style`);return}let n=e.target.closest(`[data-view-gap]`);if(n){T({gap:Number(n.value)},`view-style`);return}let r=e.target.closest(`[data-search]`);if(!r)return;window.clearTimeout(Jn);let i=r.value;Jn=window.setTimeout(()=>Le(i),130)}),document.addEventListener(`search`,e=>{e.target.matches(`[data-search]`)&&Le(e.target.value)}),document.addEventListener(`keydown`,e=>{let t=e.target.closest(`input, textarea, select, [contenteditable="true"]`),n=!!document.querySelector(`dialog[open]`);!t&&!n&&(e.key===`/`||(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`k`)?(e.preventDefault(),Z.querySelector(`[data-search]`)?.focus()):e.key===`Escape`&&!n&&ct()}),qn.addEventListener(`click`,ct);for(let e of[`move-dialog`,`rename-dialog`,`upload-dialog`,`confirm-dialog`]){let t=document.getElementById(e);t?.addEventListener(`click`,e=>{e.target===t&&t.close()})}window.addEventListener(`resize`,()=>{window.clearTimeout(Yn),Yn=window.setTimeout(()=>{window.innerWidth>1200&&D(!1),window.innerWidth>1024&&E(!1),Qn(b())},120)})}async function pr(){let e=b().images.filter(e=>!e.palette);if(e.length===0)return;let t={},n=[...e],r=async()=>{for(;n.length>0;){let e=n.shift();if(e)try{t[e.id]=await be(e.src)}catch{}}};await Promise.all(Array.from({length:Math.min(4,n.length)},()=>r())),Object.keys(t).length>0&&it(t)}async function mr(){Rt(),Yt(),Fn(),fr();try{await lt()}catch(e){console.error(e),nr(`init`),I(`No se pudo cargar la biblioteca guardada.`,{type:`error`,icon:`info`})}pr()}ke((e,t)=>nr(t)),mr();
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`picgallery`,t=1,n=`uploads`,r=null;function i(){return r||(r=new Promise((r,i)=>{let a=indexedDB.open(e,t);a.onupgradeneeded=()=>{let e=a.result;e.objectStoreNames.contains(n)||e.createObjectStore(n,{keyPath:`id`})},a.onsuccess=()=>r(a.result),a.onerror=()=>i(a.error)}),r)}function a(e,t){return i().then(r=>new Promise((i,a)=>{let o=r.transaction(n,e),s=t(o.objectStore(n));o.oncomplete=()=>i(s),o.onerror=()=>a(o.error),o.onabort=()=>a(o.error)}))}async function o(e){await a(`readwrite`,t=>t.put(e))}async function s(){return a(`readonly`,e=>{let t=e.getAll(),n=[];return t.onsuccess=()=>{n=t.result},{get value(){return n}}}).then(e=>e.value)}async function c(e){await a(`readwrite`,t=>t.delete(e))}var l=[{id:`paintings`,name:`Pintura clásica`,color:`#c8553d`},{id:`abstract`,name:`Abstracto`,color:`#1b2aff`},{id:`automotive`,name:`Automoción`,color:`#d8a400`},{id:`nature`,name:`Naturaleza`,color:`#3e7c4a`},{id:`textile`,name:`Diseño textil`,color:`#7a4b9e`},{id:`inbox`,name:`Sin clasificar`,color:`#8c8a85`}],u=[{id:`alegoria-celeste`,title:`Alegoría celeste`,description:`Fresco barroco con figuras suspendidas entre nubes.`,file:`img/formats/alegoria-celeste.png`,format:`PNG`,width:640,height:800,bytes:802808,folderId:`paintings`,favorite:!0,tags:[`barroco`,`mitología`,`fresco`],createdAt:`2026-11-12T09:20:00.000Z`},{id:`jardin-interior`,title:`Jardín interior`,description:`Óleo abstracto en verdes, azules y violetas.`,file:`img/formats/jardin-interior.webp`,format:`WEBP`,width:640,height:427,bytes:54666,folderId:`abstract`,tags:[`abstracto`,`óleo`,`jardín`],createdAt:`2026-11-11T16:10:00.000Z`},{id:`ferrari-ciudad`,title:`Ferrari en la ciudad`,description:`Amarillo intenso sobre el skyline al atardecer.`,file:`img/pexels-dbaler-30112301.jpg`,format:`JPG`,width:1280,height:1920,bytes:250090,folderId:`automotive`,tags:[`coche`,`urbano`,`amarillo`],createdAt:`2026-11-11T11:40:00.000Z`},{id:`bodegon-flores`,title:`Bodegón de flores`,description:`Composición floral sobre fondo oscuro.`,file:`img/formats/bodegon-flores.png`,format:`PNG`,width:640,height:911,bytes:881303,folderId:`paintings`,favorite:!0,tags:[`bodegón`,`flores`,`clásico`],createdAt:`2026-11-10T18:05:00.000Z`},{id:`geometria-cromatica`,title:`Geometría cromática`,description:`Bloques de color y trazos gestuales.`,file:`img/formats/geometria-cromatica.webp`,format:`WEBP`,width:640,height:399,bytes:67390,folderId:`abstract`,tags:[`abstracto`,`geometría`,`color`],createdAt:`2026-11-10T10:30:00.000Z`},{id:`ferrari-amarillo`,title:`Rojo amarillo`,description:`Estudio urbano de un Ferrari amarillo.`,file:`img/formats/raw/ferrari-amarillo.raw-preview.jpg`,format:`RAW`,proxy:!0,width:1280,height:853,bytes:199984,folderId:`automotive`,tags:[`coche`,`urbano`,`amarillo`],createdAt:`2026-11-09T15:15:00.000Z`},{id:`bosque-escarlata`,title:`Bosque escarlata`,description:`Reflejos otoñales sobre la lámina del lago.`,file:`img/ken-cheung-Z2M2KkdNLWQ-unsplash.jpg`,format:`JPG`,width:640,height:427,bytes:76418,folderId:`nature`,tags:[`paisaje`,`bosque`,`otoño`],createdAt:`2026-11-09T09:05:00.000Z`},{id:`sol-de-oleo`,title:`Sol de óleo`,description:`Amarillos y rojos de factura matérica.`,file:`img/formats/sol-de-oleo.webp`,format:`WEBP`,width:640,height:425,bytes:59170,folderId:`abstract`,tags:[`abstracto`,`óleo`,`cálido`],createdAt:`2026-11-08T17:45:00.000Z`},{id:`el-rebano`,title:`El rebaño`,description:`Paisaje pastoril con ovejas y robles.`,file:`img/birmingham-museums-trust-8wcoY3wcbL0-unsplash.jpg`,format:`JPG`,width:640,height:517,bytes:126854,folderId:`paintings`,tags:[`paisaje`,`rural`,`clásico`],createdAt:`2026-11-07T12:20:00.000Z`},{id:`ferrari-azul`,title:`Azul cobalto`,description:`Ferrari azul frente al ladrillo rojo.`,file:`img/formats/raw/ferrari-azul.raw-preview.jpg`,format:`RAW`,proxy:!0,width:1280,height:853,bytes:203285,folderId:`automotive`,favorite:!0,tags:[`coche`,`urbano`,`azul`],createdAt:`2026-11-06T16:55:00.000Z`},{id:`bodegon-frutas`,title:`Bodegón de frutas`,description:`Uvas, melocotones y granadas sobre piedra.`,file:`img/formats/bodegon-frutas.png`,format:`PNG`,width:640,height:505,bytes:469771,folderId:`paintings`,tags:[`bodegón`,`frutas`,`clásico`],createdAt:`2026-11-05T10:10:00.000Z`},{id:`rafaga-cromatica`,title:`Ráfaga cromática`,description:`Gesto azul, verde y naranja sobre lienzo.`,file:`img/formats/rafaga-cromatica.webp`,format:`WEBP`,width:640,height:480,bytes:68516,folderId:`abstract`,tags:[`abstracto`,`gesto`,`color`],createdAt:`2026-11-04T14:35:00.000Z`},{id:`patron-morris`,title:`Patrón Morris`,description:`Estampado floral de inspiración Arts & Crafts.`,file:`img/birmingham-museums-trust--KfLa4I4eTo-unsplash.jpg`,format:`JPG`,width:640,height:434,bytes:181672,folderId:`textile`,tags:[`textil`,`patrón`,`floral`],createdAt:`2026-11-03T09:50:00.000Z`},{id:`cordillera-en-calma`,title:`Cordillera en calma`,description:`Estudio de montaña entre brumas.`,file:`img/birmingham-museums-trust-HEEvYhNzpEo-unsplash-2.jpg`,format:`JPG`,width:640,height:487,bytes:97313,folderId:`paintings`,tags:[`paisaje`,`montaña`,`niebla`],createdAt:`2026-11-02T18:25:00.000Z`},{id:`oleo-en-azul`,title:`Óleo en azul`,description:`Azul cobalto sobre naranja encendido.`,file:`img/steve-johnson-RLyEzLmhR98-unsplash.jpg`,format:`JPG`,width:640,height:445,bytes:101562,folderId:`abstract`,favorite:!0,tags:[`abstracto`,`óleo`,`azul`],createdAt:`2026-11-01T11:15:00.000Z`},{id:`la-calle-del-reloj`,title:`La calle del reloj`,description:`Acuarela urbana del siglo XIX.`,file:`img/birmingham-museums-trust-_fXZDGdrYZk-unsplash.jpg`,format:`JPG`,width:640,height:465,bytes:68394,folderId:`paintings`,tags:[`urbano`,`acuarela`,`clásico`],createdAt:`2026-10-30T15:40:00.000Z`},{id:`cordillera-al-alba`,title:`Cordillera al alba`,description:`Montañas, niebla y vegetación otoñal.`,file:`img/birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg`,format:`JPG`,width:640,height:440,bytes:60577,folderId:`paintings`,tags:[`paisaje`,`montaña`,`otoño`],createdAt:`2026-10-28T09:30:00.000Z`},{id:`el-olimpo`,title:`El Olimpo`,description:`Escena mitológica entre nubes y querubines.`,file:`img/lukas-meier-aAxn9pYE8L0-unsplash.jpg`,format:`JPG`,width:640,height:360,bytes:55113,folderId:`paintings`,tags:[`mitología`,`clásico`,`nubes`],createdAt:`2026-10-25T17:05:00.000Z`}],d=`picgallery:v1`;function f(){try{let e=window.localStorage.getItem(d);return e?JSON.parse(e):null}catch{return null}}function ee(e){try{window.localStorage.setItem(d,JSON.stringify(e))}catch{}}function p(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function m(e){let t=Number(e)||0;if(t<1024)return`${t} B`;let n=[`KB`,`MB`,`GB`,`TB`],r=t,i=-1;do r/=1024,i+=1;while(r>=1024&&i<n.length-1);return`${new Intl.NumberFormat(`es-ES`,{maximumFractionDigits:+(r<10)}).format(r)} ${n[i]}`}function h(e){return new Intl.NumberFormat(`es-ES`).format(Number(e)||0)}function te(e){let t=e instanceof Date?e:new Date(e);return Number.isNaN(t.getTime())?`—`:new Intl.DateTimeFormat(`es-ES`,{day:`2-digit`,month:`short`,year:`numeric`}).format(t)}function ne(e,t){return`${String(e+1).padStart(2,`0`)} / ${String(t).padStart(2,`0`)}`}function re(e){return`/7_GalleryPic/${String(e).replace(/^\/+/,``)}`}function ie(){return globalThis.crypto?.randomUUID?globalThis.crypto.randomUUID():`img-${Date.now()}-${Math.random().toString(16).slice(2)}`}function ae(e,t=200){let n=0;return(...r)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...r),t)}}function g(e){return String(e).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)}function oe(e){let t=String(e).replace(/\.[^.]+$/,``).replace(/[-_]+/g,` `).replace(/\s+/g,` `).trim();return t?t.charAt(0).toUpperCase()+t.slice(1):`Sin título`}function se(e){try{let t=new URL(e,window.location.href).pathname.match(/\.([a-z0-9]+)$/i);return t?t[1].toLowerCase():`jpg`}catch{return`jpg`}}async function ce(e){try{return await navigator.clipboard.writeText(e),!0}catch{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.append(t),t.select();try{return document.execCommand(`copy`)}catch{return!1}finally{t.remove()}}}function le(e,t,n){return Math.min(Math.max(e,t),n)}function ue(e){let t=String(e).replace(`#`,``),n=t.length===3?t.split(``).map(e=>e+e).join(``):t.padEnd(6,`0`).slice(0,6);return[Number.parseInt(n.slice(0,2),16),Number.parseInt(n.slice(2,4),16),Number.parseInt(n.slice(4,6),16)]}function de(e,t,n){return`#${[e,t,n].map(e=>le(Math.round(e),0,255).toString(16).padStart(2,`0`)).join(``).toUpperCase()}`}function fe(e,t){return Math.sqrt((e[0]-t[0])**2+(e[1]-t[1])**2+(e[2]-t[2])**2)}function pe({src:e,title:t,format:n}){let r=document.createElement(`a`),i=n===`PNG`?`png`:n===`WEBP`?`webp`:se(e);r.href=e,r.download=`${g(t)||`imagen`}.${i}`,r.rel=`noopener`,document.body.append(r),r.click(),r.remove()}var me=8,he=[`#c8553d`,`#1b2aff`,`#3e7c4a`,`#7a4b9e`,`#d8a400`,`#2b9c9c`],_={folders:l.map(e=>({...e})),images:u.map(e=>({...e,tags:[...e.tags??[]],src:re(e.file),origin:`seed`,palette:null})),sort:`recent`,activeFolder:`all`,filters:{query:``,tags:[]},view:{layout:`grid`,columns:4,gap:16,showMeta:!0},selectedIds:[],activeImageId:null,sidebarOpen:!1,sidebarCollapsed:!1,inspectorOpen:!0,inspectorDrawer:!1,deletedIds:[],deletedFolderIds:[],ready:!1},ge=new Set,_e=ae(()=>{ee({version:2,folders:_.folders,images:_.images.map(({src:e,...t})=>t),orderIds:_.images.map(e=>e.id),sort:_.sort,activeFolder:_.activeFolder,activeImageId:_.activeImageId,inspectorOpen:_.inspectorOpen,sidebarCollapsed:_.sidebarCollapsed,filters:_.filters,view:_.view,deletedIds:_.deletedIds,deletedFolderIds:_.deletedFolderIds})},250);function v(e=`update`){_e();for(let t of ge)t(_,e)}function y(){let e=C();e.some(e=>e.id===_.activeImageId)||(_.activeImageId=e[0]?.id??null)}function ve(e){return ge.add(e),()=>ge.delete(e)}function b(){return _}function x(e){return _.folders.find(t=>t.id===e)}function S(e){return e===`all`?`Todas las imágenes`:e===`favorites`?`Favoritos`:e===`recent`?`Recientes`:x(e)?.name??`Colección`}function ye(e){return e===`all`?`Biblioteca`:e===`favorites`?`Selección personal`:e===`recent`?`Últimas incorporaciones`:`Carpeta`}function be(e=_){return e.activeFolder===`favorites`?e.images.filter(e=>e.favorite):e.activeFolder===`recent`?[...e.images].sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)).slice(0,me):e.activeFolder===`all`?[...e.images]:e.images.filter(t=>t.folderId===e.activeFolder)}function C(e=_){let t=be(e),n=e.filters.query.trim().toLowerCase();return n&&(t=t.filter(e=>{let t=S(e.folderId).toLowerCase();return`${e.title} ${e.description??``} ${t}`.toLowerCase().includes(n)})),e.filters.tags.length>0&&(t=t.filter(t=>{let n=t.tags??[];return e.filters.tags.every(e=>n.includes(e))})),e.sort===`recent`?t=[...t].sort((e,t)=>new Date(t.createdAt)-new Date(e.createdAt)):e.sort===`name`?t=[...t].sort((e,t)=>e.title.localeCompare(t.title,`es`,{sensitivity:`base`})):e.sort===`size`&&(t=[...t].sort((e,t)=>t.bytes-e.bytes)),t}function w(e=_.images){return e.reduce((e,t)=>e+(Number(t.bytes)||0),0)}function xe(e=_){let t=Object.fromEntries(e.folders.map(t=>[t.id,e.images.filter(e=>e.folderId===t.id).length]));return{total:e.images.length,favorites:e.images.filter(e=>e.favorite).length,recent:Math.min(me,e.images.length),folders:t}}function Se(e=_.images){let t=new Map;for(let n of e)for(let e of n.tags??[])t.set(e,(t.get(e)??0)+1);return[...t.entries()].sort((e,t)=>t[1]-e[1]||e[0].localeCompare(t[0],`es`,{sensitivity:`base`})).map(([e,t])=>({tag:e,count:t}))}function Ce(e=_){return e.images.find(t=>t.id===e.activeImageId)??null}function we(e=_){let t=new Set(e.selectedIds);return e.images.filter(e=>t.has(e.id))}function Te(e){([`all`,`favorites`,`recent`].includes(e)||x(e))&&(_.activeFolder=e,_.selectedIds=[],_.sidebarOpen=!1,_.activeImageId=C()[0]?.id??null,v(`folder`))}function Ee(e){_.filters.query=e,_.selectedIds=[];let t=C();t.some(e=>e.id===_.activeImageId)||(_.activeImageId=t[0]?.id??null),v(`filters`)}function De(e){let t=new Set(_.filters.tags);t.has(e)?t.delete(e):t.add(e),_.filters.tags=[...t],_.selectedIds=[];let n=C();n.some(e=>e.id===_.activeImageId)||(_.activeImageId=n[0]?.id??null),v(`filters`)}function Oe(){_.filters={query:``,tags:[]},_.selectedIds=[];let e=C();e.some(e=>e.id===_.activeImageId)||(_.activeImageId=e[0]?.id??null),v(`filters`)}function ke(e){[`recent`,`name`,`size`,`manual`].includes(e)&&(_.sort=e,v(`sort`))}function Ae(e){_.images.some(t=>t.id===e)&&(_.activeImageId=e,v(`active`))}function je(e,t){let n=new Set(_.selectedIds);t??!n.has(e)?n.add(e):n.delete(e),_.selectedIds=[...n],_.activeImageId=e,v(`selection`)}function Me(e){_.selectedIds=[...e],v(`selection`)}function Ne(){_.selectedIds.length!==0&&(_.selectedIds=[],v(`selection`))}function Pe(e){let t=_.images.find(t=>t.id===e);if(t)return t.favorite=!t.favorite,y(),v(`favorite`),t.favorite}function Fe(e,t){let n=new Set(e),r=!1;for(let e of _.images)n.has(e.id)&&(e.favorite=!!t,r=!0);r&&(y(),v(`favorite`))}function Ie(e,t){if(!x(t))return;let n=new Set(e);for(let e of _.images)n.has(e.id)&&(e.folderId=t);_.selectedIds=[],y(),v(`move`)}function Le(e){let t=new Set(e),n=_.images.filter(e=>t.has(e.id));if(n.length===0)return 0;_.images=_.images.filter(e=>!t.has(e.id));let r=new Set(_.deletedIds);for(let e of n)r.add(e.id),e.origin===`upload`&&(c(e.id).catch(()=>null),e.src?.startsWith(`blob:`)&&URL.revokeObjectURL(e.src));return _.deletedIds=[...r],_.selectedIds=_.selectedIds.filter(e=>!t.has(e)),t.has(_.activeImageId)&&(_.activeImageId=null),y(),v(`delete`),n.length}function Re(e){return Le([e])}function ze(e,t){let n=_.images.find(t=>t.id===e);if(!n)return null;let r=String(t??``).trim();return r?(n.title===r||(n.title=r,v(`update`)),r):null}function Be(){return Le(_.images.map(e=>e.id))}function Ve(e,t){let n=x(e);if(!n)return null;let r=String(t??``).trim();return r?(n.name===r||(n.name=r,v(`update`)),r):null}function He(e){if(e===`inbox`||!x(e))return!1;for(let t of _.images)t.folderId===e&&(t.folderId=`inbox`);return _.folders=_.folders.filter(t=>t.id!==e),_.deletedFolderIds.includes(e)||_.deletedFolderIds.push(e),_.activeFolder===e&&(_.activeFolder=`all`),y(),v(`folder-delete`),!0}function T(e,t=`view-style`){let n={..._.view,...e};_.view={layout:n.layout===`list`?`list`:`grid`,columns:Math.min(8,Math.max(3,Number(n.columns)||4)),gap:Math.min(48,Math.max(0,Number(n.gap)||0)),showMeta:n.showMeta!==!1},v(t)}function Ue(e,t,n){let r=new Set(e);if(r.size===0||r.has(t))return;let i=_.images.filter(e=>r.has(e.id)),a=_.images.filter(e=>!r.has(e.id)),o=a.findIndex(e=>e.id===t);if(o===-1||i.length===0)return;let s=n===`after`?o+1:o;_.images=[...a.slice(0,s),...i,...a.slice(s)],_.sort=`manual`,_.selectedIds=[],v(`reorder`)}function We(e){let t=e.trim();if(!t)return null;let n=g(t)||`carpeta`,r=n,i=2;for(;_.folders.some(e=>e.id===r);)r=`${n}-${i}`,i+=1;return _.folders.push({id:r,name:t,color:he[_.folders.length%he.length]}),_.deletedFolderIds=_.deletedFolderIds.filter(e=>e!==r),v(`folder-create`),r}function Ge(e){let t=!1;for(let[n,r]of Object.entries(e)){let e=_.images.find(e=>e.id===n);e&&!e.palette&&Array.isArray(r)&&(e.palette=r,t=!0)}t&&(y(),v(`palettes`))}function Ke(e){e.length&&(_.images=[...e,..._.images],_.activeImageId=e[0].id,_.selectedIds=[],v(`upload`))}function E(e){_.sidebarOpen=!!e,v(`ui`)}function qe(e){_.sidebarCollapsed=!!e,v(`ui`)}function Je(e){_.inspectorOpen=!!e,v(`ui`)}function D(e){_.inspectorDrawer=!!e,v(`ui`)}function Ye(){(_.sidebarOpen||_.inspectorDrawer)&&(_.sidebarOpen=!1,_.inspectorDrawer=!1,v(`ui`))}async function Xe(){let e=f();if(e){_.deletedIds=Array.isArray(e.deletedIds)?[...new Set(e.deletedIds)]:[],_.deletedFolderIds=Array.isArray(e.deletedFolderIds)?[...new Set(e.deletedFolderIds)]:[];let t=new Set(_.deletedFolderIds);if(_.folders=_.folders.filter(e=>!t.has(e.id)),Array.isArray(e.folders)&&e.folders.length>0){let n=e.folders.filter(e=>!t.has(e.id)),r=new Set(n.map(e=>e.id)),i=l.filter(e=>!r.has(e.id)&&!t.has(e.id));_.folders=[...n,...i]}e.sort&&(_.sort=e.sort),e.activeFolder&&(_.activeFolder=e.activeFolder),e.activeImageId&&(_.activeImageId=e.activeImageId),typeof e.inspectorOpen==`boolean`&&(_.inspectorOpen=e.inspectorOpen),typeof e.sidebarCollapsed==`boolean`&&(_.sidebarCollapsed=e.sidebarCollapsed),e.filters&&(_.filters={query:typeof e.filters.query==`string`?e.filters.query:``,tags:Array.isArray(e.filters.tags)?e.filters.tags:[]}),e.view&&(_.view={layout:e.view.layout===`list`?`list`:`grid`,columns:Math.min(8,Math.max(3,Number(e.view.columns)||4)),gap:Math.min(48,Math.max(0,Number(e.view.gap)||0)),showMeta:e.view.showMeta!==!1});let n=new Set(_.deletedIds);_.images=_.images.filter(e=>!n.has(e.id));let r=new Map((e.images??[]).filter(e=>!n.has(e.id)).map(e=>[e.id,e]));_.images=_.images.map(e=>{let t=r.get(e.id);return t?{...e,...t,src:e.src,origin:`seed`}:e});let i=(e.images??[]).filter(e=>e.origin===`upload`&&!n.has(e.id));if(i.length>0){let e=await s().catch(()=>[]),t=new Map(e.map(e=>[e.id,e]));for(let e of i){let n=t.get(e.id);n?.blob&&_.images.push({...e,src:URL.createObjectURL(n.blob),origin:`upload`})}}if(Array.isArray(e.orderIds)){let t=new Map(_.images.map(e=>[e.id,e])),n=new Set(e.orderIds),r=e.orderIds.map(e=>t.get(e)).filter(Boolean),i=_.images.filter(e=>!n.has(e.id));_.images=[...r,...i]}}return[`all`,`favorites`,`recent`].includes(_.activeFolder)||x(_.activeFolder)||(_.activeFolder=`all`),_.images.some(e=>e.id===_.activeImageId)||(_.activeImageId=_.images[0]?.id??null),_.ready=!0,v(`init`),_}var O={folders:!0,tags:!1},Ze=new Set;function Qe(e){return`aria-label="${e}" data-tooltip="${e}"`}function $e(e,t,n=``){return`
    <svg class="icon" aria-hidden="true"><use href="#icon-${e}"></use></svg>
    <span class="sidebar__summary-label">${t}</span>
    ${n}
    <svg class="sidebar__chevron icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
  `}function et(e){return O[e]?`open`:``}function tt(e){e.querySelectorAll(`[data-section]`).forEach(e=>{O[e.dataset.section]=e.open})}function nt(e,t,n,r,i){let a=e.activeFolder===t;return`
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
  `}function rt(e,t,n){let r=e.activeFolder===t.id,i=p(t.name),a=t.id!==`inbox`;return`
    <div class="folder-row">
      <div
        class="folder-item${r?` is-active`:``}"
        data-drop-folder="${p(t.id)}"
        style="--dot: ${p(t.color)}"
      >
        <button
          class="folder-item__open"
          type="button"
          data-action="folder"
          data-folder="${p(t.id)}"
          data-focus-key="folder-${p(t.id)}"
          data-tooltip="Abrir la carpeta ${i}"
          ${r?`aria-current="page"`:``}
        >
          <span class="visually-hidden">Abrir la carpeta ${i}</span>
        </button>
        <span class="folder-item__dot" aria-hidden="true"></span>
        <button
          class="folder-item__name"
          type="button"
          data-action="rename-folder"
          data-folder="${p(t.id)}"
          data-focus-key="rename-folder-name-${p(t.id)}"
          aria-label="Renombrar la carpeta ${i}"
          data-tooltip="Renombrar carpeta"
        >${i}</button>
        <span class="folder-item__count mono" aria-hidden="true">${h(n)}</span>
      </div>
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
  `}function it(e){let t=Se(e.images);if(t.length===0)return``;let n=e.filters.tags;return`
    <details class="sidebar__section sidebar__section--nested" data-section="tags" ${(Ze.has(`tags`)?O.tags:O.tags||n.length>0)?`open`:``}>
      <summary class="sidebar__summary sidebar__summary--nested" ${Qe(`Etiquetas`)}>
        ${$e(`tag`,`Etiquetas`,`<span class="sidebar__summary-count mono">${h(t.length)}</span>`)}
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
  `}function at(e){tt(e);let t=b(),n=xe(t);w(t.images);let r=t.folders.map(e=>rt(t,e,n.folders[e.id]??0)).join(``);e.innerHTML=`
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

    <nav class="sidebar__nav" aria-label="Biblioteca">
      ${nt(t,`all`,`Todas las imágenes`,`grid`,n.total)}
      ${nt(t,`favorites`,`Favoritos`,`star`,n.favorites)}
    </nav>

    <details class="sidebar__section" data-section="folders" ${et(`folders`)}>
      <summary class="sidebar__summary" ${Qe(`Carpetas`)}>
        ${$e(`folder`,`Carpetas`)}
      </summary>
      <div class="sidebar__section-body">
        <div class="sidebar__section-head">
          <button
            class="icon-btn icon-btn--dark icon-btn--pill"
            type="button"
            data-action="new-folder"
            data-focus-key="sidebar-new-folder"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-plus"></use></svg>
            <span>Crear carpeta</span>
          </button>
        </div>
        <div class="sidebar__folders">${r}</div>
        ${it(t)}
      </div>
    </details>

    <div class="sidebar__foot">
      <button
        class="sidebar__export"
        type="button"
        data-action="download-collection"
        data-focus-key="sidebar-export"
        data-tooltip="Descargar la carpeta activa en ZIP"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-download"></use></svg>
        <span>Exportar colección</span>
      </button>

      <button
        class="sidebar__settings"
        type="button"
        data-action="open-settings"
        data-focus-key="sidebar-settings"
        data-tooltip="Abrir ajustes de vista"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-sliders"></use></svg>
        <span>Ajustes</span>
      </button>
    </div>
  `,e.querySelectorAll(`[data-section]`).forEach(e=>{e.addEventListener(`toggle`,()=>{Ze.add(e.dataset.section),O[e.dataset.section]=e.open})})}function ot(e=b()){let t=C(e),n=e.filters.query.trim()!==``||e.filters.tags.length>0,r=w(e.images),i=w(t);return n?`${h(t.length)} de ${h(e.images.length)} imágenes · ${m(i)}`:`${h(e.images.length)} imágenes · ${m(r)}`}function st(e){let t=b();ot(t);let n=t.inspectorOpen||t.inspectorDrawer,r=window.matchMedia(`(max-width: 1024px)`).matches,i=r?t.sidebarOpen:!t.sidebarCollapsed;e.innerHTML=`
    <button
      class="icon-btn topbar__menu"
      type="button"
      data-action="toggle-sidebar"
      aria-label="${r?i?`Cerrar menú de navegación`:`Abrir menú de navegación`:i?`Ocultar menú de navegación`:`Mostrar menú de navegación`}"
      aria-expanded="${i}"
      aria-controls="sidebar"
      data-tooltip="${i?`Ocultar el menú`:`Mostrar el menú`}"
    >
      <svg class="icon" aria-hidden="true"><use href="#icon-menu"></use></svg>
    </button>

    <div class="topbar__heading">
      <p class="eyebrow">${ye(t.activeFolder)}
      <h1 class="topbar__title">${p(S(t.activeFolder))}</h1>
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
        aria-label="${n?`Ocultar ficha técnica`:`Mostrar ficha técnica`}"
        aria-expanded="${n}"
        aria-controls="inspector"
        data-focus-key="inspector-toggle"
        data-tooltip="${n?`Ocultar ficha técnica`:`Mostrar ficha técnica`}"
      >
        <svg class="icon" aria-hidden="true"><use href="#icon-info"></use></svg>
      </button>
    </div>
  `}function k(e){let t=b(),n=C(t);t.filters.tags.length>0||t.filters.query.trim(),n.length>0&&n.every(e=>t.selectedIds.includes(e.id));let{layout:r,columns:i,gap:a}=t.view,o=r===`list`;t.images.length,e.innerHTML=`
    <div class="toolbar__zone toolbar__zone--view">
      <div class="toolbar__controls">
        <div class="segmented segmented--icons" role="group" aria-label="Modo de vista">
          <button
            class="segmented__item${o?``:` is-active`}"
            type="button"
            data-action="view-layout"
            data-layout="grid"
            data-focus-key="layout-grid"
            aria-pressed="${!o}"
            data-tooltip="Ver en cuadrícula"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-grid"></use></svg>
            <span class="visually-hidden">Cuadrícula</span>
          </button>
          <button
            class="segmented__item${o?` is-active`:``}"
            type="button"
            data-action="view-layout"
            data-layout="list"
            data-focus-key="layout-list"
            aria-pressed="${o}"
            data-tooltip="Ver en lista"
          >
            <svg class="icon" aria-hidden="true"><use href="#icon-list"></use></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="toolbar__zone toolbar__zone--end">
      <div class="toolbar__controls toolbar__controls--end">
        <span class="toolbar__count">
          <span class="visually-hidden">Imágenes visibles: </span>${h(n.length)} de ${h(t.images.length)}
        </span>

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
    </div>
  `}function ct(){let e=b(),{layout:t,columns:n,gap:r}=e.view;document.querySelectorAll(`[data-action="view-layout"]`).forEach(e=>{let n=e.dataset.layout===t;e.classList.toggle(`is-active`,n),e.setAttribute(`aria-pressed`,String(n))}),document.querySelectorAll(`[data-view-columns]`).forEach(e=>{e.value!==String(n)&&(e.value=String(n))}),document.querySelectorAll(`[data-view-gap]`).forEach(e=>{e.value!==String(r)&&(e.value=String(r))}),document.querySelectorAll(`[data-view-meta]`).forEach(t=>{t.checked!==e.view.showMeta&&(t.checked=e.view.showMeta)}),document.querySelectorAll(`[data-output="columns"]`).forEach(e=>{e.textContent=`${n} × ${n}`}),document.querySelectorAll(`[data-output="gap"]`).forEach(e=>{e.textContent=`${r} px`})}function lt(e){return(Array.isArray(e.palette)&&e.palette.length>0?e.palette:[`#d7d3ca`,`#d7d3ca`,`#d7d3ca`,`#d7d3ca`,`#d7d3ca`,`#d7d3ca`]).map(e=>`<span style="--swatch: ${p(e)}"></span>`).join(``)}function ut(e,t,n){let r=n.selectedIds.includes(e.id),i=n.activeImageId===e.id,a=!!e.favorite,o=p(e.title),s=p(e.format),c=e.format===`RAW`?`RAW · vista previa JPG`:e.format,l=n.view.layout===`list`,u=p(S(e.folderId)),d=(e.tags??[]).map(e=>`<li>${p(e)}</li>`).join(``),f=e.description?`<p class="card__desc">${p(e.description)}</p>`:``,ee=l?`
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

        <div class="card__palette" aria-hidden="true">${lt(e)}</div>

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
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
        </button>

        <span class="format-badge" data-format="${s}" title="${c}">
          ${s}
        </span>
      </div>

      <div class="card__meta">
        <div class="card__heading">
          <h3 class="card__title" title="${o}">
            <button
              class="card__title-btn"
              type="button"
              data-action="rename-image"
              data-id="${p(e.id)}"
              data-focus-key="rename-title-${p(e.id)}"
              aria-label="Cambiar el nombre de ${o}"
            >${o}</button>
          </h3>
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
  `}function dt(e,t){return e.images.length===0?`
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
        <p>No hay imágenes que coincidan con los filtros activos. Prueba con otra etiqueta o con otra búsqueda.</p>
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
  `}function A(e,t={}){let n=b(),r=C(n),i=n.filters.query.trim()!==``||n.filters.tags.length>0;if(r.length===0){e.innerHTML=`
      <section class="gallery-wrap" aria-label="Imágenes de la colección">
        ${dt(n,i)}
      </section>
    `;return}let a=r.map((e,t)=>ut(e,t,n)).join(``),{layout:o,columns:s,gap:c,showMeta:l}=n.view;e.innerHTML=`
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
  `,t.animate&&window.setTimeout(()=>{document.getElementById(`gallery`)?.classList.remove(`is-entering`)},1100)}function ft(){let e=b(),t=document.getElementById(`gallery`);if(!t)return;let{layout:n,columns:r,gap:i,showMeta:a}=e.view;t.style.setProperty(`--cols`,String(r)),t.style.setProperty(`--gap`,`${i}px`),t.classList.toggle(`is-list`,n===`list`),t.classList.toggle(`is-meta-hidden`,!a)}function pt(){let e=b();document.querySelectorAll(`[data-card-id]`).forEach(t=>{let n=e.selectedIds.includes(t.dataset.cardId),r=t.querySelector(`input[data-select]`);t.classList.toggle(`is-selected`,n),r&&(r.checked=n)})}function mt(){let e=b();document.querySelectorAll(`[data-card-id]`).forEach(t=>{t.classList.toggle(`is-active`,t.dataset.cardId===e.activeImageId)})}function ht(){let e=b();document.querySelectorAll(`[data-card-id]`).forEach(t=>{let n=e.images.find(e=>e.id===t.dataset.cardId),r=t.querySelector(`.card__palette`);n?.palette&&r&&(r.innerHTML=n.palette.map(e=>`<span style="--swatch: ${p(e)}"></span>`).join(``))})}var gt=!0;function _t(e){return!Array.isArray(e.palette)||e.palette.length===0?`<p class="palette__empty">Extrayendo la paleta de la imagen…</p>`:`
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
  `}function j(e){let t=e.querySelector(`.inspector__data`);t&&(gt=t.open);let n=Ce(b());if(!n){e.innerHTML=`
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

    <details class="inspector__data" ${gt?`open`:``}>
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
      ${_t(n)}
      <p class="palette__hint">Haz clic en un color para copiar su código HEX.</p>
    </section>
  `}function vt(e){let t=we(b());if(t.length===0){e.innerHTML=``;return}let n=t.every(e=>e.favorite);e.innerHTML=`
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
  `}var yt=null;function bt(){return yt||=document.getElementById(`toast-region`),yt}function M(e,t={}){let{type:n=`info`,icon:r=`check`}=t,i=bt();if(!i)return;let a=document.createElement(`div`);a.className=`toast toast--${n}`,a.innerHTML=`
    <svg class="icon" aria-hidden="true"><use href="#icon-${r}"></use></svg>
    <span>${p(e)}</span>
  `,i.append(a),window.setTimeout(()=>{a.classList.add(`is-leaving`),window.setTimeout(()=>a.remove(),220)},2800)}var N=[];function xt(){document.querySelectorAll(`.is-drop-target`).forEach(e=>{e.classList.remove(`is-drop-target`)}),document.querySelectorAll(`.drop-before, .drop-after`).forEach(e=>{e.classList.remove(`drop-before`,`drop-after`),delete e.dataset.dropPosition})}function St(){xt(),document.querySelectorAll(`.is-dragging`).forEach(e=>{e.classList.remove(`is-dragging`)}),document.body.classList.remove(`is-dragging-cards`),N=[]}function Ct(){document.addEventListener(`dragstart`,e=>{let t=e.target.closest(`[data-card-id]`);if(!t)return;let n=b(),r=t.dataset.cardId;N=n.selectedIds.includes(r)&&n.selectedIds.length>1?[...n.selectedIds]:[r],e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(`application/x-picgallery`,JSON.stringify(N)),e.dataTransfer.setData(`text/plain`,N.join(`,`)),t.classList.add(`is-dragging`),document.body.classList.add(`is-dragging-cards`)}),document.addEventListener(`dragend`,St),document.addEventListener(`dragover`,e=>{if(N.length===0)return;let t=e.target.closest(`[data-drop-folder]`);if(t){e.preventDefault(),e.dataTransfer.dropEffect=`move`,xt(),t.classList.add(`is-drop-target`);return}let n=e.target.closest(`[data-card-id]`);if(!n||N.includes(n.dataset.cardId))return;e.preventDefault(),e.dataTransfer.dropEffect=`move`,xt();let r=n.getBoundingClientRect(),i=n.classList.contains(`card--list`)?e.clientY<r.top+r.height/2?`before`:`after`:e.clientX<r.left+r.width/2?`before`:`after`;n.classList.add(i===`before`?`drop-before`:`drop-after`),n.dataset.dropPosition=i}),document.addEventListener(`dragleave`,e=>{let t=e.target.closest(`[data-drop-folder]`);t&&t.classList.remove(`is-drop-target`)}),document.addEventListener(`drop`,e=>{if(N.length===0)return;let t=e.target.closest(`[data-drop-folder]`);if(t){e.preventDefault();let n=t.dataset.dropFolder,r=x(n)?.name??`la carpeta`,i=N.length;Ie(N,n),M(i===1?`Imagen movida a ${r}`:`${i} imágenes movidas a ${r}`),St();return}let n=e.target.closest(`[data-card-id]`);n?.dataset.dropPosition&&(e.preventDefault(),Ue(N,n.dataset.cardId,n.dataset.dropPosition),St())})}var P=64,wt=48,Tt=44,Et=6;async function Dt(e){let t=await fetch(e);if(!t.ok)throw Error(`No se pudo leer ${e}`);return Ot(await t.blob())}async function Ot(e){let t=await createImageBitmap(e);try{return kt(t)}finally{t.close?.()}}function kt(e){let t=document.createElement(`canvas`);t.width=P,t.height=P;let n=t.getContext(`2d`,{willReadFrequently:!0});n.drawImage(e,0,0,P,P);let{data:r}=n.getImageData(0,0,P,P);return At(r)}function At(e){let t=new Map;for(let n=0;n<e.length;n+=4){if(e[n+3]<128)continue;let r=e[n],i=e[n+1],a=e[n+2],o=r>>4<<8|i>>4<<4|a>>4,s=t.get(o);s||(s={count:0,red:0,green:0,blue:0},t.set(o,s)),s.count+=1,s.red+=r,s.green+=i,s.blue+=a}let n=[...t.values()].map(e=>({count:e.count,rgb:[e.red/e.count,e.green/e.count,e.blue/e.count]})).sort((e,t)=>t.count-e.count).slice(0,wt),r=[];for(let e of n){let t=r.find(t=>fe(t.rgb,e.rgb)<Tt);if(!t){r.push({count:e.count,rgb:[...e.rgb]});continue}let n=t.count+e.count;t.rgb=[(t.rgb[0]*t.count+e.rgb[0]*e.count)/n,(t.rgb[1]*t.count+e.rgb[1]*e.count)/n,(t.rgb[2]*t.count+e.rgb[2]*e.count)/n],t.count=n}r.sort((e,t)=>t.count-e.count);let i=r.slice(0,Et).map(e=>de(e.rgb[0],e.rgb[1],e.rgb[2]));for(;i.length<Et;){let e=ue(i.at(-1)||`#8c8a85`),t=.72+i.length*.07;i.push(de(e[0]*t,e[1]*t,e[2]*t))}return i}var jt=new Set([`dng`,`cr2`,`cr3`,`crw`,`nef`,`nrw`,`arw`,`srf`,`sr2`,`raf`,`orf`,`rw2`,`pef`,`srw`,`3fr`,`fff`,`iiq`,`mos`]);function Mt(e){let t=e.name.split(`.`).pop()?.toLowerCase()||``;return jt.has(t)?`RAW`:t===`png`||e.type===`image/png`?`PNG`:t===`webp`||e.type===`image/webp`?`WEBP`:[`jpg`,`jpeg`].includes(t)||e.type===`image/jpeg`?`JPG`:null}async function Nt(e){let t=Mt(e);if(!t)throw Error(`${e.name}: formato no compatible.`);if(t===`RAW`)throw Error(`${e.name}: los RAW necesitan un proxy JPG para verse en el navegador.`);let n=await createImageBitmap(e);try{return{width:n.width,height:n.height,format:t,bytes:e.size,palette:kt(n)}}finally{n.close?.()}}var Pt=26214400,F=null,I=null,Ft=!1,L=0;function It(){return F||=document.getElementById(`upload-dialog`),F}function Lt(){let e=b();return e.folders.some(t=>t.id===e.activeFolder)?e.activeFolder:`inbox`}function Rt(){return F?.querySelector(`#upload-folder`)?.value||Lt()}function zt(){let e=b(),t=Lt(),n=e.folders.map(e=>`
        <option value="${p(e.id)}" ${e.id===t?`selected`:``}>
          ${p(e.name)}
        </option>
      `).join(``);F.innerHTML=`
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
  `,I=F.querySelector(`#upload-file-input`);let r=F.querySelector(`#upload-dropzone`);r.addEventListener(`dragover`,e=>{e.preventDefault(),e.stopPropagation(),r.classList.add(`is-dragover`)}),r.addEventListener(`dragleave`,()=>{r.classList.remove(`is-dragover`)}),r.addEventListener(`drop`,e=>{e.preventDefault(),e.stopPropagation(),r.classList.remove(`is-dragover`),L=0;let t=document.getElementById(`drop-overlay`);t&&(t.hidden=!0);let n=[...e.dataTransfer.files];n.length>0&&Bt(n,Rt())}),I.addEventListener(`change`,()=>{let e=[...I.files];e.length>0&&Bt(e,Rt()),I.value=``})}async function Bt(e,t){if(Ft)return;Ft=!0;let n=[],r=[];for(let i of e){if(i.size>Pt){r.push(`${i.name}: supera el límite de 25 MB.`);continue}let e=Mt(i);if(!e)r.push(`${i.name}: formato no compatible.`);else if(e===`RAW`)r.push(`${i.name}: los RAW necesitan un proxy JPG.`);else try{let e=await Nt(i),r=ie(),a=URL.createObjectURL(i),s={id:r,title:oe(i.name),description:``,src:a,format:e.format,width:e.width,height:e.height,bytes:i.size,folderId:t,favorite:!1,createdAt:new Date().toISOString(),origin:`upload`,palette:e.palette},{src:c,...l}=s;await o({id:r,blob:i,meta:l}).catch(()=>null),n.push(s)}catch(e){r.push(e.message||`${i.name}: no se pudo procesar.`)}}if(Ft=!1,n.length>0){Ke(n),Oe(),Te(t),ke(`recent`);let e=It();e.open&&e.close(),M(n.length===1?`Imagen añadida`:`${n.length} imágenes añadidas`)}r.length>0&&M(r[0],{type:`error`,icon:`info`})}function Vt(){F=document.getElementById(`upload-dialog`);let e=document.getElementById(`drop-overlay`);window.addEventListener(`dragenter`,t=>{t.dataTransfer?.types.includes(`Files`)&&(t.preventDefault(),L+=1,e&&(e.hidden=!1))}),window.addEventListener(`dragover`,e=>{e.dataTransfer?.types.includes(`Files`)&&e.preventDefault()}),window.addEventListener(`dragleave`,t=>{t.dataTransfer?.types.includes(`Files`)&&(L=Math.max(0,L-1),L===0&&e&&(e.hidden=!0))}),window.addEventListener(`drop`,t=>{if(!t.dataTransfer?.files?.length)return;t.preventDefault(),L=0,e&&(e.hidden=!0);let n=[...t.dataTransfer.files];n.length>0&&Bt(n,Lt())})}function Ht(){zt();let e=It();e.open||e.showModal()}function Ut(){I?.click()}var R=[],Wt=null;function Gt(){return Wt||=document.getElementById(`move-dialog`),Wt}function Kt(){let e=b(),t=Gt(),n=e.images.find(e=>e.id===R[0])?.folderId??e.folders[0]?.id,r=R.length,i=e.folders.map(t=>{let n=e.images.filter(e=>e.folderId===t.id).length;return`
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
  `;let a=t.querySelector(`input[name="target-folder"][value="${CSS.escape(n)}"]`);a&&(a.checked=!0),t.querySelector(`#move-form`)?.addEventListener(`submit`,n=>{n.preventDefault();let r=t.querySelector(`input[name="target-folder"]:checked`);if(!r)return;let i=e.folders.find(e=>e.id===r.value),a=R.length;Ie(R,r.value),t.close(),M(a===1?`Imagen movida a ${i?.name??`la carpeta`}`:`${a} imágenes movidas a ${i?.name??`la carpeta`}`)})}function qt(e){if(R=[...new Set(e)],R.length===0)return;Kt();let t=Gt();t.open||t.showModal()}var Jt=null,z=null;function Yt(){return Jt||=document.getElementById(`rename-dialog`),Jt}function Xt(){return z?.type===`folder`?{eyebrow:`Organizar`,title:`Renombrar carpeta`,sub:`Actualiza el nombre con el que se muestra la carpeta en la biblioteca.`,field:`Nombre de la carpeta`,hint:`El nuevo nombre se usará también en la ficha técnica de sus imágenes.`}:{eyebrow:`Editar`,title:`Cambiar nombre`,sub:`Actualiza el nombre con el que se muestra la imagen en la biblioteca.`,field:`Nombre de la imagen`,hint:`El nuevo nombre se usará también en la ficha técnica y en las presentaciones exportadas.`}}function Zt(){let e=b();return z?.type===`folder`?e.folders.find(e=>e.id===z.id)?.name??``:e.images.find(e=>e.id===z.id)?.title??``}function Qt(){let e=b();return z?z.type===`folder`?e.folders.some(e=>e.id===z.id):e.images.some(e=>e.id===z.id):!1}function $t(){if(!Qt())return;let e=Xt(),t=Yt();t.innerHTML=`
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
            value="${p(Zt())}"
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
  `;let n=t.querySelector(`#rename-form`),r=t.querySelector(`[data-rename-input]`);r&&(r.focus(),r.select()),n?.addEventListener(`submit`,e=>{e.preventDefault();let n=r?.value.trim()??``;n?(z.type===`folder`?M(Ve(z.id,n)?`Carpeta “${n}” renombrada`:`No se pudo renombrar la carpeta`):(ze(z.id,n),M(`Nombre actualizado`)),t.close()):r?.focus()})}function en(e){if(!b().images.some(t=>t.id===e))return;z={type:`image`,id:e},$t();let t=Yt();t.open||t.showModal()}function tn(e){if(!b().folders.some(t=>t.id===e))return;z={type:`folder`,id:e},$t();let t=Yt();t.open||t.showModal()}var nn=null,B=[],V=0,H=null;function U(){return nn||=document.getElementById(`lightbox`),nn}function rn(){return b().images.find(e=>e.id===B[V])??null}function an(e){return B.map((t,n)=>{let r=e.images.find(e=>e.id===t);return r?`
        <button
          class="lightbox__thumb${n===V?` is-active`:``}"
          type="button"
          data-action="lightbox-go"
          data-index="${n}"
          aria-label="Ver ${p(r.title)}"
          data-tooltip="${p(r.title)}"
          ${n===V?`aria-current="true"`:``}
        >
          <img src="${p(r.src)}" alt="" loading="lazy" />
        </button>
      `:``}).join(``)}function on(e){let t=U();t.innerHTML=`
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
        ${an(e)}
      </div>
    </div>
  `,t.onclick=e=>{e.target===t&&t.close()},t.onkeydown=e=>{e.key===`ArrowLeft`?(e.preventDefault(),W(-1)):e.key===`ArrowRight`&&(e.preventDefault(),W(1))};let n=t.querySelector(`#lightbox-stage`);n.addEventListener(`pointerdown`,e=>{e.target.closest(`button`)||(H=e.clientX)}),n.addEventListener(`pointerup`,e=>{if(H===null)return;let t=e.clientX-H;H=null,Math.abs(t)<50||W(t>0?-1:1)}),n.addEventListener(`pointercancel`,()=>{H=null})}function sn(){let e=U(),t=b(),n=rn();if(!n)return;let r=e.querySelector(`#lightbox-image`),i=e.querySelector(`#lightbox-counter`),a=e.querySelector(`#lightbox-title`),o=e.querySelector(`#lightbox-meta`),s=e.querySelector(`#lightbox-palette`),c=e.querySelector(`#lightbox-fav`),l=e.querySelector(`#lightbox-download`),u=e.querySelector(`#lightbox-rename`),d=e.querySelector(`#lightbox-delete`),f=e.querySelector(`#lightbox-filmstrip`);i.textContent=ne(V,B.length),a.textContent=n.title,r.getAttribute(`src`)===n.src?r.classList.remove(`is-loading`):(r.classList.add(`is-loading`),r.src=n.src),r.onload=()=>r.classList.remove(`is-loading`),r.onerror=()=>r.classList.remove(`is-loading`),r.alt=n.title,o.innerHTML=`
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
      `).join(``),c.classList.toggle(`is-fav`,!!n.favorite),c.setAttribute(`aria-pressed`,String(!!n.favorite)),c.setAttribute(`aria-label`,n.favorite?`Quitar de favoritos`:`Añadir a favoritos`),c.setAttribute(`data-tooltip`,n.favorite?`Quitar de favoritos`:`Añadir a favoritos`),l.dataset.id=n.id,l.setAttribute(`aria-label`,`Descargar ${n.title}`),u&&(u.dataset.id=n.id,u.setAttribute(`aria-label`,`Cambiar el nombre de ${n.title}`)),d&&(d.dataset.id=n.id,d.setAttribute(`aria-label`,`Eliminar ${n.title}`)),f&&(f.querySelectorAll(`[data-action="lightbox-go"]`).forEach(e=>{let t=Number(e.dataset.index)===V;e.classList.toggle(`is-active`,t),t?e.setAttribute(`aria-current`,`true`):e.removeAttribute(`aria-current`)}),f.querySelector(`.lightbox__thumb.is-active`)?.scrollIntoView({block:`nearest`,inline:`center`})),t.images.findIndex(e=>e.id===n.id);let ee=[B[(V+1)%B.length],B[(V-1+B.length)%B.length]];for(let e of ee){let n=t.images.find(t=>t.id===e);if(n){let e=new Image;e.src=n.src}}}function W(e){if(B.length===0)return;V=(V+e+B.length)%B.length;let t=B[V];sn(),Ae(t)}function cn(e){if(e<0||e>=B.length)return;V=e;let t=B[V];sn(),Ae(t)}function ln(e){let t=b(),n=C(t),r=n.length>0?n:t.images,i=r.findIndex(t=>t.id===e);if(i===-1&&(r=t.images,i=r.findIndex(t=>t.id===e)),i===-1)return;B=r.map(e=>e.id),V=i;let a=U();on(t),a.open||a.showModal(),sn(),Ae(e),a.querySelector(`[data-action="lightbox-close"]`)?.focus()}function G(){let e=U();e?.open&&e.close()}function K(){return!!U()?.open}function un(){if(!K())return;let e=U(),t=rn();if(!e||!t)return;let n=e.querySelector(`#lightbox-title`);n&&(n.textContent=t.title);let r=e.querySelector(`#lightbox-image`);r&&(r.alt=t.title);let i=e.querySelector(`#lightbox-fav`);i?.classList.toggle(`is-fav`,!!t.favorite),i?.setAttribute(`aria-pressed`,String(!!t.favorite)),e.querySelector(`#lightbox-download`)?.setAttribute(`aria-label`,`Descargar ${t.title}`),e.querySelector(`#lightbox-rename`)?.setAttribute(`aria-label`,`Cambiar el nombre de ${t.title}`),e.querySelector(`#lightbox-delete`)?.setAttribute(`aria-label`,`Eliminar ${t.title}`);let a=e.querySelector(`#lightbox-palette`);a&&(a.innerHTML=(t.palette??[]).map(e=>`
          <button
            class="lightbox__swatch"
            type="button"
            data-action="copy-hex"
            data-hex="${p(e)}"
            style="--hex: ${p(e)}"
            aria-label="Copiar el color ${p(e)}"
            data-tooltip="Copiar ${p(e)}"
          ></button>
        `).join(``))}function dn(){let e=rn();if(!e)return;let t=Pe(e.id);un(),M(t?`Añadida a favoritos`:`Quitada de favoritos`)}function fn(e){W(e)}function pn(e){cn(e)}var mn=null,q=null;function hn(){return mn||=document.getElementById(`confirm-dialog`),mn}function J({title:e,message:t,confirmLabel:n=`Confirmar`,cancelLabel:r=`Cancelar`,danger:i=!1}={}){let a=hn();return a?(q&&=(q(!1),null),a.open&&a.close(),a.innerHTML=`
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
  `,a.returnValue=``,a.showModal(),new Promise(e=>{q=e,a.addEventListener(`close`,()=>{let t=a.returnValue===`confirm`;q=null,e(t)},{once:!0})})):Promise.resolve(!1)}var gn=null;function _n(){return gn||=document.getElementById(`settings-dialog`),gn}function vn(){let e=_n();if(!e||e.dataset.ready)return;let{columns:t,gap:n,showMeta:r}=b().view;e.innerHTML=`
    <div class="dialog__form">
      <header class="dialog__head">
        <div>
          <p class="eyebrow">Preferencias</p>
          <h2 class="dialog__title" id="settings-title">Ajustes de vista</h2>
          <p class="dialog__sub">Controla cómo se muestran las imágenes en la biblioteca.</p>
        </div>
        <button
          class="icon-btn icon-btn--bare"
          type="button"
          data-action="close-dialog"
          data-dialog="settings-dialog"
          aria-label="Cerrar"
          data-tooltip="Cerrar"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-close"></use></svg>
        </button>
      </header>

      <div class="dialog__body">
        <div class="settings__range">
          <label for="settings-columns">
            <span>Columnas</span>
            <output for="settings-columns" data-output="columns">${t} × ${t}</output>
          </label>
          <input
            id="settings-columns"
            type="range"
            min="3"
            max="8"
            step="1"
            value="${t}"
            data-view-columns
            data-focus-key="settings-columns"
          />
        </div>

        <div class="settings__range">
          <label for="settings-gap">
            <span>Separación</span>
            <output for="settings-gap" data-output="gap">${n} px</output>
          </label>
          <input
            id="settings-gap"
            type="range"
            min="0"
            max="48"
            step="2"
            value="${n}"
            data-view-gap
            data-focus-key="settings-gap"
          />
        </div>

        <label class="settings__toggle">
          <input
            type="checkbox"
            data-view-meta
            data-focus-key="settings-meta"
            ${r?`checked`:``}
          />
          <span>
            <strong>Mostrar nombre, datos y formato de imagen</strong>
            <small>En cada tarjeta aparecerá el título, las dimensiones, el peso y el formato.</small>
          </span>
        </label>
      </div>

      <footer class="dialog__foot">
        <button
          class="btn btn--primary"
          type="button"
          data-action="close-dialog"
          data-dialog="settings-dialog"
        >
          <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
          Listo
        </button>
      </footer>
    </div>
  `,e.dataset.ready=`true`}function yn(){vn();let e=_n();e&&!e.open&&e.showModal()}var bn=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t+=1){let n=t;for(let e=0;e<8;e+=1)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function xn(e){let t=4294967295;for(let n=0;n<e.length;n+=1)t=bn[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}function Sn(e=new Date){let t=Math.max(1980,e.getFullYear());return{time:e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2),date:t-1980<<9|e.getMonth()+1<<5|e.getDate()}}function Y(e,t,n){e.setUint32(t,n>>>0,!0)}function X(e,t,n){e.setUint16(t,n&65535,!0)}function Cn(e){let t=new TextEncoder,{time:n,date:r}=Sn(),i=e.map(e=>{let n=e.data instanceof Uint8Array?e.data:new Uint8Array(e.data);return{name:t.encode(e.name),data:n,crc:xn(n)}}),a=0,o=[],s=[],c=0;for(let e of i){let t=new Uint8Array(30+e.name.length+e.data.length),i=new DataView(t.buffer);Y(i,0,67324752),X(i,4,20),X(i,6,2048),X(i,8,0),X(i,10,n),X(i,12,r),Y(i,14,e.crc),Y(i,18,e.data.length),Y(i,22,e.data.length),X(i,26,e.name.length),X(i,28,0),t.set(e.name,30),t.set(e.data,30+e.name.length);let l=new Uint8Array(46+e.name.length),u=new DataView(l.buffer);Y(u,0,33639248),X(u,4,20),X(u,6,20),X(u,8,2048),X(u,10,0),X(u,12,n),X(u,14,r),Y(u,16,e.crc),Y(u,20,e.data.length),Y(u,24,e.data.length),X(u,28,e.name.length),X(u,30,0),X(u,32,0),X(u,34,0),X(u,36,0),Y(u,38,0),Y(u,42,a),l.set(e.name,46),o.push(t),s.push(l),a+=t.length,c+=l.length}let l=new Uint8Array(22),u=new DataView(l.buffer);return Y(u,0,101010256),X(u,4,0),X(u,6,0),X(u,8,i.length),X(u,10,i.length),Y(u,12,c),Y(u,16,a),X(u,20,0),new Blob([...o,...s,l],{type:`application/zip`})}var wn=4,Tn=!1;function En(e){let t=String(e.format??``).toUpperCase();return t===`PNG`?`png`:t===`WEBP`?`webp`:t===`JPEG`||t===`JPG`?`jpg`:se(e.src)}function Dn(e,t){return String(e).replace(/[\\/:*?"<>|]+/g,`-`).replace(/\s+/g,` `).trim()||t}async function On(e){let t=await fetch(e.src);if(!t.ok)throw Error(`HTTP ${t.status}`);return new Uint8Array(await t.arrayBuffer())}async function kn(e,t){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,r.rel=`noopener`,document.body.append(r),r.click(),r.remove(),window.setTimeout(()=>URL.revokeObjectURL(n),4e3)}async function An(){if(Tn)return;let e=b(),t=be(e);if(t.length===0){M(`Esta vista no contiene imágenes para exportar`,{type:`error`,icon:`info`});return}Tn=!0;let n=document.querySelector(`[data-action="download-collection"]`);n&&(n.disabled=!0,n.setAttribute(`aria-busy`,`true`));let r=Dn(S(e.activeFolder),`Colección`),i=new Map(t.map((e,t)=>[e.id,t])),a=[...t],o=[],s=[];try{let e=async()=>{for(;a.length>0;){let e=a.shift();try{o.push({image:e,data:await On(e)})}catch{s.push(e)}}};if(await Promise.all(Array.from({length:Math.min(wn,a.length)},()=>e())),o.sort((e,t)=>i.get(e.image.id)-i.get(t.image.id)),o.length===0)throw Error(`No image could be read`);let n=new Set;await kn(Cn(o.map(({image:e,data:t})=>{let i=g(e.title)||`imagen`,a=En(e),o=`${i}.${a}`,s=2;for(;n.has(o.toLowerCase());)o=`${i}-${s}.${a}`,s+=1;return n.add(o.toLowerCase()),{name:`${r}/${o}`,data:t}})),`${g(r)||`coleccion`}.zip`),M(s.length>0?`${o.length} de ${t.length} imágenes exportadas`:o.length===1?`${r}.zip descargado`:`${r}.zip descargado con ${o.length} imágenes`),s.length>0&&M(`Algunas imágenes no se pudieron leer`,{type:`error`,icon:`info`})}catch{M(`No se pudo exportar la colección`,{type:`error`,icon:`info`})}finally{Tn=!1,n?.isConnected&&(n.disabled=!1,n.removeAttribute(`aria-busy`))}}var Z=document.getElementById(`app`),jn=document.getElementById(`sidebar`),Q=document.getElementById(`topbar`),Mn=document.getElementById(`toolbar`),Nn=document.getElementById(`gallery-region`),$=document.getElementById(`inspector`),Pn=document.getElementById(`bulk-bar`),Fn=document.getElementById(`scrim`),In=0,Ln=0;function Rn(){let e=document.activeElement;return!e||!e.dataset?.focusKey?null:{key:e.dataset.focusKey,start:e.selectionStart,end:e.selectionEnd}}function zn(e){if(!e)return;let t=document.querySelector(`[data-focus-key="${CSS.escape(e.key)}"]`);if(t&&(t.focus({preventScroll:!0}),typeof e.start==`number`&&typeof t.setSelectionRange==`function`))try{t.setSelectionRange(e.start,e.end)}catch{}}function Bn(e){let t=window.matchMedia(`(max-width: 1200px)`).matches,n=window.matchMedia(`(max-width: 1024px)`).matches;Z.classList.toggle(`is-sidebar-open`,e.sidebarOpen),Z.classList.toggle(`is-sidebar-collapsed`,!n&&e.sidebarCollapsed),Z.classList.toggle(`is-inspector-open`,t?e.inspectorDrawer:e.inspectorOpen);let r=n&&e.sidebarOpen||t&&e.inspectorDrawer;Fn.hidden=!r,Fn.classList.toggle(`is-visible`,r);let i=Q.querySelector(`[data-action="toggle-sidebar"]`);if(i){let t=n?e.sidebarOpen:!e.sidebarCollapsed;i.setAttribute(`aria-expanded`,String(t)),i.setAttribute(`data-tooltip`,t?`Ocultar el menú`:`Mostrar el menú`),i.setAttribute(`aria-label`,n?t?`Cerrar menú de navegación`:`Abrir menú de navegación`:t?`Ocultar menú de navegación`:`Mostrar menú de navegación`)}let a=Q.querySelector(`[data-action="toggle-inspector"]`);if(a){let n=t?e.inspectorDrawer:e.inspectorOpen;a.setAttribute(`aria-expanded`,String(n)),a.setAttribute(`data-tooltip`,n?`Ocultar ficha técnica`:`Mostrar ficha técnica`),a.setAttribute(`aria-label`,n?`Ocultar ficha técnica`:`Mostrar ficha técnica`)}}function Vn(e){let t=Q.querySelector(`.topbar__sub`);t&&(t.textContent=ot(e))}function Hn(e){let t=Q.querySelector(`[data-search]`);t&&t.value!==e.filters.query&&(t.value=e.filters.query)}function Un(e){let t=document.querySelector(`[data-sort-select]`);t&&t.value!==e.sort&&(t.value=e.sort)}function Wn(e=`update`){let t=Rn(),n=b();e===`init`||e===`folder`||e===`folder-delete`||e===`move`||e===`upload`||e===`delete`||e===`favorite`||e===`update`?(at(jn),st(Q),k(Mn),A(Nn,{animate:e===`init`}),j($),vt(Pn),ct(),un(),(e===`folder`||e===`upload`)&&window.scrollTo({top:0,behavior:`smooth`})):e===`filters`?(Vn(n),Hn(n),at(jn),k(Mn),A(Nn),j($),vt(Pn)):e===`selection`?(pt(),mt(),k(Mn),j($),vt(Pn)):e===`active`?(mt(),j($)):e===`palettes`?(ht(),j($),un()):e===`sort`||e===`reorder`?(A(Nn),Un(n)):e===`view`?(k(Mn),A(Nn),ct()):e===`view-style`?(ft(),ct()):e===`folder-create`&&at(jn),Bn(n),zn(t)}function Gn(){let e=b(),t=C(e);t.length>0&&t.every(t=>e.selectedIds.includes(t.id))?Ne():Me(t.map(e=>e.id))}function Kn(){let e=we();if(e.length===0)return;let t=e.every(e=>e.favorite);Fe(e.map(e=>e.id),!t),M(t?`Selección quitada de favoritos`:`Selección añadida a favoritos`)}function qn(e){M(Pe(e)?`Añadida a favoritos`:`Quitada de favoritos`)}function Jn(e){let t=b().images.find(t=>t.id===e);t&&(pe(t),M(t.format===`RAW`?`Descargando proxy JPG`:`Descarga iniciada`))}async function Yn(e){if(!e)return;let t=await ce(e);M(t?`${e} copiado`:`No se pudo copiar el color`,{type:t?`info`:`error`,icon:t?`copy`:`info`})}async function Xn(e){let t=b().images.find(t=>t.id===e);if(!t?.palette?.length)return;let n=await ce(t.palette.join(`, `));M(n?`Paleta copiada`:`No se pudo copiar la paleta`,{type:n?`info`:`error`,icon:n?`copy`:`info`})}function Zn(e){let t=document.getElementById(e);t?.open&&t.close()}function Qn(e){Ye(),ln(e)}function $n(){let e=jn.querySelector(`.sidebar__folders`);if(!e||e.querySelector(`.folder-create`))return;let t=document.createElement(`form`);t.className=`folder-create`,t.innerHTML=`
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
  `,e.append(t);let n=t.querySelector(`input`);n.focus(),t.addEventListener(`submit`,e=>{e.preventDefault();let t=n.value.trim();if(!t){n.focus();return}let r=We(t);M(`Carpeta “${t}” creada`),r&&window.requestAnimationFrame(()=>{document.querySelector(`[data-focus-key="folder-${CSS.escape(r)}"]`)?.focus()})}),t.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.stopPropagation(),t.remove())})}function er(){document.addEventListener(`click`,async e=>{e.target.closest(`.sidebar__summary`)&&Z.classList.contains(`is-sidebar-collapsed`)&&!window.matchMedia(`(max-width: 1024px)`).matches&&qe(!1);let t=e.target.closest(`[data-action]`);if(t)switch(t.dataset.action){case`folder`:Te(t.dataset.folder);break;case`toggle-sidebar`:{let e=b();window.matchMedia(`(max-width: 1024px)`).matches?(e.sidebarOpen||D(!1),E(!e.sidebarOpen)):qe(!e.sidebarCollapsed);break}case`close-sidebar`:E(!1);break;case`toggle-inspector`:{let e=b();window.matchMedia(`(max-width: 1200px)`).matches?(e.inspectorDrawer||E(!1),D(!e.inspectorDrawer)):Je(!e.inspectorOpen);break}case`close-inspector`:window.matchMedia(`(max-width: 1200px)`).matches?D(!1):Je(!1);break;case`new-folder`:$n();break;case`open-upload`:Ht();break;case`pick-files`:Ut();break;case`download-collection`:await An();break;case`open-settings`:yn();break;case`open-move`:qt([t.dataset.id]);break;case`rename-image`:en(t.dataset.id);break;case`rename-folder`:tn(t.dataset.folder);break;case`view-layout`:T({layout:t.dataset.layout===`list`?`list`:`grid`},`view`);break;case`bulk-move`:qt(b().selectedIds);break;case`bulk-favorite`:Kn();break;case`bulk-delete`:{let e=b().selectedIds;if(e.length===0||!await J({title:`Eliminar selección`,message:`Se eliminarán ${e.length} ${e.length===1?`imagen`:`imágenes`} de la biblioteca. Esta acción no se puede deshacer.`,confirmLabel:`Eliminar`,danger:!0}))break;K()&&G();let t=Le(e);M(t===1?`Imagen eliminada`:`${t} imágenes eliminadas`);break}case`bulk-clear`:Ne();break;case`select-all`:Gn();break;case`clear-filters`:Oe();break;case`delete-image`:{let e=b().images.find(e=>e.id===t.dataset.id);if(!e||!await J({title:`Eliminar imagen`,message:`Se eliminará “${e.title}” de la biblioteca. Esta acción no se puede deshacer.`,confirmLabel:`Eliminar`,danger:!0}))break;K()&&G(),Re(e.id),M(`Imagen eliminada`);break}case`delete-all-images`:{let e=b();if(e.images.length===0||!await J({title:`Eliminar todas las imágenes`,message:`Se eliminarán las ${e.images.length} imágenes de la biblioteca. Esta acción no se puede deshacer.`,confirmLabel:`Eliminar todas`,danger:!0}))break;K()&&G();let t=Be();M(t===1?`Imagen eliminada`:`${t} imágenes eliminadas`);break}case`delete-folder`:{let e=x(t.dataset.folder);if(!e||!await J({title:`Eliminar carpeta`,message:`Se eliminará la carpeta “${e.name}”. Las imágenes que contenga se moverán a “Sin clasificar”.`,confirmLabel:`Eliminar carpeta`,danger:!0}))break;He(e.id)&&M(`Carpeta “${e.name}” eliminada`);break}case`toggle-tag`:De(t.dataset.tag);break;case`open-image`:Qn(t.dataset.id);break;case`favorite`:qn(t.dataset.id);break;case`download`:Jn(t.dataset.id);break;case`copy-hex`:await Yn(t.dataset.hex);break;case`copy-palette`:await Xn(t.dataset.id);break;case`close-dialog`:Zn(t.dataset.dialog);break;case`lightbox-close`:G();break;case`lightbox-prev`:fn(-1);break;case`lightbox-next`:fn(1);break;case`lightbox-favorite`:dn();break;case`lightbox-go`:pn(Number(t.dataset.index))}}),document.addEventListener(`change`,e=>{let t=e.target.closest(`input[data-select]`);if(t){je(t.dataset.select,t.checked);return}let n=e.target.closest(`[data-view-meta]`);if(n){T({showMeta:n.checked},`view-style`);return}let r=e.target.closest(`[data-sort-select]`);r&&ke(r.value)}),document.addEventListener(`input`,e=>{let t=e.target.closest(`[data-view-columns]`);if(t){T({columns:Number(t.value)},`view-style`);return}let n=e.target.closest(`[data-view-gap]`);if(n){T({gap:Number(n.value)},`view-style`);return}let r=e.target.closest(`[data-search]`);if(!r)return;window.clearTimeout(In);let i=r.value;In=window.setTimeout(()=>Ee(i),130)}),document.addEventListener(`search`,e=>{e.target.matches(`[data-search]`)&&Ee(e.target.value)}),document.addEventListener(`keydown`,e=>{let t=e.target.closest(`input, textarea, select, [contenteditable="true"]`),n=!!document.querySelector(`dialog[open]`);!t&&!n&&(e.key===`/`||(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`k`)?(e.preventDefault(),Q.querySelector(`[data-search]`)?.focus()):e.key===`Escape`&&!n&&Ye()}),Fn.addEventListener(`click`,Ye);for(let e of[`move-dialog`,`rename-dialog`,`upload-dialog`,`confirm-dialog`,`settings-dialog`]){let t=document.getElementById(e);t?.addEventListener(`click`,e=>{e.target===t&&t.close()})}window.addEventListener(`resize`,()=>{window.clearTimeout(Ln),Ln=window.setTimeout(()=>{window.innerWidth>1200&&D(!1),window.innerWidth>1024&&E(!1),Bn(b())},120)})}async function tr(){let e=b().images.filter(e=>!e.palette);if(e.length===0)return;let t={},n=[...e],r=async()=>{for(;n.length>0;){let e=n.shift();if(e)try{t[e.id]=await Dt(e.src)}catch{}}};await Promise.all(Array.from({length:Math.min(4,n.length)},()=>r())),Object.keys(t).length>0&&Ge(t)}async function nr(){Ct(),Vt(),vn(),er();try{await Xe()}catch(e){console.error(e),Wn(`init`),M(`No se pudo cargar la biblioteca guardada.`,{type:`error`,icon:`info`})}tr()}ve((e,t)=>Wn(t)),nr();
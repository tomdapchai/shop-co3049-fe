(()=>{var e={};e.id=9026,e.ids=[9026],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},22621:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>c,pages:()=>p,routeModule:()=>u,tree:()=>d});var s=r(70260),i=r(28203),a=r(25155),o=r.n(a),n=r(67292),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["admin",{children:["(main)",{children:["images",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,47252)),"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\images\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,9540)),"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\layout.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,19611)),"W:\\web\\shop-co3049-fe\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],p=["W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\images\\page.tsx"],c={require:r,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/admin/(main)/images/page",pathname:"/admin/images",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},90417:(e,t,r)=>{Promise.resolve().then(r.bind(r,47252))},6097:(e,t,r)=>{Promise.resolve().then(r.bind(r,79353))},79353:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var s=r(45512),i=r(58009),a=r(89850),o=r(45103),n=r(87021),l=r(1422);function d({initialImages:e}){let[t,r]=(0,i.useState)(e),d=async e=>{await (0,a.vS)(e).then(t=>{if("error"in t){console.log(t.error);return}r(t=>t.filter(t=>t.imageId!==e))})};return(0,s.jsx)("div",{className:"container mx-auto px-4 py-8",children:(0,s.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",children:t.map(e=>(0,s.jsxs)("div",{className:"relative group aspect-video",children:[(0,s.jsx)(o.default,{src:e.src,alt:e.imageId,fill:!0,className:"object-cover rounded-lg"}),(0,s.jsx)("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-lg",children:(0,s.jsxs)(n.$,{variant:"destructive",size:"sm",onClick:()=>d(e.imageId),className:"flex items-center gap-2",children:[(0,s.jsx)(l.A,{className:"w-4 h-4"}),"Delete Image"]})})]},e.imageId))})})}let p=()=>{let[e,t]=(0,i.useState)([]),[r,o]=(0,i.useState)(!0);return((0,i.useEffect)(()=>{(0,a.Uj)().then(e=>{if("error"in e){console.log(e.error);return}t(e),o(!1)})},[]),r)?(0,s.jsx)("div",{children:"Loading..."}):(0,s.jsxs)("div",{className:"w-full",children:[(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start space-y-4 p-4",children:[(0,s.jsx)("h1",{className:"text-2xl font-semibold",children:"All Images"}),(0,s.jsxs)("p",{className:"text-muted-foreground text-lg",children:["Showing ",e.length," images"]})]}),(0,s.jsx)(d,{initialImages:e})]})}},47252:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"W:\\\\web\\\\shop-co3049-fe\\\\app\\\\admin\\\\(main)\\\\images\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\images\\page.tsx","default")},1422:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});let s=(0,r(94825).A)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,9798,7180,4388,5103,9749,6107,72],()=>r(22621));module.exports=s})();
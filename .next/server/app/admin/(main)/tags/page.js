(()=>{var e={};e.id=8497,e.ids=[8497],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},53517:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d});var s=a(70260),r=a(28203),o=a(25155),n=a.n(o),i=a(67292),l={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);a.d(t,l);let d=["",{children:["admin",{children:["(main)",{children:["tags",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,30771)),"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\tags\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,9540)),"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\layout.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,19611)),"W:\\web\\shop-co3049-fe\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(a.t.bind(a,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(a.t.bind(a,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\tags\\page.tsx"],p={require:a,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:r.RouteKind.APP_PAGE,page:"/admin/(main)/tags/page",pathname:"/admin/tags",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},60240:(e,t,a)=>{Promise.resolve().then(a.bind(a,30771))},53616:(e,t,a)=>{Promise.resolve().then(a.bind(a,41684))},41684:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>h});var s=a(45512),r=a(58009),o=a(46335);let n=(0,a(94825).A)("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);var i=a(1422),l=a(87021),d=a(25409),c=a(13393),p=a(71965),m=a(79828);let u=async e=>{try{let t=await m.A.post("api/tag/routes.php",{tagName:e});return console.log("Backend Response:",t.data),{message:t.data.message}}catch(e){return console.log("Error creating tag:",e),{error:"Error creating tag"}}},x=async(e,t)=>{try{let a=await m.A.put("api/tag/routes.php",{tagName:e,newTagName:t});return console.log("Backend Response:",a.data),{message:a.data.message}}catch(e){return console.log("Error updating tag:",e),{error:"Error updating tag"}}},f=async e=>{try{let t=await m.A.delete(`api/tag/routes.php?tagName=${e}`);return console.log("Backend Response:",t.data),{message:t.data.message}}catch(e){return console.log("Error deleting tag:",e),{error:"Error deleting tag"}}};function h(){let[e,t]=(0,r.useState)([]),[a,m]=(0,r.useState)(""),[h,g]=(0,r.useState)(null),[b,y]=(0,r.useState)(!0);if(b)return(0,s.jsx)("div",{children:"Loading..."});let N=async()=>{a.trim()&&(await u(a.trim()),t([...e,{tagName:a.trim()}]),m(""))},j=async()=>{h&&h.tagName.trim()&&(await x(h.tagName,h.tagName.trim()),t(e.map(e=>e.tagName===h.tagName?h:e)),g(null))},v=async a=>{await f(a),t(e.filter(e=>e.tagName!==a))};return(0,s.jsxs)("div",{className:"container mx-auto py-10",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold mb-5",children:"Tag Management"}),(0,s.jsxs)("div",{className:"flex mb-5",children:[(0,s.jsx)(d.p,{type:"text",placeholder:"New tag name",value:a,onChange:e=>m(e.target.value),className:"mr-2"}),(0,s.jsxs)(l.$,{onClick:N,children:[(0,s.jsx)(o.A,{className:"mr-2 h-4 w-4"})," Add Tag"]})]}),(0,s.jsxs)(c.XI,{children:[(0,s.jsx)(c.A0,{children:(0,s.jsxs)(c.Hj,{children:[(0,s.jsx)(c.nd,{children:"Tag Name"}),(0,s.jsx)(c.nd,{children:"Actions"})]})}),(0,s.jsx)(c.BF,{children:e.map(e=>(0,s.jsxs)(c.Hj,{children:[(0,s.jsx)(c.nA,{children:e.tagName}),(0,s.jsxs)(c.nA,{children:[(0,s.jsxs)(p.lG,{children:[(0,s.jsx)(p.zM,{asChild:!0,children:(0,s.jsx)(l.$,{variant:"outline",size:"icon",className:"mr-2",children:(0,s.jsx)(n,{className:"h-4 w-4"})})}),(0,s.jsxs)(p.Cf,{children:[(0,s.jsx)(p.c7,{children:(0,s.jsx)(p.L3,{children:"Edit Tag"})}),(0,s.jsx)(d.p,{type:"text",value:h?.tagName||"",onChange:e=>g({...h,tagName:e.target.value}),className:"my-4"}),(0,s.jsx)(l.$,{onClick:j,children:"Update Tag"})]})]}),(0,s.jsx)(l.$,{variant:"outline",size:"icon",onClick:()=>v(e.tagName),children:(0,s.jsx)(i.A,{className:"h-4 w-4"})})]})]},e.tagName))})]})]})}},71965:(e,t,a)=>{"use strict";a.d(t,{Cf:()=>m,L3:()=>x,c7:()=>u,lG:()=>l,rr:()=>f,zM:()=>d});var s=a(45512),r=a(58009),o=a(27553),n=a(51255),i=a(59462);let l=o.bL,d=o.l9,c=o.ZL;o.bm;let p=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)(o.hJ,{ref:a,className:(0,i.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...t}));p.displayName=o.hJ.displayName;let m=r.forwardRef(({className:e,children:t,...a},r)=>(0,s.jsxs)(c,{children:[(0,s.jsx)(p,{}),(0,s.jsxs)(o.UC,{ref:r,className:(0,i.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...a,children:[t,(0,s.jsxs)(o.bm,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,s.jsx)(n.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"sr-only",children:"Close"})]})]})]}));m.displayName=o.UC.displayName;let u=({className:e,...t})=>(0,s.jsx)("div",{className:(0,i.cn)("flex flex-col space-y-1.5 text-center sm:text-left",e),...t});u.displayName="DialogHeader";let x=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)(o.hE,{ref:a,className:(0,i.cn)("text-lg font-semibold leading-none tracking-tight",e),...t}));x.displayName=o.hE.displayName;let f=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)(o.VY,{ref:a,className:(0,i.cn)("text-sm text-muted-foreground",e),...t}));f.displayName=o.VY.displayName},13393:(e,t,a)=>{"use strict";a.d(t,{A0:()=>i,BF:()=>l,Hj:()=>d,XI:()=>n,nA:()=>p,nd:()=>c});var s=a(45512),r=a(58009),o=a(59462);let n=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("div",{className:"relative w-full overflow-auto",children:(0,s.jsx)("table",{ref:a,className:(0,o.cn)("w-full caption-bottom text-sm",e),...t})}));n.displayName="Table";let i=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("thead",{ref:a,className:(0,o.cn)("[&_tr]:border-b",e),...t}));i.displayName="TableHeader";let l=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("tbody",{ref:a,className:(0,o.cn)("[&_tr:last-child]:border-0",e),...t}));l.displayName="TableBody",r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("tfoot",{ref:a,className:(0,o.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",e),...t})).displayName="TableFooter";let d=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("tr",{ref:a,className:(0,o.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",e),...t}));d.displayName="TableRow";let c=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("th",{ref:a,className:(0,o.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...t}));c.displayName="TableHead";let p=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("td",{ref:a,className:(0,o.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...t}));p.displayName="TableCell",r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("caption",{ref:a,className:(0,o.cn)("mt-4 text-sm text-muted-foreground",e),...t})).displayName="TableCaption"},30771:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});let s=(0,a(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"W:\\\\web\\\\shop-co3049-fe\\\\app\\\\admin\\\\(main)\\\\tags\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\tags\\page.tsx","default")},46335:(e,t,a)=>{"use strict";a.d(t,{A:()=>s});let s=(0,a(94825).A)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},1422:(e,t,a)=>{"use strict";a.d(t,{A:()=>s});let s=(0,a(94825).A)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[638,9798,7180,4388,9749,6107,72],()=>a(53517));module.exports=s})();
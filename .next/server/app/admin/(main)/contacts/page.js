(()=>{var e={};e.id=8417,e.ids=[8417],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},1377:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,pages:()=>d,routeModule:()=>m,tree:()=>c});var s=a(70260),r=a(28203),n=a(25155),i=a.n(n),o=a(67292),l={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let c=["",{children:["admin",{children:["(main)",{children:["contacts",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,4303)),"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\contacts\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,9540)),"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\layout.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,19611)),"W:\\web\\shop-co3049-fe\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(a.t.bind(a,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(a.t.bind(a,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\contacts\\page.tsx"],p={require:a,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:r.RouteKind.APP_PAGE,page:"/admin/(main)/contacts/page",pathname:"/admin/contacts",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},6196:(e,t,a)=>{Promise.resolve().then(a.bind(a,4303))},58932:(e,t,a)=>{Promise.resolve().then(a.bind(a,13355))},13355:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d});var s=a(45512),r=a(58009),n=a(13393),i=a(25409),o=a(87021),l=a(71965),c=a(45610);function d(){let[e,t]=(0,r.useState)([]),[a,d]=(0,r.useState)(""),[p,m]=(0,r.useState)(1),[u,x]=(0,r.useState)(null),[h,f]=(0,r.useState)(!0);if(h)return(0,s.jsx)("div",{children:"Loading..."});let j=e.filter(e=>(e.name.toLowerCase()+e.email+e.message+e.phoneNumber+e.subject).includes(a.toLowerCase())),b=j.slice((p-1)*20,20*p),g=Math.ceil(j.length/20);return(0,s.jsxs)("div",{className:"container mx-auto py-10",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold mb-5",children:"Contact Management"}),(0,s.jsx)(i.p,{placeholder:"Search contacts",value:a,onChange:e=>d(e.target.value),className:"mb-4"}),(0,s.jsxs)("div",{children:[(0,s.jsxs)(n.XI,{children:[(0,s.jsx)(n.A0,{children:(0,s.jsxs)(n.Hj,{children:[(0,s.jsx)(n.nd,{children:"ID"}),(0,s.jsx)(n.nd,{children:"Name"}),(0,s.jsx)(n.nd,{children:"Email"}),(0,s.jsx)(n.nd,{children:"Subject"}),(0,s.jsx)(n.nd,{children:"Actions"})]})}),(0,s.jsx)(n.BF,{children:b.map(e=>(0,s.jsxs)(n.Hj,{children:[(0,s.jsx)(n.nA,{children:e.contactId}),(0,s.jsx)(n.nA,{children:e.name}),(0,s.jsx)(n.nA,{children:e.email}),(0,s.jsx)(n.nA,{children:e.subject}),(0,s.jsx)(n.nA,{children:(0,s.jsx)(o.$,{variant:"outline",onClick:()=>x(e),children:"View Details"})})]},e.contactId))})]}),(0,s.jsx)("div",{className:"flex items-center justify-end space-x-2 py-4",children:(0,s.jsx)(c.dK,{children:(0,s.jsxs)(c.Iu,{children:[(0,s.jsx)(c.cU,{children:(0,s.jsx)(c.Eb,{href:"#",onClick:e=>{e.preventDefault(),m(e=>Math.max(e-1,1))}})}),Array.from({length:g},(e,t)=>t+1).map(e=>(0,s.jsx)(c.cU,{children:(0,s.jsx)(c.n$,{href:"#",isActive:p===e,onClick:t=>{t.preventDefault(),m(e)},children:e})},e)),(0,s.jsx)(c.cU,{children:(0,s.jsx)(c.WA,{href:"#",onClick:e=>{e.preventDefault(),m(e=>Math.min(e+1,g))}})})]})})})]}),(0,s.jsx)(l.lG,{open:!!u,onOpenChange:()=>x(null),children:(0,s.jsxs)(l.Cf,{children:[(0,s.jsxs)(l.c7,{children:[(0,s.jsx)(l.L3,{children:"Contact Details"}),(0,s.jsx)(l.rr,{children:"Full information about the selected contact."})]}),u&&(0,s.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-semibold",children:"Name"}),(0,s.jsx)("p",{children:u.name})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-semibold",children:"Email"}),(0,s.jsx)("p",{children:u.email})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-semibold",children:"Phone Number"}),(0,s.jsx)("p",{children:u.phoneNumber||"N/A"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-semibold",children:"Subject"}),(0,s.jsx)("p",{children:u.subject||"N/A"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-semibold",children:"Message"}),(0,s.jsx)("p",{children:u.message})]})]})]})})]})}a(50921)},71965:(e,t,a)=>{"use strict";a.d(t,{Cf:()=>m,L3:()=>x,c7:()=>u,lG:()=>l,rr:()=>h,zM:()=>c});var s=a(45512),r=a(58009),n=a(27553),i=a(51255),o=a(59462);let l=n.bL,c=n.l9,d=n.ZL;n.bm;let p=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)(n.hJ,{ref:a,className:(0,o.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...t}));p.displayName=n.hJ.displayName;let m=r.forwardRef(({className:e,children:t,...a},r)=>(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{}),(0,s.jsxs)(n.UC,{ref:r,className:(0,o.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...a,children:[t,(0,s.jsxs)(n.bm,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,s.jsx)(i.A,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"sr-only",children:"Close"})]})]})]}));m.displayName=n.UC.displayName;let u=({className:e,...t})=>(0,s.jsx)("div",{className:(0,o.cn)("flex flex-col space-y-1.5 text-center sm:text-left",e),...t});u.displayName="DialogHeader";let x=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)(n.hE,{ref:a,className:(0,o.cn)("text-lg font-semibold leading-none tracking-tight",e),...t}));x.displayName=n.hE.displayName;let h=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)(n.VY,{ref:a,className:(0,o.cn)("text-sm text-muted-foreground",e),...t}));h.displayName=n.VY.displayName},45610:(e,t,a)=>{"use strict";a.d(t,{dK:()=>d,Iu:()=>p,cU:()=>m,n$:()=>u,WA:()=>h,Eb:()=>x});var s=a(45512),r=a(58009),n=a(94825);let i=(0,n.A)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);var o=a(86967);(0,n.A)("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);var l=a(59462),c=a(87021);let d=({className:e,...t})=>(0,s.jsx)("nav",{role:"navigation","aria-label":"pagination",className:(0,l.cn)("mx-auto flex w-full justify-center",e),...t});d.displayName="Pagination";let p=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("ul",{ref:a,className:(0,l.cn)("flex flex-row items-center gap-1",e),...t}));p.displayName="PaginationContent";let m=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("li",{ref:a,className:(0,l.cn)("",e),...t}));m.displayName="PaginationItem";let u=({className:e,isActive:t,size:a="icon",...r})=>(0,s.jsx)("a",{"aria-current":t?"page":void 0,className:(0,l.cn)((0,c.r)({variant:t?"outline":"ghost",size:a}),e),...r});u.displayName="PaginationLink";let x=({className:e,...t})=>(0,s.jsxs)(u,{"aria-label":"Go to previous page",size:"default",className:(0,l.cn)("gap-1 pl-2.5",e),...t,children:[(0,s.jsx)(i,{className:"h-4 w-4"}),(0,s.jsx)("span",{children:"Previous"})]});x.displayName="PaginationPrevious";let h=({className:e,...t})=>(0,s.jsxs)(u,{"aria-label":"Go to next page",size:"default",className:(0,l.cn)("gap-1 pr-2.5",e),...t,children:[(0,s.jsx)("span",{children:"Next"}),(0,s.jsx)(o.A,{className:"h-4 w-4"})]});h.displayName="PaginationNext"},13393:(e,t,a)=>{"use strict";a.d(t,{A0:()=>o,BF:()=>l,Hj:()=>c,XI:()=>i,nA:()=>p,nd:()=>d});var s=a(45512),r=a(58009),n=a(59462);let i=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("div",{className:"relative w-full overflow-auto",children:(0,s.jsx)("table",{ref:a,className:(0,n.cn)("w-full caption-bottom text-sm",e),...t})}));i.displayName="Table";let o=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("thead",{ref:a,className:(0,n.cn)("[&_tr]:border-b",e),...t}));o.displayName="TableHeader";let l=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("tbody",{ref:a,className:(0,n.cn)("[&_tr:last-child]:border-0",e),...t}));l.displayName="TableBody",r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("tfoot",{ref:a,className:(0,n.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",e),...t})).displayName="TableFooter";let c=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("tr",{ref:a,className:(0,n.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",e),...t}));c.displayName="TableRow";let d=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("th",{ref:a,className:(0,n.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...t}));d.displayName="TableHead";let p=r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("td",{ref:a,className:(0,n.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...t}));p.displayName="TableCell",r.forwardRef(({className:e,...t},a)=>(0,s.jsx)("caption",{ref:a,className:(0,n.cn)("mt-4 text-sm text-muted-foreground",e),...t})).displayName="TableCaption"},50921:(e,t,a)=>{"use strict";a.d(t,{vY:()=>n,zm:()=>r});var s=a(79828);let r=async()=>{try{let e=await s.A.get("api/contact/routes.php");console.log("Backend Response:",e.data);let t=[];return e.data.data.length>0&&(t=e.data.data.map(e=>({contactId:e.contactId,name:e.name,email:e.email,phoneNumber:e.phone_number,subject:e.subject,message:e.message}))),t}catch(e){return console.log("Error fetching contacts:",e),{error:"Error fetching contacts"}}},n=async e=>{try{let t=await s.A.post("api/contact/routes.php",e);return console.log("Backend Response:",t.data),{message:t.data.message}}catch(e){return console.log("Error creating contact:",e),{error:"Error creating contact"}}}},4303:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});let s=(0,a(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"W:\\\\web\\\\shop-co3049-fe\\\\app\\\\admin\\\\(main)\\\\contacts\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\contacts\\page.tsx","default")},86967:(e,t,a)=>{"use strict";a.d(t,{A:()=>s});let s=(0,a(94825).A)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[638,9798,7180,4388,9749,6107,72],()=>a(1377));module.exports=s})();
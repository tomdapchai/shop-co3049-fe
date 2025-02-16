(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9026],{17647:(e,t,r)=>{Promise.resolve().then(r.bind(r,99826))},46820:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=r(82651).A.create({baseURL:"http://localhost:5050",withCredentials:!0})},99826:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var a=r(95155),n=r(12115),o=r(34078),l=r(5565),s=r(14085),i=r(35524);function c(e){let{initialImages:t}=e,[r,c]=(0,n.useState)(t),d=async e=>{await (0,o.vS)(e).then(t=>{if("error"in t){console.log(t.error);return}c(t=>t.filter(t=>t.imageId!==e))})};return(0,a.jsx)("div",{className:"container mx-auto px-4 py-8",children:(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",children:r.map(e=>(0,a.jsxs)("div",{className:"relative group aspect-video",children:[(0,a.jsx)(l.default,{src:e.src,alt:e.imageId,fill:!0,className:"object-cover rounded-lg"}),(0,a.jsx)("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-lg",children:(0,a.jsxs)(s.$,{variant:"destructive",size:"sm",onClick:()=>d(e.imageId),className:"flex items-center gap-2",children:[(0,a.jsx)(i.A,{className:"w-4 h-4"}),"Delete Image"]})})]},e.imageId))})})}let d=()=>{let[e,t]=(0,n.useState)([]),[r,l]=(0,n.useState)(!0);return((0,n.useEffect)(()=>{(0,o.Uj)().then(e=>{if("error"in e){console.log(e.error);return}t(e),l(!1)})},[]),r)?(0,a.jsx)("div",{children:"Loading..."}):(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsxs)("div",{className:"flex flex-col justify-start items-start space-y-4 p-4",children:[(0,a.jsx)("h1",{className:"text-2xl font-semibold",children:"All Images"}),(0,a.jsxs)("p",{className:"text-muted-foreground text-lg",children:["Showing ",e.length," images"]})]}),(0,a.jsx)(c,{initialImages:e})]})}},14085:(e,t,r)=>{"use strict";r.d(t,{$:()=>c,r:()=>i});var a=r(95155),n=r(12115),o=r(12317),l=r(31027),s=r(29602);let i=(0,l.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),c=n.forwardRef((e,t)=>{let{className:r,variant:n,size:l,asChild:c=!1,...d}=e,g=c?o.DX:"button";return(0,a.jsx)(g,{className:(0,s.cn)(i({variant:n,size:l,className:r})),ref:t,...d})});c.displayName="Button"},29602:(e,t,r)=>{"use strict";r.d(t,{$g:()=>l,QH:()=>i,Vi:()=>u,Yq:()=>s,cV:()=>c,cn:()=>o,dw:()=>g,gI:()=>d,oE:()=>p});var a=r(43463),n=r(69795);function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.QP)((0,a.$)(t))}let l=e=>e.toLocaleString("en-US",{style:"currency",currency:"VND",currencyDisplay:"code"});function s(e){return new Intl.DateTimeFormat("vi-VN",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}).format(e)}function i(e){let t=e;for(let e of[{regex:/HEADLINE<([^>]+)>/g,replace:'<h1 class="text-2xl font-bold mb-4">$1</h1>'},{regex:/SECTION<([^>]+)>/g,replace:'<h2 class="text-lg font-bold mb-2">$1</h2>'},{regex:/LINK<([^,]+),\s*([^>]+)>/g,replace:'<a href="$2" class="text-black hover:text-slate-500 underline">$1</a>'},{regex:/IMG<([^,]+),\s*([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g,replace:(e,t,r,a,n)=>'<div class="w-full flex justify-center items-center">\n            <Image src="'.concat(r,'" alt="').concat(t,'" ').concat(a?'width="'.concat(a,'"'):""," ").concat(n?'height="'.concat(n,'"'):"",' class="rounded-lg" /></div>')},{regex:/P<([^>]+)>/g,replace:(e,t)=>{let r=t.split(/\n/).map(e=>e.trim()).join("<br/>");return'<p class="text-base text-black">'.concat(r,"</p>")}}])t=t.replace(e.regex,e.replace);return'<div class="w-full flex flex-col justify-center items-start">'.concat(t,"</div>")}let c=async e=>{let t=new FormData;t.append("file",e),t.append("upload_preset","yxg1dfzu");try{let e=await fetch("https://api.cloudinary.com/v1_1/".concat("dgwujcdba","/image/upload"),{method:"POST",body:t}),r=await e.json();if(r.secure_url)return r.secure_url;return console.error("Cloudinary error response:",r),{error:"Invalid response from Cloudinary"}}catch(e){return console.error("Upload error:",e),{error:"Upload error"}}};function d(e,t,r){let a=new Date;if("col"===r){let r=[];for(let n=t;n>=0;n--){let t=new Date(a);t.setDate(a.getDate()-n);let o=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),l=e.filter(e=>{let r=new Date(e.createdAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()});r.push({date:o,total:l.length})}return r}{let r={completed:0,pending:0,cancelled:0},n=new Date(a);return n.setDate(a.getDate()-t),e.forEach(e=>{let t=new Date(e.createdAt);t>=n&&t<=a&&(r[e.status]=(r[e.status]||0)+1)}),Object.entries(r).map(e=>{let[t,r]=e;return{status:t,total:r}})}}function g(e,t){let r=new Date,a=[];for(let n=t;n>=0;n--){let t=new Date(r);t.setDate(r.getDate()-n);let o=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),l=e.filter(e=>{let r=new Date(e.joinAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()});a.push({date:o,total:l.length})}return a}function u(e,t){let r=new Date,a=[];for(let n=t;n>=0;n--){let t=new Date(r);t.setDate(r.getDate()-n);let o=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),l=e.filter(e=>{let r=new Date(e.createdAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).reduce((e,t)=>e+("completed"===t.status?t.total:0),0);a.push({date:o,total:l/1e3})}return a}function p(e,t,r){let a=new Date,n=[];for(let o=r;o>=0;o--){let r=new Date(a);r.setDate(a.getDate()-o);let l=r.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),s=e.filter(e=>{let t=new Date(e.createdAt);return t.getDate()===r.getDate()&&t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}),i=t.filter(e=>{let t=new Date(e.joinAt);return t.getDate()===r.getDate()&&t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}),c=s.reduce((e,t)=>e+("completed"===t.status?t.total:0),0);n.push({date:l,totalOrder:s.length,totalRevenue:c/1e7,totalUser:i.length})}return n}},34078:(e,t,r)=>{"use strict";r.d(t,{Q7:()=>o,Sq:()=>d,Uj:()=>n,Xt:()=>s,i7:()=>i,lj:()=>c,rF:()=>l,vS:()=>g});var a=r(46820);let n=async()=>{try{let e=await a.A.get("api/image/routes.php");return console.log("Backend Response:",e.data),e.data.data.map(e=>({imageId:e.imageId,src:e.src}))}catch(e){return console.log("Error fetching images:",e),{error:"Error fetching images"}}},o=async e=>{try{let t=await a.A.get("api/image/routes.php?slug=".concat(e,"&type=product"));return console.log("Backend Response:",t.data),t.data.data}catch(e){return console.log("Error fetching image:",e),{error:"Error fetching image"}}},l=async e=>{try{let t=await a.A.get("api/image/routes.php?blogId=".concat(e,"&type=blog"));return console.log("Backend Response:",t.data),t.data.data}catch(e){return console.log("Error fetching image:",e),{error:"Error fetching image"}}},s=async(e,t)=>{try{let r=await a.A.post("api/image/routes.php?slug=".concat(e,"&type=product"),t);return console.log("Backend Response:",r.data),r.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},i=async(e,t)=>{try{let r=await a.A.post("api/image/routes.php?slug=".concat(e,"&type=blog"),t);return console.log("Backend Response:",r.data),r.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},c=async e=>{try{let t=await a.A.post("api/image/routes.php?type=about",e);return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},d=async e=>{try{let t=await a.A.put("api/image/routes.php?type=imageId",e);return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error updating image:",e),{error:"Error updating image"}}},g=async e=>{try{let t=await a.A.delete("api/image/routes.php?imageId=".concat(e));return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error deleting image:",e),{error:"Error deleting image"}}}},14057:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var a=r(12115);let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),o=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()};var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,a.forwardRef)((e,t)=>{let{color:r="currentColor",size:n=24,strokeWidth:s=2,absoluteStrokeWidth:i,className:c="",children:d,iconNode:g,...u}=e;return(0,a.createElement)("svg",{ref:t,...l,width:n,height:n,stroke:r,strokeWidth:i?24*Number(s)/Number(n):s,className:o("lucide",c),...u},[...g.map(e=>{let[t,r]=e;return(0,a.createElement)(t,r)}),...Array.isArray(d)?d:[d]])}),i=(e,t)=>{let r=(0,a.forwardRef)((r,l)=>{let{className:i,...c}=r;return(0,a.createElement)(s,{ref:l,iconNode:t,className:o("lucide-".concat(n(e)),i),...c})});return r.displayName="".concat(e),r}},35524:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(14057).A)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])}},e=>{var t=t=>e(e.s=t);e.O(0,[2651,1345,1359,8441,1517,7358],()=>t(17647)),_N_E=e.O()}]);
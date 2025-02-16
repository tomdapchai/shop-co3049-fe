(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8297],{56908:(e,t,r)=>{Promise.resolve().then(r.bind(r,93357))},46820:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=r(82651).A.create({baseURL:"http://localhost:5050",withCredentials:!0})},93357:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h});var a=r(95155),s=r(12115),n=r(35007),o=r(39286),l=r(28979),i=r(5565),c=r(76046),d=r(14085);function u(e){let{blog:t,thumb:r}=e,s=(0,c.useRouter)();return(0,a.jsxs)(n.Zp,{className:"w-full",children:[(0,a.jsx)(n.aR,{className:"p-4",children:(0,a.jsx)(n.ZB,{className:"text-2xl",children:t.title})}),(0,a.jsxs)(n.Wu,{className:"p-4 pt-0 h-[400px] line-clamp-3 mb-6",children:[(0,a.jsx)(i.default,{src:r.src,alt:r.imageId,width:400,height:400}),(0,a.jsx)("div",{className:"text-sm text-muted-foreground line-clamp-3",children:(0,l.Ay)(t.content)})]}),(0,a.jsxs)(n.wL,{className:"w-full flex flex-col justify-start items-start space-y-4",children:[(0,a.jsx)("div",{className:"p-4 pt-0 flex flex-wrap gap-2",children:t.tags.map((e,t)=>(0,a.jsx)(o.E,{variant:"secondary",children:e},t))}),(0,a.jsx)(d.$,{variant:"link",onClick:()=>s.push("/admin/blogs/".concat(t.blogId)),children:"Details"})]})]})}var g=r(9955),p=r(50745),m=r(91309),f=r(34078);function h(){let[e,t]=(0,s.useState)([]),[r,n]=(0,s.useState)(""),[o,l]=(0,s.useState)("all"),[i,h]=(0,s.useState)("desc"),[x,y]=(0,s.useState)(1),[b,w]=(0,s.useState)(!0),[v,j]=(0,s.useState)([]),N=(0,c.useRouter)(),D=Array.from(new Set(e.flatMap(e=>e.tags)));if((0,s.useEffect)(()=>{(0,m.Xm)().then(e=>{"error"in e?console.log(e.error):(console.log("Blogs:",e),t(e))})},[]),(0,s.useEffect)(()=>{e.length>0&&Promise.all(e.map(async e=>{await (0,f.rF)(e.blogId).then(e=>{if("error"in e){console.error(e.error);return}{let t=e.filter(e=>!0==e.isThumbnail);j(e=>[...e,...t])}})})).then(()=>w(!1))},[e]),(0,s.useEffect)(()=>{console.log(v)},[v]),b)return(0,a.jsx)("div",{children:"Loading..."});let R=e.filter(e=>e.title.toLowerCase().includes(r.toLowerCase())).filter(e=>"all"===o||""===o||e.tags.includes(o)).sort((e,t)=>"asc"===i?new Date(e.posted).getTime()-new Date(t.posted).getTime():new Date(t.posted).getTime()-new Date(e.posted).getTime()),A=Math.ceil(R.length/5),E=R.slice((x-1)*5,5*x);return(0,a.jsxs)("div",{className:"container mx-auto py-8",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold mb-6",children:"Blog Management"}),(0,a.jsxs)("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[(0,a.jsx)(g.p,{placeholder:"Search blogs...",value:r,onChange:e=>n(e.target.value),className:"md:w-1/3"}),(0,a.jsxs)(p.l6,{value:o,onValueChange:l,children:[(0,a.jsx)(p.bq,{className:"md:w-1/3",children:(0,a.jsx)(p.yv,{placeholder:"Filter by tag"})}),(0,a.jsxs)(p.gC,{children:[(0,a.jsx)(p.eb,{value:"all",children:"All tags"}),D.map(e=>(0,a.jsx)(p.eb,{value:e,children:e},e))]})]}),(0,a.jsxs)(p.l6,{value:i,onValueChange:e=>h(e),children:[(0,a.jsx)(p.bq,{className:"md:w-1/3",children:(0,a.jsx)(p.yv,{placeholder:"Sort by date"})}),(0,a.jsxs)(p.gC,{children:[(0,a.jsx)(p.eb,{value:"desc",children:"Newest first"}),(0,a.jsx)(p.eb,{value:"asc",children:"Oldest first"})]})]}),(0,a.jsx)(d.$,{className:"bg-sub hover:bg-sub",onClick:()=>{N.push("/admin/blogs/create")},children:"Create new blog"})]}),(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6",children:E.map((e,t)=>(0,a.jsx)(u,{blog:e,thumb:v[t]},e.blogId))}),(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsx)(d.$,{onClick:()=>y(e=>Math.max(1,e-1)),disabled:1===x,children:"Previous"}),(0,a.jsxs)("span",{children:["Page ",x," of ",A]}),(0,a.jsx)(d.$,{onClick:()=>y(e=>Math.min(A,e+1)),disabled:x===A,children:"Next"})]})]})}},39286:(e,t,r)=>{"use strict";r.d(t,{E:()=>l});var a=r(95155);r(12115);var s=r(31027),n=r(29602);let o=(0,s.F)("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function l(e){let{className:t,variant:r,...s}=e;return(0,a.jsx)("div",{className:(0,n.cn)(o({variant:r}),t),...s})}},14085:(e,t,r)=>{"use strict";r.d(t,{$:()=>c,r:()=>i});var a=r(95155),s=r(12115),n=r(12317),o=r(31027),l=r(29602);let i=(0,o.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),c=s.forwardRef((e,t)=>{let{className:r,variant:s,size:o,asChild:c=!1,...d}=e,u=c?n.DX:"button";return(0,a.jsx)(u,{className:(0,l.cn)(i({variant:s,size:o,className:r})),ref:t,...d})});c.displayName="Button"},35007:(e,t,r)=>{"use strict";r.d(t,{BT:()=>c,Wu:()=>d,ZB:()=>i,Zp:()=>o,aR:()=>l,wL:()=>u});var a=r(95155),s=r(12115),n=r(29602);let o=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,n.cn)("rounded-xl border bg-card text-card-foreground shadow",r),...s})});o.displayName="Card";let l=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",r),...s})});l.displayName="CardHeader";let i=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,n.cn)("font-semibold leading-none tracking-tight",r),...s})});i.displayName="CardTitle";let c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,n.cn)("text-sm text-muted-foreground",r),...s})});c.displayName="CardDescription";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,n.cn)("p-6 pt-0",r),...s})});d.displayName="CardContent";let u=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,n.cn)("flex items-center p-6 pt-0",r),...s})});u.displayName="CardFooter"},9955:(e,t,r)=>{"use strict";r.d(t,{p:()=>o});var a=r(95155),s=r(12115),n=r(29602);let o=s.forwardRef((e,t)=>{let{className:r,type:s,...o}=e;return(0,a.jsx)("input",{type:s,className:(0,n.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...o})});o.displayName="Input"},50745:(e,t,r)=>{"use strict";r.d(t,{bq:()=>g,eb:()=>h,gC:()=>f,l6:()=>d,yv:()=>u});var a=r(95155),s=r(12115),n=r(63409),o=r(32645),l=r(52488),i=r(27193),c=r(29602);let d=n.bL;n.YJ;let u=n.WT,g=s.forwardRef((e,t)=>{let{className:r,children:s,...l}=e;return(0,a.jsxs)(n.l9,{ref:t,className:(0,c.cn)("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",r),...l,children:[s,(0,a.jsx)(n.In,{asChild:!0,children:(0,a.jsx)(o.A,{className:"h-4 w-4 opacity-50"})})]})});g.displayName=n.l9.displayName;let p=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(n.PP,{ref:t,className:(0,c.cn)("flex cursor-default items-center justify-center py-1",r),...s,children:(0,a.jsx)(l.A,{className:"h-4 w-4"})})});p.displayName=n.PP.displayName;let m=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(n.wn,{ref:t,className:(0,c.cn)("flex cursor-default items-center justify-center py-1",r),...s,children:(0,a.jsx)(o.A,{className:"h-4 w-4"})})});m.displayName=n.wn.displayName;let f=s.forwardRef((e,t)=>{let{className:r,children:s,position:o="popper",...l}=e;return(0,a.jsx)(n.ZL,{children:(0,a.jsxs)(n.UC,{ref:t,className:(0,c.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===o&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",r),position:o,...l,children:[(0,a.jsx)(p,{}),(0,a.jsx)(n.LM,{className:(0,c.cn)("p-1","popper"===o&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:s}),(0,a.jsx)(m,{})]})})});f.displayName=n.UC.displayName,s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(n.JU,{ref:t,className:(0,c.cn)("px-2 py-1.5 text-sm font-semibold",r),...s})}).displayName=n.JU.displayName;let h=s.forwardRef((e,t)=>{let{className:r,children:s,...o}=e;return(0,a.jsxs)(n.q7,{ref:t,className:(0,c.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",r),...o,children:[(0,a.jsx)("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,a.jsx)(n.VF,{children:(0,a.jsx)(i.A,{className:"h-4 w-4"})})}),(0,a.jsx)(n.p4,{children:s})]})});h.displayName=n.q7.displayName,s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(n.wv,{ref:t,className:(0,c.cn)("-mx-1 my-1 h-px bg-muted",r),...s})}).displayName=n.wv.displayName},29602:(e,t,r)=>{"use strict";r.d(t,{$g:()=>o,QH:()=>i,Vi:()=>g,Yq:()=>l,cV:()=>c,cn:()=>n,dw:()=>u,gI:()=>d,oE:()=>p});var a=r(43463),s=r(69795);function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.QP)((0,a.$)(t))}let o=e=>e.toLocaleString("en-US",{style:"currency",currency:"VND",currencyDisplay:"code"});function l(e){return new Intl.DateTimeFormat("vi-VN",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}).format(e)}function i(e){let t=e;for(let e of[{regex:/HEADLINE<([^>]+)>/g,replace:'<h1 class="text-2xl font-bold mb-4">$1</h1>'},{regex:/SECTION<([^>]+)>/g,replace:'<h2 class="text-lg font-bold mb-2">$1</h2>'},{regex:/LINK<([^,]+),\s*([^>]+)>/g,replace:'<a href="$2" class="text-black hover:text-slate-500 underline">$1</a>'},{regex:/IMG<([^,]+),\s*([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g,replace:(e,t,r,a,s)=>'<div class="w-full flex justify-center items-center">\n            <Image src="'.concat(r,'" alt="').concat(t,'" ').concat(a?'width="'.concat(a,'"'):""," ").concat(s?'height="'.concat(s,'"'):"",' class="rounded-lg" /></div>')},{regex:/P<([^>]+)>/g,replace:(e,t)=>{let r=t.split(/\n/).map(e=>e.trim()).join("<br/>");return'<p class="text-base text-black">'.concat(r,"</p>")}}])t=t.replace(e.regex,e.replace);return'<div class="w-full flex flex-col justify-center items-start">'.concat(t,"</div>")}let c=async e=>{let t=new FormData;t.append("file",e),t.append("upload_preset","yxg1dfzu");try{let e=await fetch("https://api.cloudinary.com/v1_1/".concat("dgwujcdba","/image/upload"),{method:"POST",body:t}),r=await e.json();if(r.secure_url)return r.secure_url;return console.error("Cloudinary error response:",r),{error:"Invalid response from Cloudinary"}}catch(e){return console.error("Upload error:",e),{error:"Upload error"}}};function d(e,t,r){let a=new Date;if("col"===r){let r=[];for(let s=t;s>=0;s--){let t=new Date(a);t.setDate(a.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.createdAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()});r.push({date:n,total:o.length})}return r}{let r={completed:0,pending:0,cancelled:0},s=new Date(a);return s.setDate(a.getDate()-t),e.forEach(e=>{let t=new Date(e.createdAt);t>=s&&t<=a&&(r[e.status]=(r[e.status]||0)+1)}),Object.entries(r).map(e=>{let[t,r]=e;return{status:t,total:r}})}}function u(e,t){let r=new Date,a=[];for(let s=t;s>=0;s--){let t=new Date(r);t.setDate(r.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.joinAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()});a.push({date:n,total:o.length})}return a}function g(e,t){let r=new Date,a=[];for(let s=t;s>=0;s--){let t=new Date(r);t.setDate(r.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.createdAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).reduce((e,t)=>e+("completed"===t.status?t.total:0),0);a.push({date:n,total:o/1e3})}return a}function p(e,t,r){let a=new Date,s=[];for(let n=r;n>=0;n--){let r=new Date(a);r.setDate(a.getDate()-n);let o=r.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),l=e.filter(e=>{let t=new Date(e.createdAt);return t.getDate()===r.getDate()&&t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}),i=t.filter(e=>{let t=new Date(e.joinAt);return t.getDate()===r.getDate()&&t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}),c=l.reduce((e,t)=>e+("completed"===t.status?t.total:0),0);s.push({date:o,totalOrder:l.length,totalRevenue:c/1e7,totalUser:i.length})}return s}},76046:(e,t,r)=>{"use strict";var a=r(66658);r.o(a,"useParams")&&r.d(t,{useParams:function(){return a.useParams}}),r.o(a,"usePathname")&&r.d(t,{usePathname:function(){return a.usePathname}}),r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}}),r.o(a,"useSearchParams")&&r.d(t,{useSearchParams:function(){return a.useSearchParams}})},91309:(e,t,r)=>{"use strict";r.d(t,{Dm:()=>n,Xm:()=>s,Yb:()=>l,ly:()=>o,yb:()=>i});var a=r(46820);let s=async()=>{try{let e=await a.A.get("api/blog/routes.php");return console.log("Backend Response:",e.data),e.data.data.map(e=>({blogId:e.blogId,title:e.title,content:e.content,tags:JSON.parse(e.tags),posted:e.posted,contentOriginal:e.content_original}))}catch(e){return console.log("Error:",e),{error:"An error occurred while fetching blogs"}}},n=async e=>{try{let t=await a.A.get("api/blog/routes.php?blogId=".concat(e));console.log("Backend Response:",t.data);let{title:r,content:s,tags:n,posted:o,content_original:l}=t.data.data;return{blogId:e,title:r,content:s,tags:JSON.parse(n),posted:o,contentOriginal:l}}catch(e){return console.log("Error:",e),{error:"An error occurred while fetching blog"}}},o=async e=>{try{let t=await a.A.post("api/blog/routes.php",e);return console.log("Backend Response:",t.data),{message:t.data.message}}catch(e){return console.log("Error:",e),{error:"An error occurred while creating blog"}}},l=async(e,t)=>{try{let r=await a.A.put("api/blog/routes.php?blogId=".concat(e),t);return console.log("Backend Response:",r.data),{message:r.data.message}}catch(e){return console.log("Error:",e),{error:"An error occurred while updating blog"}}},i=async e=>{try{let t=await a.A.delete("api/blog/routes.php?blogId=".concat(e));return console.log("Backend Response:",t.data),{message:t.data.message}}catch(e){return console.log("Error:",e),{error:"An error occurred while deleting blog"}}}},34078:(e,t,r)=>{"use strict";r.d(t,{Q7:()=>n,Sq:()=>d,Uj:()=>s,Xt:()=>l,i7:()=>i,lj:()=>c,rF:()=>o,vS:()=>u});var a=r(46820);let s=async()=>{try{let e=await a.A.get("api/image/routes.php");return console.log("Backend Response:",e.data),e.data.data.map(e=>({imageId:e.imageId,src:e.src}))}catch(e){return console.log("Error fetching images:",e),{error:"Error fetching images"}}},n=async e=>{try{let t=await a.A.get("api/image/routes.php?slug=".concat(e,"&type=product"));return console.log("Backend Response:",t.data),t.data.data}catch(e){return console.log("Error fetching image:",e),{error:"Error fetching image"}}},o=async e=>{try{let t=await a.A.get("api/image/routes.php?blogId=".concat(e,"&type=blog"));return console.log("Backend Response:",t.data),t.data.data}catch(e){return console.log("Error fetching image:",e),{error:"Error fetching image"}}},l=async(e,t)=>{try{let r=await a.A.post("api/image/routes.php?slug=".concat(e,"&type=product"),t);return console.log("Backend Response:",r.data),r.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},i=async(e,t)=>{try{let r=await a.A.post("api/image/routes.php?slug=".concat(e,"&type=blog"),t);return console.log("Backend Response:",r.data),r.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},c=async e=>{try{let t=await a.A.post("api/image/routes.php?type=about",e);return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},d=async e=>{try{let t=await a.A.put("api/image/routes.php?type=imageId",e);return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error updating image:",e),{error:"Error updating image"}}},u=async e=>{try{let t=await a.A.delete("api/image/routes.php?imageId=".concat(e));return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error deleting image:",e),{error:"Error deleting image"}}}},61786:(e,t,r)=>{"use strict";function a(e,[t,r]){return Math.min(r,Math.max(t,e))}r.d(t,{q:()=>a})},4256:(e,t,r)=>{"use strict";r.d(t,{jH:()=>n});var a=r(12115);r(95155);var s=a.createContext(void 0);function n(e){let t=a.useContext(s);return e||t||"ltr"}}},e=>{var t=t=>e(e.s=t);e.O(0,[2651,1345,1359,1080,914,9895,8979,6412,8441,1517,7358],()=>t(56908)),_N_E=e.O()}]);
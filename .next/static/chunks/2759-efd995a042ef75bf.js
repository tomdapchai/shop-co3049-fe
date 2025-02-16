"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2759],{46820:(e,t,r)=>{r.d(t,{A:()=>a});let a=r(82651).A.create({baseURL:"http://localhost:5050",withCredentials:!0})},7711:(e,t,r)=>{r.d(t,{v:()=>u});var a=r(95155),s=r(35007),n=r(89282),o=r(27465),l=r(48173),i=r.n(l),c=r(14085),d=r(22949);function u(e){let{reviewer:t,rating:r,comment:l,date:u,view:p=!1,productId:g,admin:m=!1,reviewId:f,userId:h}=e,x=async()=>{await (0,d.Wr)(f)};return console.log("hmm"),(0,a.jsxs)(s.Zp,{className:"w-full",children:[(0,a.jsxs)(s.aR,{className:"flex flex-row items-center space-x-4 pb-4 bg-main",children:[(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsxs)("h3",{className:"text-lg font-semibold",children:[t," ",m&&"- ",m&&(0,a.jsxs)(i(),{href:"/admin/users/".concat(h),className:"text-sm underline hover:text-slate-400 text-slate-500",children:["User ID: ",h]})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-2","aria-label":"Rating: ".concat(r," out of 5 stars"),children:[(0,a.jsx)(o.N,{rating:r})," ",(0,a.jsxs)("p",{children:["(",r,"/5)"]})]})]}),(0,a.jsxs)("div",{className:"flex flex-col justify-start items-start space-y-2",children:[p&&g&&(0,a.jsxs)(i(),{href:"/product/".concat(g),className:"underline hover:text-slate-400",children:["Product: ",g]}),(0,a.jsx)("p",{className:"text-sm text-muted-foreground",children:u})]})]}),(0,a.jsx)(n.Separator,{}),(0,a.jsx)(s.Wu,{className:"pt-4",children:(0,a.jsx)("p",{className:"text-sm leading-relaxed",children:l})}),(0,a.jsxs)(s.wL,{className:"text-sm text-muted-foreground flex flex-col space-y-2 justify-start items-start",children:[(0,a.jsx)("p",{children:"Was this review helpful?"}),m&&f&&(0,a.jsx)(c.$,{onClick:x,className:"bg-red-400 hover:bg-red-400/90",children:"Delete Review"})]})]})}},58878:(e,t,r)=>{r.d(t,{A:()=>o});var a=r(95155),s=r(12115),n=r(7711);let o=e=>{let{reviews:t,products:r,admin:o=!1}=e,[l,i]=(0,s.useState)(t);return(0,s.useEffect)(()=>{i(t)}),(0,a.jsx)("div",{className:"w-full flex flex-col space-y-4",children:l.map((e,t)=>(0,a.jsx)(n.v,{...e,view:!0,admin:o},e.reviewId))})}},27465:(e,t,r)=>{r.d(t,{N:()=>n});var a=r(95155),s=r(26039);function n(e){let{rating:t}=e,r=Math.max(0,Math.min(5,Math.round(t)));return(0,a.jsx)("div",{className:"flex","aria-label":"Rating: ".concat(Number(t).toFixed(1)," out of 5 stars"),children:[void 0,void 0,void 0,void 0,void 0].map((e,t)=>(0,a.jsx)(s.A,{className:"w-5 h-5 ".concat(t<r?"text-sub fill-[#b88e2f] text-sub":"text-muted-foreground")},t))})}},9955:(e,t,r)=>{r.d(t,{p:()=>o});var a=r(95155),s=r(12115),n=r(29602);let o=s.forwardRef((e,t)=>{let{className:r,type:s,...o}=e;return(0,a.jsx)("input",{type:s,className:(0,n.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...o})});o.displayName="Input"},81453:(e,t,r)=>{r.d(t,{Eb:()=>g,Iu:()=>d,WA:()=>m,cU:()=>u,dK:()=>c,n$:()=>p});var a=r(95155),s=r(12115),n=r(25012),o=r(15325),l=(r(80368),r(29602)),i=r(14085);let c=e=>{let{className:t,...r}=e;return(0,a.jsx)("nav",{role:"navigation","aria-label":"pagination",className:(0,l.cn)("mx-auto flex w-full justify-center",t),...r})};c.displayName="Pagination";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("ul",{ref:t,className:(0,l.cn)("flex flex-row items-center gap-1",r),...s})});d.displayName="PaginationContent";let u=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("li",{ref:t,className:(0,l.cn)("",r),...s})});u.displayName="PaginationItem";let p=e=>{let{className:t,isActive:r,size:s="icon",...n}=e;return(0,a.jsx)("a",{"aria-current":r?"page":void 0,className:(0,l.cn)((0,i.r)({variant:r?"outline":"ghost",size:s}),t),...n})};p.displayName="PaginationLink";let g=e=>{let{className:t,...r}=e;return(0,a.jsxs)(p,{"aria-label":"Go to previous page",size:"default",className:(0,l.cn)("gap-1 pl-2.5",t),...r,children:[(0,a.jsx)(n.A,{className:"h-4 w-4"}),(0,a.jsx)("span",{children:"Previous"})]})};g.displayName="PaginationPrevious";let m=e=>{let{className:t,...r}=e;return(0,a.jsxs)(p,{"aria-label":"Go to next page",size:"default",className:(0,l.cn)("gap-1 pr-2.5",t),...r,children:[(0,a.jsx)("span",{children:"Next"}),(0,a.jsx)(o.A,{className:"h-4 w-4"})]})};m.displayName="PaginationNext"},50745:(e,t,r)=>{r.d(t,{bq:()=>p,eb:()=>h,gC:()=>f,l6:()=>d,yv:()=>u});var a=r(95155),s=r(12115),n=r(63409),o=r(32645),l=r(52488),i=r(27193),c=r(29602);let d=n.bL;n.YJ;let u=n.WT,p=s.forwardRef((e,t)=>{let{className:r,children:s,...l}=e;return(0,a.jsxs)(n.l9,{ref:t,className:(0,c.cn)("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",r),...l,children:[s,(0,a.jsx)(n.In,{asChild:!0,children:(0,a.jsx)(o.A,{className:"h-4 w-4 opacity-50"})})]})});p.displayName=n.l9.displayName;let g=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(n.PP,{ref:t,className:(0,c.cn)("flex cursor-default items-center justify-center py-1",r),...s,children:(0,a.jsx)(l.A,{className:"h-4 w-4"})})});g.displayName=n.PP.displayName;let m=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(n.wn,{ref:t,className:(0,c.cn)("flex cursor-default items-center justify-center py-1",r),...s,children:(0,a.jsx)(o.A,{className:"h-4 w-4"})})});m.displayName=n.wn.displayName;let f=s.forwardRef((e,t)=>{let{className:r,children:s,position:o="popper",...l}=e;return(0,a.jsx)(n.ZL,{children:(0,a.jsxs)(n.UC,{ref:t,className:(0,c.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===o&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",r),position:o,...l,children:[(0,a.jsx)(g,{}),(0,a.jsx)(n.LM,{className:(0,c.cn)("p-1","popper"===o&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:s}),(0,a.jsx)(m,{})]})})});f.displayName=n.UC.displayName,s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(n.JU,{ref:t,className:(0,c.cn)("px-2 py-1.5 text-sm font-semibold",r),...s})}).displayName=n.JU.displayName;let h=s.forwardRef((e,t)=>{let{className:r,children:s,...o}=e;return(0,a.jsxs)(n.q7,{ref:t,className:(0,c.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",r),...o,children:[(0,a.jsx)("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,a.jsx)(n.VF,{children:(0,a.jsx)(i.A,{className:"h-4 w-4"})})}),(0,a.jsx)(n.p4,{children:s})]})});h.displayName=n.q7.displayName,s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(n.wv,{ref:t,className:(0,c.cn)("-mx-1 my-1 h-px bg-muted",r),...s})}).displayName=n.wv.displayName},89282:(e,t,r)=>{r.d(t,{Separator:()=>l});var a=r(95155),s=r(12115),n=r(90434),o=r(29602);let l=s.forwardRef((e,t)=>{let{className:r,orientation:s="horizontal",decorative:l=!0,...i}=e;return(0,a.jsx)(n.b,{ref:t,decorative:l,orientation:s,className:(0,o.cn)("shrink-0 bg-border","horizontal"===s?"h-[1px] w-full":"h-full w-[1px]",r),...i})});l.displayName=n.b.displayName},29602:(e,t,r)=>{r.d(t,{$g:()=>o,QH:()=>i,Vi:()=>p,Yq:()=>l,cV:()=>c,cn:()=>n,dw:()=>u,gI:()=>d,oE:()=>g});var a=r(43463),s=r(69795);function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.QP)((0,a.$)(t))}let o=e=>e.toLocaleString("en-US",{style:"currency",currency:"VND",currencyDisplay:"code"});function l(e){return new Intl.DateTimeFormat("vi-VN",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}).format(e)}function i(e){let t=e;for(let e of[{regex:/HEADLINE<([^>]+)>/g,replace:'<h1 class="text-2xl font-bold mb-4">$1</h1>'},{regex:/SECTION<([^>]+)>/g,replace:'<h2 class="text-lg font-bold mb-2">$1</h2>'},{regex:/LINK<([^,]+),\s*([^>]+)>/g,replace:'<a href="$2" class="text-black hover:text-slate-500 underline">$1</a>'},{regex:/IMG<([^,]+),\s*([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g,replace:(e,t,r,a,s)=>'<div class="w-full flex justify-center items-center">\n            <Image src="'.concat(r,'" alt="').concat(t,'" ').concat(a?'width="'.concat(a,'"'):""," ").concat(s?'height="'.concat(s,'"'):"",' class="rounded-lg" /></div>')},{regex:/P<([^>]+)>/g,replace:(e,t)=>{let r=t.split(/\n/).map(e=>e.trim()).join("<br/>");return'<p class="text-base text-black">'.concat(r,"</p>")}}])t=t.replace(e.regex,e.replace);return'<div class="w-full flex flex-col justify-center items-start">'.concat(t,"</div>")}let c=async e=>{let t=new FormData;t.append("file",e),t.append("upload_preset","yxg1dfzu");try{let e=await fetch("https://api.cloudinary.com/v1_1/".concat("dgwujcdba","/image/upload"),{method:"POST",body:t}),r=await e.json();if(r.secure_url)return r.secure_url;return console.error("Cloudinary error response:",r),{error:"Invalid response from Cloudinary"}}catch(e){return console.error("Upload error:",e),{error:"Upload error"}}};function d(e,t,r){let a=new Date;if("col"===r){let r=[];for(let s=t;s>=0;s--){let t=new Date(a);t.setDate(a.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.createdAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()});r.push({date:n,total:o.length})}return r}{let r={completed:0,pending:0,cancelled:0},s=new Date(a);return s.setDate(a.getDate()-t),e.forEach(e=>{let t=new Date(e.createdAt);t>=s&&t<=a&&(r[e.status]=(r[e.status]||0)+1)}),Object.entries(r).map(e=>{let[t,r]=e;return{status:t,total:r}})}}function u(e,t){let r=new Date,a=[];for(let s=t;s>=0;s--){let t=new Date(r);t.setDate(r.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.joinAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()});a.push({date:n,total:o.length})}return a}function p(e,t){let r=new Date,a=[];for(let s=t;s>=0;s--){let t=new Date(r);t.setDate(r.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.createdAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).reduce((e,t)=>e+("completed"===t.status?t.total:0),0);a.push({date:n,total:o/1e3})}return a}function g(e,t,r){let a=new Date,s=[];for(let n=r;n>=0;n--){let r=new Date(a);r.setDate(a.getDate()-n);let o=r.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),l=e.filter(e=>{let t=new Date(e.createdAt);return t.getDate()===r.getDate()&&t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}),i=t.filter(e=>{let t=new Date(e.joinAt);return t.getDate()===r.getDate()&&t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}),c=l.reduce((e,t)=>e+("completed"===t.status?t.total:0),0);s.push({date:o,totalOrder:l.length,totalRevenue:c/1e7,totalUser:i.length})}return s}},34078:(e,t,r)=>{r.d(t,{Q7:()=>n,Sq:()=>d,Uj:()=>s,Xt:()=>l,i7:()=>i,lj:()=>c,rF:()=>o,vS:()=>u});var a=r(46820);let s=async()=>{try{let e=await a.A.get("api/image/routes.php");return console.log("Backend Response:",e.data),e.data.data.map(e=>({imageId:e.imageId,src:e.src}))}catch(e){return console.log("Error fetching images:",e),{error:"Error fetching images"}}},n=async e=>{try{let t=await a.A.get("api/image/routes.php?slug=".concat(e,"&type=product"));return console.log("Backend Response:",t.data),t.data.data}catch(e){return console.log("Error fetching image:",e),{error:"Error fetching image"}}},o=async e=>{try{let t=await a.A.get("api/image/routes.php?blogId=".concat(e,"&type=blog"));return console.log("Backend Response:",t.data),t.data.data}catch(e){return console.log("Error fetching image:",e),{error:"Error fetching image"}}},l=async(e,t)=>{try{let r=await a.A.post("api/image/routes.php?slug=".concat(e,"&type=product"),t);return console.log("Backend Response:",r.data),r.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},i=async(e,t)=>{try{let r=await a.A.post("api/image/routes.php?slug=".concat(e,"&type=blog"),t);return console.log("Backend Response:",r.data),r.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},c=async e=>{try{let t=await a.A.post("api/image/routes.php?type=about",e);return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error creating image:",e),{error:"Error creating image"}}},d=async e=>{try{let t=await a.A.put("api/image/routes.php?type=imageId",e);return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error updating image:",e),{error:"Error updating image"}}},u=async e=>{try{let t=await a.A.delete("api/image/routes.php?imageId=".concat(e));return console.log("Backend Response:",t.data),t.data}catch(e){return console.log("Error deleting image:",e),{error:"Error deleting image"}}}},18652:(e,t,r)=>{r.d(t,{Fo:()=>l,M$:()=>o,WY:()=>i,vc:()=>c});var a=r(46820),s=r(34078),n=r(22949);let o=async e=>{try{let{productId:t,short_description:r,full_description:o,tags:l,size:i,color:c,price:d,full_description_original:u,...p}=(await a.A.get("api/product/routes.php?slug=".concat(e))).data.data,g=await (0,s.Q7)(e);if("error"in g)return{error:g.error};let m=await (0,n.Xr)(e);return{...p,price:Number(d),slug:t,overview:r,description:o,images:g,reviews:m,tags:JSON.parse(l),size:JSON.parse(i),color:JSON.parse(c),descriptionOriginal:u}}catch(e){return console.log("Error fetching product:",e),{error:"Error fetching product"}}},l=async()=>{try{let e=(await a.A.get("api/product/routes.php")).data.data;return await Promise.all(e.map(async e=>{let{productId:t,short_description:r,full_description:a,size:o,color:l,full_description_original:i,tags:c,...d}=e,u=await (0,s.Q7)(t);if("error"in u)return{error:u.error};let p=await (0,n.Xr)(t);return{...d,tags:JSON.parse(c),size:JSON.parse(o),color:JSON.parse(l),slug:t,overview:r,description:a,images:u,reviews:p,descriptionOriginal:i}}))}catch(e){return console.log("Error fetching products:",e),{error:"Error fetching products"}}},i=async e=>{try{return{message:(await a.A.post("api/product/routes.php",{productId:e.slug,name:e.name,price:e.price,shortDescription:e.overview,fullDescription:e.description,size:e.size,color:e.color,tags:e.tags,fullDescriptionOriginal:e.descriptionOriginal})).data.message}}catch(e){return console.log("Error creating product:",e),{error:"Error creating product"}}},c=async(e,t)=>{try{return console.log("Updating product:",t),{message:(await a.A.put("api/product/routes.php?slug=".concat(e),{name:t.name,price:t.price,shortDescription:t.overview,fullDescription:t.description,size:t.size,color:t.color,tags:t.tags,fullDescriptionOriginal:t.descriptionOriginal})).data.message}}catch(e){return console.log("Error updating product:",e),{error:"Error updating product"}}}},22949:(e,t,r)=>{r.d(t,{Wr:()=>l,Xr:()=>n,bx:()=>o,zu:()=>s});var a=r(46820);let s=async()=>{try{let e=await a.A.get("api/review/routes.php");return console.log("Backend Response:",e.data),e.data.data.map(e=>({reviewId:e.reviewId,productId:e.productId,reviewer:e.reviewer,rating:Number(e.rating),comment:e.content,date:e.createdAt,userId:e.userId}))}catch(e){return console.log("Error fetching reviews:",e),{error:"Error fetching reviews"}}},n=async e=>{try{let t=await a.A.get("api/review/routes.php?productId=".concat(e));return console.log("Backend Response:",t.data),"success"==t.data.status?t.data.data.map(e=>({reviewId:e.reviewId,productId:e.productId,reviewer:e.reviewer,rating:Number(e.rating),comment:e.content,date:e.createdAt,userId:e.userId})):[]}catch(e){return console.log("Error fetching reviews:",e),{error:"Error fetching reviews"}}},o=async e=>{try{console.log("Data:",e);let t=await a.A.post("api/review/routes.php",e);return console.log("Backend Response:",t.data),{message:t.data.message}}catch(e){return console.log("Error creating review:",e),{error:"Error creating review"}}},l=async e=>{try{let t=await a.A.delete("api/review/routes.php?reviewId=".concat(e));return console.log("Backend Response:",t.data),{message:t.data.message}}catch(e){return console.log("Error deleting review:",e),{error:"Error deleting review"}}}}}]);
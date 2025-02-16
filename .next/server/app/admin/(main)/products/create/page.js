(()=>{var e={};e.id=4953,e.ids=[4953],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},94537:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c});var s=r(70260),i=r(28203),l=r(25155),a=r.n(l),n=r(67292),o={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);r.d(t,o);let c=["",{children:["admin",{children:["(main)",{children:["products",{children:["create",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,40393)),"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\products\\create\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,9540)),"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\layout.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,19611)),"W:\\web\\shop-co3049-fe\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\products\\create\\page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/admin/(main)/products/create/page",pathname:"/admin/products/create",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},84429:(e,t,r)=>{Promise.resolve().then(r.bind(r,40393))},8397:(e,t,r)=>{Promise.resolve().then(r.bind(r,82261))},82261:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>R});var s=r(45512),i=r(58009),l=r(6868),a=r(81914),n=r(87021),o=r(25409),c=r(48859),d=r(94727),u=r(71965),p=r(666),m=r(80401),x=r(26288),h=r(18295),f=r(59462),g=r(70801),j=r(98831),v=r(18742),b=r(68668),w=r(89850),y=r(48052),N=r(96050),E=r(79334),C=r(45103);function R(){let[e,t]=(0,i.useState)([]),[r,R]=(0,i.useState)([]),[k,P]=(0,i.useState)([]),[I,$]=(0,i.useState)(""),[z,q]=(0,i.useState)(!1),{toast:D}=(0,g.dj)(),S=(0,E.useRouter)(),M=(0,l.mN)({resolver:(0,a.u)(y.HU),defaultValues:{productId:"",name:"",price:0,size:[],color:[],shortDescription:"",fullDescription:"",tags:[]}}),G=async e=>{try{if(q(!0),0===r.length){D({title:"Error",description:"Please upload at least one product image",variant:"destructive"}),q(!1);return}let t=(await Promise.all(r.map(async e=>{try{console.log(`Starting upload for image: ${e.alt}`);let t=await (0,f.cV)(e.file);if("string"==typeof t)return console.log(`Successfully uploaded image: ${e.alt}`),{alt:e.alt,src:t};return console.log("Error uploading image:",e.alt),D({title:"Error",description:`Error uploading image: ${e.alt}`,variant:"destructive"}),q(!1),null}catch(t){return console.log(`Error uploading image "${e.alt}":`,t),D({title:"Error",description:`Failed to upload image "${e.alt}"`,variant:"destructive"}),q(!1),null}}))).filter(e=>null!==e);if(t.length!==r.length){D({title:"Error",description:"Failed to upload all images",variant:"destructive"}),q(!1);return}let s=(await Promise.all(k.map(async e=>{try{console.log(`Starting upload for image: ${e.alt}`);let t=await (0,f.cV)(e.file);if("string"==typeof t)return console.log(`Successfully uploaded image: ${e.alt}`),{alt:e.alt,src:t};return console.log("Error uploading image:",e.alt),D({title:"Error",description:`Error uploading image: ${e.alt}`,variant:"destructive"}),q(!1),null}catch(t){return console.error(`Error uploading image "${e.alt}":`,t),D({title:"Error",description:`Failed to upload image "${e.alt}"`,variant:"destructive"}),q(!1),null}}))).filter(e=>null!==e);if(s.length!==k.length){D({title:"Error",description:"Failed to upload all images",variant:"destructive"}),q(!1);return}let i=e.fullDescription;i=i.replace(/IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g,(e,t,r,i)=>{let l=s.find(e=>e.alt===t);return l?`IMG<${t},${l.src}${r?`,${r}`:""}${i?`,${i}`:""}>`:(D({title:"Error",description:`Image with alt "${t}" not found`,variant:"destructive"}),e)});let l=(0,f.QH)(i);console.log({...e,images:t,fullDescription:l}),console.log("Uploaded Images:",t),console.log("Description Images:",s);let{productId:a,shortDescription:n,fullDescription:o,...c}=e;console.log("Product Data:",{...c}),await (0,b.WY)({...c,slug:a,overview:n,description:l,descriptionOriginal:e.fullDescription}).then(e=>{if("error"in e){D({title:"Error",description:"Failed to create product",variant:"destructive"}),q(!1);return}D({title:"Success",description:"Product created successfully",variant:"default"})}).then(()=>{t.forEach(async t=>{await (0,w.Xt)(e.productId,{src:t.src,imageId:t.alt,type:"product"}).then(e=>{if("error"in e){D({title:"Error",description:"Failed to create product image",variant:"destructive"}),q(!1);return}})}),s.forEach(async t=>{await (0,w.Xt)(e.productId,{src:t.src,imageId:t.alt,type:"description"}).then(e=>{if("error"in e){D({title:"Error",description:"Failed to create description image",variant:"destructive"}),q(!1);return}})})}).finally(()=>{S.push("/admin/products"),q(!1)})}catch(e){console.error(e),D({title:"Error",description:"Failed to create product",variant:"destructive"})}};return(0,s.jsxs)("div",{className:"container mx-auto py-8",children:[(0,s.jsx)("h1",{className:"text-3xl font-bold mb-8",children:"Create New Product"}),(0,s.jsx)(d.lV,{...M,children:(0,s.jsxs)("form",{onSubmit:M.handleSubmit(G),className:"space-y-8",children:[(0,s.jsxs)("div",{className:" w-full flex max-md:flex-col justify-between space-x-10 items-start",children:[(0,s.jsxs)("div",{className:"flex w-full flex-grow flex-col justify-start items-start space-y-6",children:[(0,s.jsx)(d.zB,{control:M.control,name:"productId",render:({field:e})=>(0,s.jsxs)(d.eI,{className:"w-full flex-1",children:[(0,s.jsx)(d.lR,{children:"Product ID"}),(0,s.jsx)(d.MJ,{children:(0,s.jsx)(o.p,{...e})}),(0,s.jsx)(d.Rr,{children:"Enter a unique identifier for the product."}),(0,s.jsx)(d.C5,{})]})}),(0,s.jsx)(d.zB,{control:M.control,name:"name",render:({field:e})=>(0,s.jsxs)(d.eI,{className:"w-full flex-1",children:[(0,s.jsx)(d.lR,{children:"Product Name"}),(0,s.jsx)(d.MJ,{children:(0,s.jsx)(o.p,{...e})}),(0,s.jsx)(d.Rr,{children:"Enter the name of the product."}),(0,s.jsx)(d.C5,{})]})}),(0,s.jsx)(d.zB,{control:M.control,name:"price",render:({field:e})=>(0,s.jsxs)(d.eI,{className:"w-full flex-1",children:[(0,s.jsx)(d.lR,{children:"Price"}),(0,s.jsx)(d.MJ,{children:(0,s.jsx)(o.p,{type:"number",...e,onChange:t=>e.onChange(parseFloat(t.target.value))})}),(0,s.jsx)(d.Rr,{children:"Enter the price of the product."}),(0,s.jsx)(d.C5,{})]})}),(0,s.jsx)(d.zB,{control:M.control,name:"size",render:({field:e})=>(0,s.jsxs)(d.eI,{className:"w-full flex-1",children:[(0,s.jsx)(d.lR,{children:"Sizes"}),(0,s.jsx)(j.$,{name:"size",items:N.GX,control:M.control,isEditing:!0}),(0,s.jsx)(d.Rr,{children:"Select available sizes for the product."}),(0,s.jsx)(d.C5,{})]})}),(0,s.jsx)(d.zB,{control:M.control,name:"color",render:({field:e})=>(0,s.jsxs)(d.eI,{className:"w-full flex-1",children:[(0,s.jsx)(d.lR,{children:"Colors"}),(0,s.jsx)(j.$,{name:"color",items:N.ih,control:M.control,isEditing:!0}),(0,s.jsx)(d.Rr,{children:"Select available colors for the product."}),(0,s.jsx)(d.C5,{})]})}),(0,s.jsx)(v.k,{}),(0,s.jsx)(d.zB,{control:M.control,name:"shortDescription",render:({field:e})=>(0,s.jsxs)(d.eI,{className:"w-full flex-1",children:[(0,s.jsx)(d.lR,{children:"Short Description"}),(0,s.jsx)(d.MJ,{children:(0,s.jsx)(c.T,{...e})}),(0,s.jsx)(d.Rr,{children:"Enter a brief description of the product."}),(0,s.jsx)(d.C5,{})]})})]}),(0,s.jsxs)("div",{className:"lg:w-[500px]",children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Product Images"}),(0,s.jsx)(x.A,{uploadedImages:r,onUpload:e=>{let t=URL.createObjectURL(e),r=e.name.split(".").slice(0,-1).join(".");R(s=>[...s,{alt:r,src:t,file:e}])},onDelete:e=>{R(t=>{let r=t.filter(t=>t.src!==e);return URL.revokeObjectURL(e),r})},onUpdateAlt:(e,t)=>{R(r=>r.map(r=>r.alt===e?{...r,alt:t}:r))},isEditing:!0})]})]}),(0,s.jsxs)("div",{className:"flex w-full justify-between space-x-10 items-start",children:[(0,s.jsx)(d.zB,{control:M.control,name:"fullDescription",render:({field:e})=>(0,s.jsxs)(d.eI,{className:"w-full",children:[(0,s.jsxs)(d.lR,{className:"w-full flex justify-between items-center",children:[(0,s.jsx)("p",{children:"Full description"}),(0,s.jsxs)(u.lG,{children:[(0,s.jsx)(u.zM,{children:(0,s.jsx)("p",{className:"hover:underline",children:"Help"})}),(0,s.jsxs)(u.Cf,{className:"max-w-4xl max-h-[80vh]",children:[(0,s.jsx)(u.c7,{children:(0,s.jsx)(u.L3,{children:"Image Description guideline Guideline"})}),(0,s.jsx)(C.default,{src:"/images/guidline.png",alt:"guidline",width:800,height:600})]})]})]}),(0,s.jsx)(d.MJ,{children:(0,s.jsx)(c.T,{...e,className:"min-h-[300px]"})}),(0,s.jsx)(d.Rr,{children:"Enter a detailed description of the product."}),(0,s.jsx)(d.C5,{})]})}),(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start space-y-6 lg:w-[500px]",children:[(0,s.jsxs)("div",{className:"w-full",children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Description Images"}),(0,s.jsx)(x.A,{uploadedImages:k,onUpload:e=>{let t=URL.createObjectURL(e),r=e.name.split(".").slice(0,-1).join(".");P(s=>[...s,{alt:r,src:t,file:e}])},onDelete:e=>{P(t=>{let r=t.filter(t=>t.src!==e);return URL.revokeObjectURL(e),r})},onUpdateAlt:(e,t)=>{P(r=>r.map(r=>r.alt===e?{...r,alt:t}:r))},isEditing:!0})]}),(0,s.jsxs)(u.lG,{children:[(0,s.jsx)(u.zM,{asChild:!0,children:(0,s.jsx)(n.$,{onClick:()=>{let e=M.getValues("fullDescription");e=e.replace(/IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g,(e,t,r,s)=>{let i=k.find(e=>e.alt===t);return i?`IMG<${t},${i.src}${r?`,${r}`:""}${s?`,${s}`:""}>`:(D({title:"Error",description:`Image with alt "${t}" not found`,variant:"destructive"}),e)}),$((0,f.QH)(e))},className:"w-full",children:"Preview"})}),(0,s.jsxs)(u.Cf,{className:"max-w-4xl max-h-[80vh]",children:[(0,s.jsx)(u.c7,{children:(0,s.jsx)(u.L3,{children:"Product Description Preview"})}),(0,s.jsx)(p.F,{className:"h-full max-h-[calc(80vh-4rem)]",children:(0,s.jsx)(h.A,{content:I})})]})]})]})]}),(0,s.jsx)(d.zB,{control:M.control,name:"tags",render:({field:r})=>(0,s.jsxs)(d.eI,{children:[(0,s.jsx)(d.lR,{children:"Tags"}),(0,s.jsx)(d.MJ,{children:(0,s.jsx)(m.A,{tags:e,setTags:e=>{t(e),r.onChange(e)},isEditing:!0})}),(0,s.jsx)(d.Rr,{children:"Add tags to categorize the product."}),(0,s.jsx)(d.C5,{})]})}),(0,s.jsx)(n.$,{type:"submit",className:`${z?"bg-[#030391]/20 cursor-not-allowed hover:bg-[#030391]/20 active:bg-[#030391]/20":"bg-sub hover:bg-main/90 active:bg-main/95"} w-full relative`,children:z?(0,s.jsx)("div",{className:"absolute inset-0 flex items-center justify-center",children:(0,s.jsx)("div",{className:"animate-spin rounded-full h-3 w-3 border-b border-gray-900"})}):"Create Product"})]})})]})}},18742:(e,t,r)=>{"use strict";r.d(t,{O:()=>i,k:()=>l});var s=r(45512);r(58009);let i={black:"rgb(0, 0, 0)",yellow:"rgb(255, 255, 0)",violet:"rgb(138, 43, 226)",blue:"rgb(0, 0, 255)",green:"rgb(0, 128, 0)"},l=()=>(0,s.jsxs)("div",{className:"mt-8",children:[(0,s.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"Color Mapping"}),(0,s.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4",children:Object.entries(i).map(([e,t])=>(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsx)("div",{className:"w-6 h-6 rounded-full",style:{backgroundColor:t}}),(0,s.jsx)("span",{className:"capitalize",children:e}),(0,s.jsx)("span",{className:"text-sm text-gray-500",children:t})]},e))})]})},98831:(e,t,r)=>{"use strict";r.d(t,{$:()=>P});var s=r(45512),i=r(58009),l=r(29952),a=r(6004),n=r(31412),o=r(13024),c=r(66582),d=r(38762),u=r(98060),p=r(30830),m="Checkbox",[x,h]=(0,a.A)(m),[f,g]=x(m),j=i.forwardRef((e,t)=>{let{__scopeCheckbox:r,name:a,checked:c,defaultChecked:d,required:u,disabled:m,value:x="on",onCheckedChange:h,form:g,...j}=e,[v,b]=i.useState(null),E=(0,l.s)(t,e=>b(e)),C=i.useRef(!1),R=!v||g||!!v.closest("form"),[k=!1,P]=(0,o.i)({prop:c,defaultProp:d,onChange:h}),I=i.useRef(k);return i.useEffect(()=>{let e=v?.form;if(e){let t=()=>P(I.current);return e.addEventListener("reset",t),()=>e.removeEventListener("reset",t)}},[v,P]),(0,s.jsxs)(f,{scope:r,state:k,disabled:m,children:[(0,s.jsx)(p.sG.button,{type:"button",role:"checkbox","aria-checked":y(k)?"mixed":k,"aria-required":u,"data-state":N(k),"data-disabled":m?"":void 0,disabled:m,value:x,...j,ref:E,onKeyDown:(0,n.m)(e.onKeyDown,e=>{"Enter"===e.key&&e.preventDefault()}),onClick:(0,n.m)(e.onClick,e=>{P(e=>!!y(e)||!e),R&&(C.current=e.isPropagationStopped(),C.current||e.stopPropagation())})}),R&&(0,s.jsx)(w,{control:v,bubbles:!C.current,name:a,value:x,checked:k,required:u,disabled:m,form:g,style:{transform:"translateX(-100%)"},defaultChecked:!y(d)&&d})]})});j.displayName=m;var v="CheckboxIndicator",b=i.forwardRef((e,t)=>{let{__scopeCheckbox:r,forceMount:i,...l}=e,a=g(v,r);return(0,s.jsx)(u.C,{present:i||y(a.state)||!0===a.state,children:(0,s.jsx)(p.sG.span,{"data-state":N(a.state),"data-disabled":a.disabled?"":void 0,...l,ref:t,style:{pointerEvents:"none",...e.style}})})});b.displayName=v;var w=e=>{let{control:t,checked:r,bubbles:l=!0,defaultChecked:a,...n}=e,o=i.useRef(null),u=(0,c.Z)(r),p=(0,d.X)(t);i.useEffect(()=>{let e=o.current,t=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"checked").set;if(u!==r&&t){let s=new Event("click",{bubbles:l});e.indeterminate=y(r),t.call(e,!y(r)&&r),e.dispatchEvent(s)}},[u,r,l]);let m=i.useRef(!y(r)&&r);return(0,s.jsx)("input",{type:"checkbox","aria-hidden":!0,defaultChecked:a??m.current,...n,tabIndex:-1,ref:o,style:{...e.style,...p,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function y(e){return"indeterminate"===e}function N(e){return y(e)?"indeterminate":e?"checked":"unchecked"}var E=r(24999),C=r(59462);let R=i.forwardRef(({className:e,...t},r)=>(0,s.jsx)(j,{ref:r,className:(0,C.cn)("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...t,children:(0,s.jsx)(b,{className:(0,C.cn)("flex items-center justify-center text-current"),children:(0,s.jsx)(E.A,{className:"h-4 w-4"})})}));R.displayName=j.displayName;var k=r(94727);function P({name:e,items:t,control:r,isEditing:i=!1}){return(0,s.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",children:t.map(t=>(0,s.jsx)(k.zB,{control:r,name:e,render:({field:e})=>(0,s.jsxs)(k.eI,{className:"flex flex-row items-start space-x-3 space-y-0",children:[(0,s.jsx)(k.MJ,{children:(0,s.jsx)(R,{checked:e.value?.includes(t.id),onCheckedChange:r=>r?e.onChange([...e.value,t.id]):e.onChange(e.value?.filter(e=>e!==t.id)),disabled:!i})}),(0,s.jsx)(k.lR,{className:"font-normal",children:t.label})]},t.id)},t.id))})}},96050:(e,t,r)=>{"use strict";r.d(t,{GX:()=>i,Tq:()=>a,ih:()=>l,yJ:()=>s});let s=[{title:"Home",url:"/"},{title:"Shop",url:"/shop"},{title:"About",url:"/about"},{title:"Contact",url:"/contact"},{title:"Blog",url:"/blog"}],i=[{id:"compact",label:"Compact"},{id:"standard",label:"Standard"},{id:"large",label:"Large"},{id:"oversized",label:"Oversized"}],l=[{id:"black",label:"Black"},{id:"yellow",label:"Yellow"},{id:"violet",label:"Violet"},{id:"blue",label:"Blue"},{id:"green",label:"Green"}],a=[{title:"Dining",src:"/images/categories/categories-1.png",alt:"dining"},{title:"Living",src:"/images/categories/categories-2.png",alt:"living"},{title:"Bedroom",src:"/images/categories/categories-3.png",alt:"bedroom"}]},40393:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"W:\\\\web\\\\shop-co3049-fe\\\\app\\\\admin\\\\(main)\\\\products\\\\create\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"W:\\web\\shop-co3049-fe\\app\\admin\\(main)\\products\\create\\page.tsx","default")},66582:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var s=r(58009);function i(e){let t=s.useRef({value:e,previous:e});return s.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,9798,7180,4388,5103,9749,8310,6371,3998,6107,72,2130],()=>r(94537));module.exports=s})();
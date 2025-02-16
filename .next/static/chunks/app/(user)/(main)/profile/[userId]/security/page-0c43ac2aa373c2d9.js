(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3006],{92003:(e,t,r)=>{Promise.resolve().then(r.bind(r,56312))},56312:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>x});var s=r(95155);r(12115);var n=r(43415),a=r(85060),o=r(35408),i=r(80839),l=r(69606),d=r(14085),c=r(34839),u=r(9955),m=r(20241);let f=n.Ik({username:n.Yj().min(3),newUsername:n.Yj().min(3)}),p=n.Ik({password:n.Yj().min(8),newPassword:n.Yj().min(8)}),x=()=>{let{userId:e}=(0,i.A)(),{toast:t}=(0,m.dj)(),r=(0,l.mN)({resolver:(0,a.u)(f),defaultValues:{username:"",newUsername:""}}),n=async r=>{"error"in await (0,o.kZ)(e,r)?t({title:"Error",description:"An error occurred while updating your username.",variant:"destructive"}):t({title:"Success",description:"Your username has been updated."})},x=(0,l.mN)({resolver:(0,a.u)(p),defaultValues:{password:"",newPassword:""}}),v=async r=>{"error"in await (0,o.ej)(e,r)?t({title:"Error",description:"An error occurred while updating your password.",variant:"destructive"}):t({title:"Success",description:"Your password has been updated."})};return(0,s.jsxs)("div",{className:"w-full flex flex-col justify-start items-start space-y-10 max-md:space-y-6",children:[(0,s.jsx)("p",{className:"text-2xl font-bold",children:"Change credentials"}),(0,s.jsxs)("div",{className:"w-full flex flex-col justify-start items-start space-y-6",children:[(0,s.jsx)(c.lV,{...r,children:(0,s.jsxs)("form",{onSubmit:r.handleSubmit(n),className:" flex w-full max-md:flex-col max-md:justify-start max-md:items-center max-md:space-y-4 justify-between items-end md:space-x-4",children:[(0,s.jsx)(c.zB,{control:r.control,name:"username",render:e=>{let{field:t}=e;return(0,s.jsxs)(c.eI,{children:[(0,s.jsx)(c.lR,{children:"Username"}),(0,s.jsx)(u.p,{placeholder:"Current Username",...t})]})}}),(0,s.jsx)(c.zB,{control:r.control,name:"newUsername",render:e=>{let{field:t}=e;return(0,s.jsxs)(c.eI,{children:[(0,s.jsx)(c.lR,{children:"New Username"}),(0,s.jsx)(u.p,{placeholder:"New Username",...t})]})}}),(0,s.jsx)(d.$,{type:"submit",className:" max-md:w-full bg-sub hover:bg-[#b88e2f]/90",children:"Update Username"})]})}),(0,s.jsx)(c.lV,{...x,children:(0,s.jsxs)("form",{onSubmit:x.handleSubmit(v),className:"  flex w-full max-md:flex-col max-md:justify-start max-md:items-center max-md:space-y-4 justify-between items-end md:space-x-4",children:[(0,s.jsx)(c.zB,{control:x.control,name:"password",render:e=>{let{field:t}=e;return(0,s.jsxs)(c.eI,{children:[(0,s.jsx)(c.lR,{children:"Current password"}),(0,s.jsx)(u.p,{type:"password",placeholder:"Current password",...t})]})}}),(0,s.jsx)(c.zB,{control:x.control,name:"newPassword",render:e=>{let{field:t}=e;return(0,s.jsxs)(c.eI,{children:[(0,s.jsx)(c.lR,{children:"New password"}),(0,s.jsx)(u.p,{type:"password",placeholder:"New password",...t})]})}}),(0,s.jsx)(d.$,{type:"submit",className:"max-md:w-full bg-sub hover:bg-[#b88e2f]/90",children:"Update password"})]})})]})]})}},14085:(e,t,r)=>{"use strict";r.d(t,{$:()=>d,r:()=>l});var s=r(95155),n=r(12115),a=r(12317),o=r(31027),i=r(29602);let l=(0,o.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=n.forwardRef((e,t)=>{let{className:r,variant:n,size:o,asChild:d=!1,...c}=e,u=d?a.DX:"button";return(0,s.jsx)(u,{className:(0,i.cn)(l({variant:n,size:o,className:r})),ref:t,...c})});d.displayName="Button"},34839:(e,t,r)=>{"use strict";r.d(t,{C5:()=>b,MJ:()=>v,Rr:()=>h,eI:()=>p,lR:()=>x,lV:()=>d,zB:()=>u});var s=r(95155),n=r(12115),a=r(12317),o=r(69606),i=r(29602),l=r(15785);let d=o.Op,c=n.createContext({}),u=e=>{let{...t}=e;return(0,s.jsx)(c.Provider,{value:{name:t.name},children:(0,s.jsx)(o.xI,{...t})})},m=()=>{let e=n.useContext(c),t=n.useContext(f),{getFieldState:r,formState:s}=(0,o.xW)(),a=r(e.name,s);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=t;return{id:i,name:e.name,formItemId:"".concat(i,"-form-item"),formDescriptionId:"".concat(i,"-form-item-description"),formMessageId:"".concat(i,"-form-item-message"),...a}},f=n.createContext({}),p=n.forwardRef((e,t)=>{let{className:r,...a}=e,o=n.useId();return(0,s.jsx)(f.Provider,{value:{id:o},children:(0,s.jsx)("div",{ref:t,className:(0,i.cn)("space-y-2",r),...a})})});p.displayName="FormItem";let x=n.forwardRef((e,t)=>{let{className:r,...n}=e,{error:a,formItemId:o}=m();return(0,s.jsx)(l.J,{ref:t,className:(0,i.cn)(a&&"text-destructive",r),htmlFor:o,...n})});x.displayName="FormLabel";let v=n.forwardRef((e,t)=>{let{...r}=e,{error:n,formItemId:o,formDescriptionId:i,formMessageId:l}=m();return(0,s.jsx)(a.DX,{ref:t,id:o,"aria-describedby":n?"".concat(i," ").concat(l):"".concat(i),"aria-invalid":!!n,...r})});v.displayName="FormControl";let h=n.forwardRef((e,t)=>{let{className:r,...n}=e,{formDescriptionId:a}=m();return(0,s.jsx)("p",{ref:t,id:a,className:(0,i.cn)("text-[0.8rem] text-muted-foreground",r),...n})});h.displayName="FormDescription";let b=n.forwardRef((e,t)=>{let{className:r,children:n,...a}=e,{error:o,formMessageId:l}=m(),d=o?String(null==o?void 0:o.message):n;return d?(0,s.jsx)("p",{ref:t,id:l,className:(0,i.cn)("text-[0.8rem] font-medium text-destructive",r),...a,children:d}):null});b.displayName="FormMessage"},9955:(e,t,r)=>{"use strict";r.d(t,{p:()=>o});var s=r(95155),n=r(12115),a=r(29602);let o=n.forwardRef((e,t)=>{let{className:r,type:n,...o}=e;return(0,s.jsx)("input",{type:n,className:(0,a.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...o})});o.displayName="Input"},15785:(e,t,r)=>{"use strict";r.d(t,{J:()=>d});var s=r(95155),n=r(12115),a=r(46195),o=r(31027),i=r(29602);let l=(0,o.F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),d=n.forwardRef((e,t)=>{let{className:r,...n}=e;return(0,s.jsx)(a.b,{ref:t,className:(0,i.cn)(l(),r),...n})});d.displayName=a.b.displayName},20241:(e,t,r)=>{"use strict";r.d(t,{dj:()=>m});var s=r(12115);let n=0,a=new Map,o=e=>{if(a.has(e))return;let t=setTimeout(()=>{a.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);a.set(e,t)},i=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:r}=t;return r?o(r):e.toasts.forEach(e=>{o(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},l=[],d={toasts:[]};function c(e){d=i(d,e),l.forEach(e=>{e(d)})}function u(e){let{...t}=e,r=(n=(n+1)%Number.MAX_SAFE_INTEGER).toString(),s=()=>c({type:"DISMISS_TOAST",toastId:r});return c({type:"ADD_TOAST",toast:{...t,id:r,open:!0,onOpenChange:e=>{e||s()}}}),{id:r,dismiss:s,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:r}})}}function m(){let[e,t]=s.useState(d);return s.useEffect(()=>(l.push(t),()=>{let e=l.indexOf(t);e>-1&&l.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},23360:(e,t,r)=>{"use strict";r.d(t,{hO:()=>l,sG:()=>i});var s=r(12115),n=r(47650),a=r(12317),o=r(95155),i=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let r=s.forwardRef((e,r)=>{let{asChild:s,...n}=e,i=s?a.DX:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,o.jsx)(i,{...n,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function l(e,t){e&&n.flushSync(()=>e.dispatchEvent(t))}},31027:(e,t,r)=>{"use strict";r.d(t,{F:()=>o});var s=r(43463);let n=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,a=s.$,o=(e,t)=>r=>{var s;if((null==t?void 0:t.variants)==null)return a(e,null==r?void 0:r.class,null==r?void 0:r.className);let{variants:o,defaultVariants:i}=t,l=Object.keys(o).map(e=>{let t=null==r?void 0:r[e],s=null==i?void 0:i[e];if(null===t)return null;let a=n(t)||n(s);return o[e][a]}),d=r&&Object.entries(r).reduce((e,t)=>{let[r,s]=t;return void 0===s||(e[r]=s),e},{});return a(e,l,null==t?void 0:null===(s=t.compoundVariants)||void 0===s?void 0:s.reduce((e,t)=>{let{class:r,className:s,...n}=t;return Object.entries(n).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...i,...d}[t]):({...i,...d})[t]===r})?[...e,r,s]:e},[]),null==r?void 0:r.class,null==r?void 0:r.className)}},89208:(e,t,r)=>{"use strict";function s(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)e[s]=r[s]}return e}r.d(t,{A:()=>n});var n=function e(t,r){function n(e,n,a){if("undefined"!=typeof document){"number"==typeof(a=s({},r,a)).expires&&(a.expires=new Date(Date.now()+864e5*a.expires)),a.expires&&(a.expires=a.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var o="";for(var i in a)a[i]&&(o+="; "+i,!0!==a[i]&&(o+="="+a[i].split(";")[0]));return document.cookie=e+"="+t.write(n,e)+o}}return Object.create({set:n,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var r=document.cookie?document.cookie.split("; "):[],s={},n=0;n<r.length;n++){var a=r[n].split("="),o=a.slice(1).join("=");try{var i=decodeURIComponent(a[0]);if(s[i]=t.read(o,i),e===i)break}catch(e){}}return e?s[e]:s}},remove:function(e,t){n(e,"",s({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,s({},this.attributes,t))},withConverter:function(t){return e(s({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}},e=>{var t=t=>e(e.s=t);e.O(0,[2651,1345,7518,7872,8441,1517,7358],()=>t(92003)),_N_E=e.O()}]);
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7929],{70356:(e,t,r)=>{Promise.resolve().then(r.bind(r,92887))},92887:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var a=r(95155),s=r(12115),l=r(22949),n=r(58878),i=r(18652),o=r(9955),d=r(50745),c=r(81453);let u=()=>{let[e,t]=(0,s.useState)([]),[r,u]=(0,s.useState)([]),[f,v]=(0,s.useState)(!0),[m,h]=(0,s.useState)(""),[x,p]=(0,s.useState)("date"),[g,y]=(0,s.useState)("all"),[b,j]=(0,s.useState)(1),[w,N]=(0,s.useState)(1);(0,s.useEffect)(()=>{(0,l.zu)().then(e=>{"error"in e?console.error(e.error):(console.log("Reviews:",e),t(e))}),(0,i.Fo)().then(e=>{"error"in e?console.error(e.error):u(e)}),v(!1)},[]),(0,s.useEffect)(()=>{N(Math.ceil(e.length/10))},[e]);let C=e.filter(e=>(e.comment+e.productId+e.reviewer).includes(m)&&"all"===g).sort((e,t)=>"date"===x?new Date(t.date).getTime()-new Date(e.date).getTime():"rating"===x?t.rating-e.rating:0);if(f)return(0,a.jsx)("div",{children:"Loading..."});let k=C.slice((b-1)*10,10*b);return(0,a.jsxs)("div",{className:"w-full flex flex-col justify-start items-start",children:[(0,a.jsx)("p",{className:"text-2xl font-bold",children:"Reviews management"}),(0,a.jsxs)("div",{className:"flex justify-between mb-4 w-full",children:[(0,a.jsx)(o.p,{placeholder:"Search by Reviewer, User ID, product ID or Comment",value:m,onChange:e=>h(e.target.value),className:"max-w-sm"}),(0,a.jsx)("div",{className:"flex gap-2",children:(0,a.jsxs)(d.l6,{value:x,onValueChange:p,children:[(0,a.jsx)(d.bq,{className:"w-[180px]",children:(0,a.jsx)(d.yv,{placeholder:"Sort by"})}),(0,a.jsxs)(d.gC,{children:[(0,a.jsx)(d.eb,{value:"date",children:"Created"}),(0,a.jsx)(d.eb,{value:"rating",children:"Rating"})]})]})})]}),(0,a.jsx)(n.A,{reviews:k,products:r,admin:!0}),(0,a.jsx)(c.dK,{className:"mt-4",children:(0,a.jsxs)(c.Iu,{children:[(0,a.jsx)(c.cU,{children:(0,a.jsx)(c.Eb,{onClick:()=>j(e=>Math.max(e-1,1)),isActive:1!==b})}),[...Array(w)].map((e,t)=>(0,a.jsx)(c.cU,{children:(0,a.jsx)(c.n$,{onClick:()=>j(t+1),isActive:b===t+1,children:t+1})},t)),(0,a.jsx)(c.cU,{children:(0,a.jsx)(c.WA,{onClick:()=>j(e=>Math.min(e+1,w)),isActive:b!==w})})]})})]})}},14085:(e,t,r)=>{"use strict";r.d(t,{$:()=>d,r:()=>o});var a=r(95155),s=r(12115),l=r(12317),n=r(31027),i=r(29602);let o=(0,n.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=s.forwardRef((e,t)=>{let{className:r,variant:s,size:n,asChild:d=!1,...c}=e,u=d?l.DX:"button";return(0,a.jsx)(u,{className:(0,i.cn)(o({variant:s,size:n,className:r})),ref:t,...c})});d.displayName="Button"},35007:(e,t,r)=>{"use strict";r.d(t,{BT:()=>d,Wu:()=>c,ZB:()=>o,Zp:()=>n,aR:()=>i,wL:()=>u});var a=r(95155),s=r(12115),l=r(29602);let n=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("rounded-xl border bg-card text-card-foreground shadow",r),...s})});n.displayName="Card";let i=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("flex flex-col space-y-1.5 p-6",r),...s})});i.displayName="CardHeader";let o=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("font-semibold leading-none tracking-tight",r),...s})});o.displayName="CardTitle";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("text-sm text-muted-foreground",r),...s})});d.displayName="CardDescription";let c=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("p-6 pt-0",r),...s})});c.displayName="CardContent";let u=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)("div",{ref:t,className:(0,l.cn)("flex items-center p-6 pt-0",r),...s})});u.displayName="CardFooter"},45353:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return s}});let a=r(12115);function s(e,t){let r=(0,a.useRef)(()=>{}),s=(0,a.useRef)(()=>{});return(0,a.useMemo)(()=>e&&t?a=>{null===a?(r.current(),s.current()):(r.current=l(e,a),s.current=l(t,a))}:e||t,[e,t])}function l(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},61786:(e,t,r)=>{"use strict";function a(e,[t,r]){return Math.min(r,Math.max(t,e))}r.d(t,{q:()=>a})},4256:(e,t,r)=>{"use strict";r.d(t,{jH:()=>l});var a=r(12115);r(95155);var s=a.createContext(void 0);function l(e){let t=a.useContext(s);return e||t||"ltr"}},90434:(e,t,r)=>{"use strict";r.d(t,{b:()=>d});var a=r(12115),s=r(23360),l=r(95155),n="horizontal",i=["horizontal","vertical"],o=a.forwardRef((e,t)=>{let{decorative:r,orientation:a=n,...o}=e,d=i.includes(a)?a:n;return(0,l.jsx)(s.sG.div,{"data-orientation":d,...r?{role:"none"}:{"aria-orientation":"vertical"===d?d:void 0,role:"separator"},...o,ref:t})});o.displayName="Separator";var d=o},31027:(e,t,r)=>{"use strict";r.d(t,{F:()=>n});var a=r(43463);let s=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,l=a.$,n=(e,t)=>r=>{var a;if((null==t?void 0:t.variants)==null)return l(e,null==r?void 0:r.class,null==r?void 0:r.className);let{variants:n,defaultVariants:i}=t,o=Object.keys(n).map(e=>{let t=null==r?void 0:r[e],a=null==i?void 0:i[e];if(null===t)return null;let l=s(t)||s(a);return n[e][l]}),d=r&&Object.entries(r).reduce((e,t)=>{let[r,a]=t;return void 0===a||(e[r]=a),e},{});return l(e,o,null==t?void 0:null===(a=t.compoundVariants)||void 0===a?void 0:a.reduce((e,t)=>{let{class:r,className:a,...s}=t;return Object.entries(s).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...i,...d}[t]):({...i,...d})[t]===r})?[...e,r,a]:e},[]),null==r?void 0:r.class,null==r?void 0:r.className)}},25012:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(14057).A)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]])},15325:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(14057).A)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},80368:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(14057).A)("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]])},26039:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});let a=(0,r(14057).A)("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])}},e=>{var t=t=>e(e.s=t);e.O(0,[2651,1345,1080,914,8173,9895,6412,2759,8441,1517,7358],()=>t(70356)),_N_E=e.O()}]);
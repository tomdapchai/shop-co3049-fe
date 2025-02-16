"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9781],{76046:(e,t,r)=>{var a=r(66658);r.o(a,"useParams")&&r.d(t,{useParams:function(){return a.useParams}}),r.o(a,"usePathname")&&r.d(t,{usePathname:function(){return a.usePathname}}),r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}}),r.o(a,"useSearchParams")&&r.d(t,{useSearchParams:function(){return a.useSearchParams}})},67357:(e,t,r)=>{r.d(t,{RG:()=>R,bL:()=>E,q7:()=>G});var a=r(12115),n=r(93610),o=r(49741),i=r(88068),s=r(18166),l=r(67668),u=r(23360),c=r(41524),d=r(1488),f=r(4256),v=r(95155),m="rovingFocusGroup.onEntryFocus",p={bubbles:!1,cancelable:!0},h="RovingFocusGroup",[b,w,y]=(0,o.N)(h),[g,R]=(0,s.A)(h,[y]),[x,A]=g(h),C=a.forwardRef((e,t)=>(0,v.jsx)(b.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,v.jsx)(b.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,v.jsx)(j,{...e,ref:t})})}));C.displayName=h;var j=a.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:r,orientation:o,loop:s=!1,dir:l,currentTabStopId:h,defaultCurrentTabStopId:b,onCurrentTabStopIdChange:y,onEntryFocus:g,preventScrollOnEntryFocus:R=!1,...A}=e,C=a.useRef(null),j=(0,i.s)(t,C),F=(0,f.jH)(l),[I=null,k]=(0,d.i)({prop:h,defaultProp:b,onChange:y}),[E,G]=a.useState(!1),P=(0,c.c)(g),T=w(r),L=a.useRef(!1),[S,K]=a.useState(0);return a.useEffect(()=>{let e=C.current;if(e)return e.addEventListener(m,P),()=>e.removeEventListener(m,P)},[P]),(0,v.jsx)(x,{scope:r,orientation:o,dir:F,loop:s,currentTabStopId:I,onItemFocus:a.useCallback(e=>k(e),[k]),onItemShiftTab:a.useCallback(()=>G(!0),[]),onFocusableItemAdd:a.useCallback(()=>K(e=>e+1),[]),onFocusableItemRemove:a.useCallback(()=>K(e=>e-1),[]),children:(0,v.jsx)(u.sG.div,{tabIndex:E||0===S?-1:0,"data-orientation":o,...A,ref:j,style:{outline:"none",...e.style},onMouseDown:(0,n.m)(e.onMouseDown,()=>{L.current=!0}),onFocus:(0,n.m)(e.onFocus,e=>{let t=!L.current;if(e.target===e.currentTarget&&t&&!E){let t=new CustomEvent(m,p);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=T().filter(e=>e.focusable);D([e.find(e=>e.active),e.find(e=>e.id===I),...e].filter(Boolean).map(e=>e.ref.current),R)}}L.current=!1}),onBlur:(0,n.m)(e.onBlur,()=>G(!1))})})}),F="RovingFocusGroupItem",I=a.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:r,focusable:o=!0,active:i=!1,tabStopId:s,...c}=e,d=(0,l.B)(),f=s||d,m=A(F,r),p=m.currentTabStopId===f,h=w(r),{onFocusableItemAdd:y,onFocusableItemRemove:g}=m;return a.useEffect(()=>{if(o)return y(),()=>g()},[o,y,g]),(0,v.jsx)(b.ItemSlot,{scope:r,id:f,focusable:o,active:i,children:(0,v.jsx)(u.sG.span,{tabIndex:p?0:-1,"data-orientation":m.orientation,...c,ref:t,onMouseDown:(0,n.m)(e.onMouseDown,e=>{o?m.onItemFocus(f):e.preventDefault()}),onFocus:(0,n.m)(e.onFocus,()=>m.onItemFocus(f)),onKeyDown:(0,n.m)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){m.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=function(e,t,r){var a;let n=(a=e.key,"rtl"!==r?a:"ArrowLeft"===a?"ArrowRight":"ArrowRight"===a?"ArrowLeft":a);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(n))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(n)))return k[n]}(e,m.orientation,m.dir);if(void 0!==t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let r=h().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)r.reverse();else if("prev"===t||"next"===t){"prev"===t&&r.reverse();let a=r.indexOf(e.currentTarget);r=m.loop?function(e,t){return e.map((r,a)=>e[(t+a)%e.length])}(r,a+1):r.slice(a+1)}setTimeout(()=>D(r))}})})})});I.displayName=F;var k={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function D(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=document.activeElement;for(let a of e)if(a===r||(a.focus({preventScroll:t}),document.activeElement!==r))return}var E=C,G=I},90434:(e,t,r)=>{r.d(t,{b:()=>u});var a=r(12115),n=r(23360),o=r(95155),i="horizontal",s=["horizontal","vertical"],l=a.forwardRef((e,t)=>{let{decorative:r,orientation:a=i,...l}=e,u=s.includes(a)?a:i;return(0,o.jsx)(n.sG.div,{"data-orientation":u,...r?{role:"none"}:{"aria-orientation":"vertical"===u?u:void 0,role:"separator"},...l,ref:t})});l.displayName="Separator";var u=l},58629:(e,t,r)=>{r.d(t,{B8:()=>D,UC:()=>G,bL:()=>k,l9:()=>E});var a=r(12115),n=r(93610),o=r(18166),i=r(67357),s=r(17028),l=r(23360),u=r(4256),c=r(1488),d=r(67668),f=r(95155),v="Tabs",[m,p]=(0,o.A)(v,[i.RG]),h=(0,i.RG)(),[b,w]=m(v),y=a.forwardRef((e,t)=>{let{__scopeTabs:r,value:a,onValueChange:n,defaultValue:o,orientation:i="horizontal",dir:s,activationMode:v="automatic",...m}=e,p=(0,u.jH)(s),[h,w]=(0,c.i)({prop:a,onChange:n,defaultProp:o});return(0,f.jsx)(b,{scope:r,baseId:(0,d.B)(),value:h,onValueChange:w,orientation:i,dir:p,activationMode:v,children:(0,f.jsx)(l.sG.div,{dir:p,"data-orientation":i,...m,ref:t})})});y.displayName=v;var g="TabsList",R=a.forwardRef((e,t)=>{let{__scopeTabs:r,loop:a=!0,...n}=e,o=w(g,r),s=h(r);return(0,f.jsx)(i.bL,{asChild:!0,...s,orientation:o.orientation,dir:o.dir,loop:a,children:(0,f.jsx)(l.sG.div,{role:"tablist","aria-orientation":o.orientation,...n,ref:t})})});R.displayName=g;var x="TabsTrigger",A=a.forwardRef((e,t)=>{let{__scopeTabs:r,value:a,disabled:o=!1,...s}=e,u=w(x,r),c=h(r),d=F(u.baseId,a),v=I(u.baseId,a),m=a===u.value;return(0,f.jsx)(i.q7,{asChild:!0,...c,focusable:!o,active:m,children:(0,f.jsx)(l.sG.button,{type:"button",role:"tab","aria-selected":m,"aria-controls":v,"data-state":m?"active":"inactive","data-disabled":o?"":void 0,disabled:o,id:d,...s,ref:t,onMouseDown:(0,n.m)(e.onMouseDown,e=>{o||0!==e.button||!1!==e.ctrlKey?e.preventDefault():u.onValueChange(a)}),onKeyDown:(0,n.m)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&u.onValueChange(a)}),onFocus:(0,n.m)(e.onFocus,()=>{let e="manual"!==u.activationMode;m||o||!e||u.onValueChange(a)})})})});A.displayName=x;var C="TabsContent",j=a.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,forceMount:o,children:i,...u}=e,c=w(C,r),d=F(c.baseId,n),v=I(c.baseId,n),m=n===c.value,p=a.useRef(m);return a.useEffect(()=>{let e=requestAnimationFrame(()=>p.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,f.jsx)(s.C,{present:o||m,children:r=>{let{present:a}=r;return(0,f.jsx)(l.sG.div,{"data-state":m?"active":"inactive","data-orientation":c.orientation,role:"tabpanel","aria-labelledby":d,hidden:!a,id:v,tabIndex:0,...u,ref:t,style:{...e.style,animationDuration:p.current?"0s":void 0},children:a&&i})}})});function F(e,t){return"".concat(e,"-trigger-").concat(t)}function I(e,t){return"".concat(e,"-content-").concat(t)}j.displayName=C;var k=y,D=R,E=A,G=j},25012:(e,t,r)=>{r.d(t,{A:()=>a});let a=(0,r(14057).A)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]])},15325:(e,t,r)=>{r.d(t,{A:()=>a});let a=(0,r(14057).A)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},80368:(e,t,r)=>{r.d(t,{A:()=>a});let a=(0,r(14057).A)("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]])},26039:(e,t,r)=>{r.d(t,{A:()=>a});let a=(0,r(14057).A)("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])}}]);
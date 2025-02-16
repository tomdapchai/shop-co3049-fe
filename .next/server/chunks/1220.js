"use strict";exports.id=1220,exports.ids=[1220],exports.modules={81477:(e,t,r)=>{r.d(t,{In:()=>eD,JU:()=>eB,LM:()=>eA,PP:()=>eG,UC:()=>eM,VF:()=>eF,WT:()=>eE,YJ:()=>eH,ZL:()=>eL,bL:()=>eP,l9:()=>eI,p4:()=>eV,q7:()=>e_,wn:()=>eK,wv:()=>eO});var n=r(58009),l=r(55740),o=r(29374),a=r(31412),i=r(39217),s=r(29952),d=r(6004),u=r(59018),c=r(41675),p=r(19632),f=r(82534),h=r(30096),v=r(53337),m=r(80707),w=r(30830),g=r(12705),x=r(92828),y=r(13024),S=r(49397),b=r(66582),C=r(56441),j=r(72421),T=r(8523),k=r(45512),N=[" ","Enter","ArrowUp","ArrowDown"],R=[" ","Enter"],P="Select",[I,E,D]=(0,i.N)(P),[L,M]=(0,d.A)(P,[D,v.Bk]),A=(0,v.Bk)(),[H,B]=L(P),[_,V]=L(P),F=e=>{let{__scopeSelect:t,children:r,open:l,defaultOpen:o,onOpenChange:a,value:i,defaultValue:s,onValueChange:d,dir:c,name:p,autoComplete:f,disabled:m,required:w,form:g}=e,x=A(t),[S,b]=n.useState(null),[C,j]=n.useState(null),[T,N]=n.useState(!1),R=(0,u.jH)(c),[P=!1,E]=(0,y.i)({prop:l,defaultProp:o,onChange:a}),[D,L]=(0,y.i)({prop:i,defaultProp:s,onChange:d}),M=n.useRef(null),B=!S||g||!!S.closest("form"),[V,F]=n.useState(new Set),G=Array.from(V).map(e=>e.props.value).join(";");return(0,k.jsx)(v.bL,{...x,children:(0,k.jsxs)(H,{required:w,scope:t,trigger:S,onTriggerChange:b,valueNode:C,onValueNodeChange:j,valueNodeHasChildren:T,onValueNodeHasChildrenChange:N,contentId:(0,h.B)(),value:D,onValueChange:L,open:P,onOpenChange:E,dir:R,triggerPointerDownPosRef:M,disabled:m,children:[(0,k.jsx)(I.Provider,{scope:t,children:(0,k.jsx)(_,{scope:e.__scopeSelect,onNativeOptionAdd:n.useCallback(e=>{F(t=>new Set(t).add(e))},[]),onNativeOptionRemove:n.useCallback(e=>{F(t=>{let r=new Set(t);return r.delete(e),r})},[]),children:r})}),B?(0,k.jsxs)(ek,{"aria-hidden":!0,required:w,tabIndex:-1,name:p,autoComplete:f,value:D,onChange:e=>L(e.target.value),disabled:m,form:g,children:[void 0===D?(0,k.jsx)("option",{value:""}):null,Array.from(V)]},G):null]})})};F.displayName=P;var G="SelectTrigger",K=n.forwardRef((e,t)=>{let{__scopeSelect:r,disabled:l=!1,...o}=e,i=A(r),d=B(G,r),u=d.disabled||l,c=(0,s.s)(t,d.onTriggerChange),p=E(r),f=n.useRef("touch"),[h,m,g]=eN(e=>{let t=p().filter(e=>!e.disabled),r=t.find(e=>e.value===d.value),n=eR(t,e,r);void 0!==n&&d.onValueChange(n.value)}),x=e=>{u||(d.onOpenChange(!0),g()),e&&(d.triggerPointerDownPosRef.current={x:Math.round(e.pageX),y:Math.round(e.pageY)})};return(0,k.jsx)(v.Mz,{asChild:!0,...i,children:(0,k.jsx)(w.sG.button,{type:"button",role:"combobox","aria-controls":d.contentId,"aria-expanded":d.open,"aria-required":d.required,"aria-autocomplete":"none",dir:d.dir,"data-state":d.open?"open":"closed",disabled:u,"data-disabled":u?"":void 0,"data-placeholder":eT(d.value)?"":void 0,...o,ref:c,onClick:(0,a.m)(o.onClick,e=>{e.currentTarget.focus(),"mouse"!==f.current&&x(e)}),onPointerDown:(0,a.m)(o.onPointerDown,e=>{f.current=e.pointerType;let t=e.target;t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId),0===e.button&&!1===e.ctrlKey&&"mouse"===e.pointerType&&(x(e),e.preventDefault())}),onKeyDown:(0,a.m)(o.onKeyDown,e=>{let t=""!==h.current;e.ctrlKey||e.altKey||e.metaKey||1!==e.key.length||m(e.key),(!t||" "!==e.key)&&N.includes(e.key)&&(x(),e.preventDefault())})})})});K.displayName=G;var O="SelectValue",U=n.forwardRef((e,t)=>{let{__scopeSelect:r,className:n,style:l,children:o,placeholder:a="",...i}=e,d=B(O,r),{onValueNodeHasChildrenChange:u}=d,c=void 0!==o,p=(0,s.s)(t,d.onValueNodeChange);return(0,S.N)(()=>{u(c)},[u,c]),(0,k.jsx)(w.sG.span,{...i,ref:p,style:{pointerEvents:"none"},children:eT(d.value)?(0,k.jsx)(k.Fragment,{children:a}):o})});U.displayName=O;var W=n.forwardRef((e,t)=>{let{__scopeSelect:r,children:n,...l}=e;return(0,k.jsx)(w.sG.span,{"aria-hidden":!0,...l,ref:t,children:n||"▼"})});W.displayName="SelectIcon";var q=e=>(0,k.jsx)(m.Z,{asChild:!0,...e});q.displayName="SelectPortal";var z="SelectContent",Z=n.forwardRef((e,t)=>{let r=B(z,e.__scopeSelect),[o,a]=n.useState();return((0,S.N)(()=>{a(new DocumentFragment)},[]),r.open)?(0,k.jsx)(J,{...e,ref:t}):o?l.createPortal((0,k.jsx)(X,{scope:e.__scopeSelect,children:(0,k.jsx)(I.Slot,{scope:e.__scopeSelect,children:(0,k.jsx)("div",{children:e.children})})}),o):null});Z.displayName=z;var[X,Y]=L(z),J=n.forwardRef((e,t)=>{let{__scopeSelect:r,position:l="item-aligned",onCloseAutoFocus:o,onEscapeKeyDown:i,onPointerDownOutside:d,side:u,sideOffset:h,align:v,alignOffset:m,arrowPadding:w,collisionBoundary:x,collisionPadding:y,sticky:S,hideWhenDetached:b,avoidCollisions:C,...N}=e,R=B(z,r),[P,I]=n.useState(null),[D,L]=n.useState(null),M=(0,s.s)(t,e=>I(e)),[A,H]=n.useState(null),[_,V]=n.useState(null),F=E(r),[G,K]=n.useState(!1),O=n.useRef(!1);n.useEffect(()=>{if(P)return(0,j.Eq)(P)},[P]),(0,p.Oh)();let U=n.useCallback(e=>{let[t,...r]=F().map(e=>e.ref.current),[n]=r.slice(-1),l=document.activeElement;for(let r of e)if(r===l||(r?.scrollIntoView({block:"nearest"}),r===t&&D&&(D.scrollTop=0),r===n&&D&&(D.scrollTop=D.scrollHeight),r?.focus(),document.activeElement!==l))return},[F,D]),W=n.useCallback(()=>U([A,P]),[U,A,P]);n.useEffect(()=>{G&&W()},[G,W]);let{onOpenChange:q,triggerPointerDownPosRef:Z}=R;n.useEffect(()=>{if(P){let e={x:0,y:0},t=t=>{e={x:Math.abs(Math.round(t.pageX)-(Z.current?.x??0)),y:Math.abs(Math.round(t.pageY)-(Z.current?.y??0))}},r=r=>{e.x<=10&&e.y<=10?r.preventDefault():P.contains(r.target)||q(!1),document.removeEventListener("pointermove",t),Z.current=null};return null!==Z.current&&(document.addEventListener("pointermove",t),document.addEventListener("pointerup",r,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",t),document.removeEventListener("pointerup",r,{capture:!0})}}},[P,q,Z]),n.useEffect(()=>{let e=()=>q(!1);return window.addEventListener("blur",e),window.addEventListener("resize",e),()=>{window.removeEventListener("blur",e),window.removeEventListener("resize",e)}},[q]);let[Y,J]=eN(e=>{let t=F().filter(e=>!e.disabled),r=t.find(e=>e.ref.current===document.activeElement),n=eR(t,e,r);n&&setTimeout(()=>n.ref.current.focus())}),ee=n.useCallback((e,t,r)=>{let n=!O.current&&!r;(void 0!==R.value&&R.value===t||n)&&(H(e),n&&(O.current=!0))},[R.value]),et=n.useCallback(()=>P?.focus(),[P]),er=n.useCallback((e,t,r)=>{let n=!O.current&&!r;(void 0!==R.value&&R.value===t||n)&&V(e)},[R.value]),en="popper"===l?$:Q,el=en===$?{side:u,sideOffset:h,align:v,alignOffset:m,arrowPadding:w,collisionBoundary:x,collisionPadding:y,sticky:S,hideWhenDetached:b,avoidCollisions:C}:{};return(0,k.jsx)(X,{scope:r,content:P,viewport:D,onViewportChange:L,itemRefCallback:ee,selectedItem:A,onItemLeave:et,itemTextRefCallback:er,focusSelectedItem:W,selectedItemText:_,position:l,isPositioned:G,searchRef:Y,children:(0,k.jsx)(T.A,{as:g.DX,allowPinchZoom:!0,children:(0,k.jsx)(f.n,{asChild:!0,trapped:R.open,onMountAutoFocus:e=>{e.preventDefault()},onUnmountAutoFocus:(0,a.m)(o,e=>{R.trigger?.focus({preventScroll:!0}),e.preventDefault()}),children:(0,k.jsx)(c.qW,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:i,onPointerDownOutside:d,onFocusOutside:e=>e.preventDefault(),onDismiss:()=>R.onOpenChange(!1),children:(0,k.jsx)(en,{role:"listbox",id:R.contentId,"data-state":R.open?"open":"closed",dir:R.dir,onContextMenu:e=>e.preventDefault(),...N,...el,onPlaced:()=>K(!0),ref:M,style:{display:"flex",flexDirection:"column",outline:"none",...N.style},onKeyDown:(0,a.m)(N.onKeyDown,e=>{let t=e.ctrlKey||e.altKey||e.metaKey;if("Tab"===e.key&&e.preventDefault(),t||1!==e.key.length||J(e.key),["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let t=F().filter(e=>!e.disabled).map(e=>e.ref.current);if(["ArrowUp","End"].includes(e.key)&&(t=t.slice().reverse()),["ArrowUp","ArrowDown"].includes(e.key)){let r=e.target,n=t.indexOf(r);t=t.slice(n+1)}setTimeout(()=>U(t)),e.preventDefault()}})})})})})})});J.displayName="SelectContentImpl";var Q=n.forwardRef((e,t)=>{let{__scopeSelect:r,onPlaced:l,...a}=e,i=B(z,r),d=Y(z,r),[u,c]=n.useState(null),[p,f]=n.useState(null),h=(0,s.s)(t,e=>f(e)),v=E(r),m=n.useRef(!1),g=n.useRef(!0),{viewport:x,selectedItem:y,selectedItemText:b,focusSelectedItem:C}=d,j=n.useCallback(()=>{if(i.trigger&&i.valueNode&&u&&p&&x&&y&&b){let e=i.trigger.getBoundingClientRect(),t=p.getBoundingClientRect(),r=i.valueNode.getBoundingClientRect(),n=b.getBoundingClientRect();if("rtl"!==i.dir){let l=n.left-t.left,a=r.left-l,i=e.left-a,s=e.width+i,d=Math.max(s,t.width),c=window.innerWidth-10,p=(0,o.q)(a,[10,Math.max(10,c-d)]);u.style.minWidth=s+"px",u.style.left=p+"px"}else{let l=t.right-n.right,a=window.innerWidth-r.right-l,i=window.innerWidth-e.right-a,s=e.width+i,d=Math.max(s,t.width),c=window.innerWidth-10,p=(0,o.q)(a,[10,Math.max(10,c-d)]);u.style.minWidth=s+"px",u.style.right=p+"px"}let a=v(),s=window.innerHeight-20,d=x.scrollHeight,c=window.getComputedStyle(p),f=parseInt(c.borderTopWidth,10),h=parseInt(c.paddingTop,10),w=parseInt(c.borderBottomWidth,10),g=f+h+d+parseInt(c.paddingBottom,10)+w,S=Math.min(5*y.offsetHeight,g),C=window.getComputedStyle(x),j=parseInt(C.paddingTop,10),T=parseInt(C.paddingBottom,10),k=e.top+e.height/2-10,N=y.offsetHeight/2,R=f+h+(y.offsetTop+N);if(R<=k){let e=a.length>0&&y===a[a.length-1].ref.current;u.style.bottom="0px";let t=Math.max(s-k,N+(e?T:0)+(p.clientHeight-x.offsetTop-x.offsetHeight)+w);u.style.height=R+t+"px"}else{let e=a.length>0&&y===a[0].ref.current;u.style.top="0px";let t=Math.max(k,f+x.offsetTop+(e?j:0)+N);u.style.height=t+(g-R)+"px",x.scrollTop=R-k+x.offsetTop}u.style.margin="10px 0",u.style.minHeight=S+"px",u.style.maxHeight=s+"px",l?.(),requestAnimationFrame(()=>m.current=!0)}},[v,i.trigger,i.valueNode,u,p,x,y,b,i.dir,l]);(0,S.N)(()=>j(),[j]);let[T,N]=n.useState();(0,S.N)(()=>{p&&N(window.getComputedStyle(p).zIndex)},[p]);let R=n.useCallback(e=>{e&&!0===g.current&&(j(),C?.(),g.current=!1)},[j,C]);return(0,k.jsx)(ee,{scope:r,contentWrapper:u,shouldExpandOnScrollRef:m,onScrollButtonChange:R,children:(0,k.jsx)("div",{ref:c,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:T},children:(0,k.jsx)(w.sG.div,{...a,ref:h,style:{boxSizing:"border-box",maxHeight:"100%",...a.style}})})})});Q.displayName="SelectItemAlignedPosition";var $=n.forwardRef((e,t)=>{let{__scopeSelect:r,align:n="start",collisionPadding:l=10,...o}=e,a=A(r);return(0,k.jsx)(v.UC,{...a,...o,ref:t,align:n,collisionPadding:l,style:{boxSizing:"border-box",...o.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});$.displayName="SelectPopperPosition";var[ee,et]=L(z,{}),er="SelectViewport",en=n.forwardRef((e,t)=>{let{__scopeSelect:r,nonce:l,...o}=e,i=Y(er,r),d=et(er,r),u=(0,s.s)(t,i.onViewportChange),c=n.useRef(0);return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:l}),(0,k.jsx)(I.Slot,{scope:r,children:(0,k.jsx)(w.sG.div,{"data-radix-select-viewport":"",role:"presentation",...o,ref:u,style:{position:"relative",flex:1,overflow:"hidden auto",...o.style},onScroll:(0,a.m)(o.onScroll,e=>{let t=e.currentTarget,{contentWrapper:r,shouldExpandOnScrollRef:n}=d;if(n?.current&&r){let e=Math.abs(c.current-t.scrollTop);if(e>0){let n=window.innerHeight-20,l=Math.max(parseFloat(r.style.minHeight),parseFloat(r.style.height));if(l<n){let o=l+e,a=Math.min(n,o),i=o-a;r.style.height=a+"px","0px"===r.style.bottom&&(t.scrollTop=i>0?i:0,r.style.justifyContent="flex-end")}}}c.current=t.scrollTop})})})]})});en.displayName=er;var el="SelectGroup",[eo,ea]=L(el),ei=n.forwardRef((e,t)=>{let{__scopeSelect:r,...n}=e,l=(0,h.B)();return(0,k.jsx)(eo,{scope:r,id:l,children:(0,k.jsx)(w.sG.div,{role:"group","aria-labelledby":l,...n,ref:t})})});ei.displayName=el;var es="SelectLabel",ed=n.forwardRef((e,t)=>{let{__scopeSelect:r,...n}=e,l=ea(es,r);return(0,k.jsx)(w.sG.div,{id:l.id,...n,ref:t})});ed.displayName=es;var eu="SelectItem",[ec,ep]=L(eu),ef=n.forwardRef((e,t)=>{let{__scopeSelect:r,value:l,disabled:o=!1,textValue:i,...d}=e,u=B(eu,r),c=Y(eu,r),p=u.value===l,[f,v]=n.useState(i??""),[m,g]=n.useState(!1),x=(0,s.s)(t,e=>c.itemRefCallback?.(e,l,o)),y=(0,h.B)(),S=n.useRef("touch"),b=()=>{o||(u.onValueChange(l),u.onOpenChange(!1))};if(""===l)throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return(0,k.jsx)(ec,{scope:r,value:l,disabled:o,textId:y,isSelected:p,onItemTextChange:n.useCallback(e=>{v(t=>t||(e?.textContent??"").trim())},[]),children:(0,k.jsx)(I.ItemSlot,{scope:r,value:l,disabled:o,textValue:f,children:(0,k.jsx)(w.sG.div,{role:"option","aria-labelledby":y,"data-highlighted":m?"":void 0,"aria-selected":p&&m,"data-state":p?"checked":"unchecked","aria-disabled":o||void 0,"data-disabled":o?"":void 0,tabIndex:o?void 0:-1,...d,ref:x,onFocus:(0,a.m)(d.onFocus,()=>g(!0)),onBlur:(0,a.m)(d.onBlur,()=>g(!1)),onClick:(0,a.m)(d.onClick,()=>{"mouse"!==S.current&&b()}),onPointerUp:(0,a.m)(d.onPointerUp,()=>{"mouse"===S.current&&b()}),onPointerDown:(0,a.m)(d.onPointerDown,e=>{S.current=e.pointerType}),onPointerMove:(0,a.m)(d.onPointerMove,e=>{S.current=e.pointerType,o?c.onItemLeave?.():"mouse"===S.current&&e.currentTarget.focus({preventScroll:!0})}),onPointerLeave:(0,a.m)(d.onPointerLeave,e=>{e.currentTarget===document.activeElement&&c.onItemLeave?.()}),onKeyDown:(0,a.m)(d.onKeyDown,e=>{c.searchRef?.current!==""&&" "===e.key||(R.includes(e.key)&&b()," "===e.key&&e.preventDefault())})})})})});ef.displayName=eu;var eh="SelectItemText",ev=n.forwardRef((e,t)=>{let{__scopeSelect:r,className:o,style:a,...i}=e,d=B(eh,r),u=Y(eh,r),c=ep(eh,r),p=V(eh,r),[f,h]=n.useState(null),v=(0,s.s)(t,e=>h(e),c.onItemTextChange,e=>u.itemTextRefCallback?.(e,c.value,c.disabled)),m=f?.textContent,g=n.useMemo(()=>(0,k.jsx)("option",{value:c.value,disabled:c.disabled,children:m},c.value),[c.disabled,c.value,m]),{onNativeOptionAdd:x,onNativeOptionRemove:y}=p;return(0,S.N)(()=>(x(g),()=>y(g)),[x,y,g]),(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(w.sG.span,{id:c.textId,...i,ref:v}),c.isSelected&&d.valueNode&&!d.valueNodeHasChildren?l.createPortal(i.children,d.valueNode):null]})});ev.displayName=eh;var em="SelectItemIndicator",ew=n.forwardRef((e,t)=>{let{__scopeSelect:r,...n}=e;return ep(em,r).isSelected?(0,k.jsx)(w.sG.span,{"aria-hidden":!0,...n,ref:t}):null});ew.displayName=em;var eg="SelectScrollUpButton",ex=n.forwardRef((e,t)=>{let r=Y(eg,e.__scopeSelect),l=et(eg,e.__scopeSelect),[o,a]=n.useState(!1),i=(0,s.s)(t,l.onScrollButtonChange);return(0,S.N)(()=>{if(r.viewport&&r.isPositioned){let e=function(){a(t.scrollTop>0)},t=r.viewport;return e(),t.addEventListener("scroll",e),()=>t.removeEventListener("scroll",e)}},[r.viewport,r.isPositioned]),o?(0,k.jsx)(eb,{...e,ref:i,onAutoScroll:()=>{let{viewport:e,selectedItem:t}=r;e&&t&&(e.scrollTop=e.scrollTop-t.offsetHeight)}}):null});ex.displayName=eg;var ey="SelectScrollDownButton",eS=n.forwardRef((e,t)=>{let r=Y(ey,e.__scopeSelect),l=et(ey,e.__scopeSelect),[o,a]=n.useState(!1),i=(0,s.s)(t,l.onScrollButtonChange);return(0,S.N)(()=>{if(r.viewport&&r.isPositioned){let e=function(){let e=t.scrollHeight-t.clientHeight;a(Math.ceil(t.scrollTop)<e)},t=r.viewport;return e(),t.addEventListener("scroll",e),()=>t.removeEventListener("scroll",e)}},[r.viewport,r.isPositioned]),o?(0,k.jsx)(eb,{...e,ref:i,onAutoScroll:()=>{let{viewport:e,selectedItem:t}=r;e&&t&&(e.scrollTop=e.scrollTop+t.offsetHeight)}}):null});eS.displayName=ey;var eb=n.forwardRef((e,t)=>{let{__scopeSelect:r,onAutoScroll:l,...o}=e,i=Y("SelectScrollButton",r),s=n.useRef(null),d=E(r),u=n.useCallback(()=>{null!==s.current&&(window.clearInterval(s.current),s.current=null)},[]);return n.useEffect(()=>()=>u(),[u]),(0,S.N)(()=>{let e=d().find(e=>e.ref.current===document.activeElement);e?.ref.current?.scrollIntoView({block:"nearest"})},[d]),(0,k.jsx)(w.sG.div,{"aria-hidden":!0,...o,ref:t,style:{flexShrink:0,...o.style},onPointerDown:(0,a.m)(o.onPointerDown,()=>{null===s.current&&(s.current=window.setInterval(l,50))}),onPointerMove:(0,a.m)(o.onPointerMove,()=>{i.onItemLeave?.(),null===s.current&&(s.current=window.setInterval(l,50))}),onPointerLeave:(0,a.m)(o.onPointerLeave,()=>{u()})})}),eC=n.forwardRef((e,t)=>{let{__scopeSelect:r,...n}=e;return(0,k.jsx)(w.sG.div,{"aria-hidden":!0,...n,ref:t})});eC.displayName="SelectSeparator";var ej="SelectArrow";function eT(e){return""===e||void 0===e}n.forwardRef((e,t)=>{let{__scopeSelect:r,...n}=e,l=A(r),o=B(ej,r),a=Y(ej,r);return o.open&&"popper"===a.position?(0,k.jsx)(v.i3,{...l,...n,ref:t}):null}).displayName=ej;var ek=n.forwardRef((e,t)=>{let{value:r,...l}=e,o=n.useRef(null),a=(0,s.s)(t,o),i=(0,b.Z)(r);return n.useEffect(()=>{let e=o.current,t=Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype,"value").set;if(i!==r&&t){let n=new Event("change",{bubbles:!0});t.call(e,r),e.dispatchEvent(n)}},[i,r]),(0,k.jsx)(C.s,{asChild:!0,children:(0,k.jsx)("select",{...l,ref:a,defaultValue:r})})});function eN(e){let t=(0,x.c)(e),r=n.useRef(""),l=n.useRef(0),o=n.useCallback(e=>{let n=r.current+e;t(n),function e(t){r.current=t,window.clearTimeout(l.current),""!==t&&(l.current=window.setTimeout(()=>e(""),1e3))}(n)},[t]),a=n.useCallback(()=>{r.current="",window.clearTimeout(l.current)},[]);return n.useEffect(()=>()=>window.clearTimeout(l.current),[]),[r,o,a]}function eR(e,t,r){var n;let l=t.length>1&&Array.from(t).every(e=>e===t[0])?t[0]:t,o=(n=Math.max(r?e.indexOf(r):-1,0),e.map((t,r)=>e[(n+r)%e.length]));1===l.length&&(o=o.filter(e=>e!==r));let a=o.find(e=>e.textValue.toLowerCase().startsWith(l.toLowerCase()));return a!==r?a:void 0}ek.displayName="BubbleSelect";var eP=F,eI=K,eE=U,eD=W,eL=q,eM=Z,eA=en,eH=ei,eB=ed,e_=ef,eV=ev,eF=ew,eG=ex,eK=eS,eO=eC},66582:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(58009);function l(e){let t=n.useRef({value:e,previous:e});return n.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}},7833:(e,t,r)=>{r.d(t,{A:()=>n});let n=(0,r(94825).A)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]])},36624:(e,t,r)=>{r.d(t,{A:()=>n});let n=(0,r(94825).A)("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]])}};
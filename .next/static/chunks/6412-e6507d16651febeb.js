"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6412],{49741:(e,t,r)=>{r.d(t,{N:()=>s});var l=r(12115),n=r(18166),o=r(88068),a=r(12317),i=r(95155);function s(e){let t=e+"CollectionProvider",[r,s]=(0,n.A)(t),[u,d]=r(t,{collectionRef:{current:null},itemMap:new Map}),c=e=>{let{scope:t,children:r}=e,n=l.useRef(null),o=l.useRef(new Map).current;return(0,i.jsx)(u,{scope:t,itemMap:o,collectionRef:n,children:r})};c.displayName=t;let p=e+"CollectionSlot",f=l.forwardRef((e,t)=>{let{scope:r,children:l}=e,n=d(p,r),s=(0,o.s)(t,n.collectionRef);return(0,i.jsx)(a.DX,{ref:s,children:l})});f.displayName=p;let v=e+"CollectionItemSlot",h="data-radix-collection-item",m=l.forwardRef((e,t)=>{let{scope:r,children:n,...s}=e,u=l.useRef(null),c=(0,o.s)(t,u),p=d(v,r);return l.useEffect(()=>(p.itemMap.set(u,{ref:u,...s}),()=>void p.itemMap.delete(u))),(0,i.jsx)(a.DX,{[h]:"",ref:c,children:n})});return m.displayName=v,[{Provider:c,Slot:f,ItemSlot:m},function(t){let r=d(e+"CollectionConsumer",t);return l.useCallback(()=>{let e=r.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(h,"]")));return Array.from(r.itemMap.values()).sort((e,r)=>t.indexOf(e.ref.current)-t.indexOf(r.ref.current))},[r.collectionRef,r.itemMap])},s]}},63409:(e,t,r)=>{r.d(t,{In:()=>eM,JU:()=>e_,LM:()=>eL,PP:()=>eG,UC:()=>eA,VF:()=>eO,WT:()=>eE,YJ:()=>eH,ZL:()=>eD,bL:()=>eP,l9:()=>eI,p4:()=>eV,q7:()=>eB,wn:()=>eF,wv:()=>eK});var l=r(12115),n=r(47650),o=r(61786),a=r(93610),i=r(49741),s=r(88068),u=r(18166),d=r(4256),c=r(59674),p=r(62292),f=r(20196),v=r(67668),h=r(19895),m=r(17323),w=r(23360),g=r(12317),x=r(41524),y=r(1488),S=r(46611),b=r(50858),C=r(63543),j=r(15587),R=r(74073),k=r(95155),N=[" ","Enter","ArrowUp","ArrowDown"],T=[" ","Enter"],P="Select",[I,E,M]=(0,i.N)(P),[D,A]=(0,u.A)(P,[M,h.Bk]),L=(0,h.Bk)(),[H,_]=D(P),[B,V]=D(P),O=e=>{let{__scopeSelect:t,children:r,open:n,defaultOpen:o,onOpenChange:a,value:i,defaultValue:s,onValueChange:u,dir:c,name:p,autoComplete:f,disabled:m,required:w,form:g}=e,x=L(t),[S,b]=l.useState(null),[C,j]=l.useState(null),[R,N]=l.useState(!1),T=(0,d.jH)(c),[P=!1,E]=(0,y.i)({prop:n,defaultProp:o,onChange:a}),[M,D]=(0,y.i)({prop:i,defaultProp:s,onChange:u}),A=l.useRef(null),_=!S||g||!!S.closest("form"),[V,O]=l.useState(new Set),G=Array.from(V).map(e=>e.props.value).join(";");return(0,k.jsx)(h.bL,{...x,children:(0,k.jsxs)(H,{required:w,scope:t,trigger:S,onTriggerChange:b,valueNode:C,onValueNodeChange:j,valueNodeHasChildren:R,onValueNodeHasChildrenChange:N,contentId:(0,v.B)(),value:M,onValueChange:D,open:P,onOpenChange:E,dir:T,triggerPointerDownPosRef:A,disabled:m,children:[(0,k.jsx)(I.Provider,{scope:t,children:(0,k.jsx)(B,{scope:e.__scopeSelect,onNativeOptionAdd:l.useCallback(e=>{O(t=>new Set(t).add(e))},[]),onNativeOptionRemove:l.useCallback(e=>{O(t=>{let r=new Set(t);return r.delete(e),r})},[]),children:r})}),_?(0,k.jsxs)(ek,{"aria-hidden":!0,required:w,tabIndex:-1,name:p,autoComplete:f,value:M,onChange:e=>D(e.target.value),disabled:m,form:g,children:[void 0===M?(0,k.jsx)("option",{value:""}):null,Array.from(V)]},G):null]})})};O.displayName=P;var G="SelectTrigger",F=l.forwardRef((e,t)=>{let{__scopeSelect:r,disabled:n=!1,...o}=e,i=L(r),u=_(G,r),d=u.disabled||n,c=(0,s.s)(t,u.onTriggerChange),p=E(r),f=l.useRef("touch"),[v,m,g]=eN(e=>{let t=p().filter(e=>!e.disabled),r=t.find(e=>e.value===u.value),l=eT(t,e,r);void 0!==l&&u.onValueChange(l.value)}),x=e=>{d||(u.onOpenChange(!0),g()),e&&(u.triggerPointerDownPosRef.current={x:Math.round(e.pageX),y:Math.round(e.pageY)})};return(0,k.jsx)(h.Mz,{asChild:!0,...i,children:(0,k.jsx)(w.sG.button,{type:"button",role:"combobox","aria-controls":u.contentId,"aria-expanded":u.open,"aria-required":u.required,"aria-autocomplete":"none",dir:u.dir,"data-state":u.open?"open":"closed",disabled:d,"data-disabled":d?"":void 0,"data-placeholder":eR(u.value)?"":void 0,...o,ref:c,onClick:(0,a.m)(o.onClick,e=>{e.currentTarget.focus(),"mouse"!==f.current&&x(e)}),onPointerDown:(0,a.m)(o.onPointerDown,e=>{f.current=e.pointerType;let t=e.target;t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId),0===e.button&&!1===e.ctrlKey&&"mouse"===e.pointerType&&(x(e),e.preventDefault())}),onKeyDown:(0,a.m)(o.onKeyDown,e=>{let t=""!==v.current;e.ctrlKey||e.altKey||e.metaKey||1!==e.key.length||m(e.key),(!t||" "!==e.key)&&N.includes(e.key)&&(x(),e.preventDefault())})})})});F.displayName=G;var K="SelectValue",U=l.forwardRef((e,t)=>{let{__scopeSelect:r,className:l,style:n,children:o,placeholder:a="",...i}=e,u=_(K,r),{onValueNodeHasChildrenChange:d}=u,c=void 0!==o,p=(0,s.s)(t,u.onValueNodeChange);return(0,S.N)(()=>{d(c)},[d,c]),(0,k.jsx)(w.sG.span,{...i,ref:p,style:{pointerEvents:"none"},children:eR(u.value)?(0,k.jsx)(k.Fragment,{children:a}):o})});U.displayName=K;var W=l.forwardRef((e,t)=>{let{__scopeSelect:r,children:l,...n}=e;return(0,k.jsx)(w.sG.span,{"aria-hidden":!0,...n,ref:t,children:l||"▼"})});W.displayName="SelectIcon";var q=e=>(0,k.jsx)(m.Z,{asChild:!0,...e});q.displayName="SelectPortal";var z="SelectContent",X=l.forwardRef((e,t)=>{let r=_(z,e.__scopeSelect),[o,a]=l.useState();return((0,S.N)(()=>{a(new DocumentFragment)},[]),r.open)?(0,k.jsx)(J,{...e,ref:t}):o?n.createPortal((0,k.jsx)(Z,{scope:e.__scopeSelect,children:(0,k.jsx)(I.Slot,{scope:e.__scopeSelect,children:(0,k.jsx)("div",{children:e.children})})}),o):null});X.displayName=z;var[Z,Y]=D(z),J=l.forwardRef((e,t)=>{let{__scopeSelect:r,position:n="item-aligned",onCloseAutoFocus:o,onEscapeKeyDown:i,onPointerDownOutside:u,side:d,sideOffset:v,align:h,alignOffset:m,arrowPadding:w,collisionBoundary:x,collisionPadding:y,sticky:S,hideWhenDetached:b,avoidCollisions:C,...N}=e,T=_(z,r),[P,I]=l.useState(null),[M,D]=l.useState(null),A=(0,s.s)(t,e=>I(e)),[L,H]=l.useState(null),[B,V]=l.useState(null),O=E(r),[G,F]=l.useState(!1),K=l.useRef(!1);l.useEffect(()=>{if(P)return(0,j.Eq)(P)},[P]),(0,p.Oh)();let U=l.useCallback(e=>{let[t,...r]=O().map(e=>e.ref.current),[l]=r.slice(-1),n=document.activeElement;for(let r of e)if(r===n||(null==r||r.scrollIntoView({block:"nearest"}),r===t&&M&&(M.scrollTop=0),r===l&&M&&(M.scrollTop=M.scrollHeight),null==r||r.focus(),document.activeElement!==n))return},[O,M]),W=l.useCallback(()=>U([L,P]),[U,L,P]);l.useEffect(()=>{G&&W()},[G,W]);let{onOpenChange:q,triggerPointerDownPosRef:X}=T;l.useEffect(()=>{if(P){let e={x:0,y:0},t=t=>{var r,l,n,o;e={x:Math.abs(Math.round(t.pageX)-(null!==(n=null===(r=X.current)||void 0===r?void 0:r.x)&&void 0!==n?n:0)),y:Math.abs(Math.round(t.pageY)-(null!==(o=null===(l=X.current)||void 0===l?void 0:l.y)&&void 0!==o?o:0))}},r=r=>{e.x<=10&&e.y<=10?r.preventDefault():P.contains(r.target)||q(!1),document.removeEventListener("pointermove",t),X.current=null};return null!==X.current&&(document.addEventListener("pointermove",t),document.addEventListener("pointerup",r,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",t),document.removeEventListener("pointerup",r,{capture:!0})}}},[P,q,X]),l.useEffect(()=>{let e=()=>q(!1);return window.addEventListener("blur",e),window.addEventListener("resize",e),()=>{window.removeEventListener("blur",e),window.removeEventListener("resize",e)}},[q]);let[Y,J]=eN(e=>{let t=O().filter(e=>!e.disabled),r=t.find(e=>e.ref.current===document.activeElement),l=eT(t,e,r);l&&setTimeout(()=>l.ref.current.focus())}),ee=l.useCallback((e,t,r)=>{let l=!K.current&&!r;(void 0!==T.value&&T.value===t||l)&&(H(e),l&&(K.current=!0))},[T.value]),et=l.useCallback(()=>null==P?void 0:P.focus(),[P]),er=l.useCallback((e,t,r)=>{let l=!K.current&&!r;(void 0!==T.value&&T.value===t||l)&&V(e)},[T.value]),el="popper"===n?$:Q,en=el===$?{side:d,sideOffset:v,align:h,alignOffset:m,arrowPadding:w,collisionBoundary:x,collisionPadding:y,sticky:S,hideWhenDetached:b,avoidCollisions:C}:{};return(0,k.jsx)(Z,{scope:r,content:P,viewport:M,onViewportChange:D,itemRefCallback:ee,selectedItem:L,onItemLeave:et,itemTextRefCallback:er,focusSelectedItem:W,selectedItemText:B,position:n,isPositioned:G,searchRef:Y,children:(0,k.jsx)(R.A,{as:g.DX,allowPinchZoom:!0,children:(0,k.jsx)(f.n,{asChild:!0,trapped:T.open,onMountAutoFocus:e=>{e.preventDefault()},onUnmountAutoFocus:(0,a.m)(o,e=>{var t;null===(t=T.trigger)||void 0===t||t.focus({preventScroll:!0}),e.preventDefault()}),children:(0,k.jsx)(c.qW,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:i,onPointerDownOutside:u,onFocusOutside:e=>e.preventDefault(),onDismiss:()=>T.onOpenChange(!1),children:(0,k.jsx)(el,{role:"listbox",id:T.contentId,"data-state":T.open?"open":"closed",dir:T.dir,onContextMenu:e=>e.preventDefault(),...N,...en,onPlaced:()=>F(!0),ref:A,style:{display:"flex",flexDirection:"column",outline:"none",...N.style},onKeyDown:(0,a.m)(N.onKeyDown,e=>{let t=e.ctrlKey||e.altKey||e.metaKey;if("Tab"===e.key&&e.preventDefault(),t||1!==e.key.length||J(e.key),["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let t=O().filter(e=>!e.disabled).map(e=>e.ref.current);if(["ArrowUp","End"].includes(e.key)&&(t=t.slice().reverse()),["ArrowUp","ArrowDown"].includes(e.key)){let r=e.target,l=t.indexOf(r);t=t.slice(l+1)}setTimeout(()=>U(t)),e.preventDefault()}})})})})})})});J.displayName="SelectContentImpl";var Q=l.forwardRef((e,t)=>{let{__scopeSelect:r,onPlaced:n,...a}=e,i=_(z,r),u=Y(z,r),[d,c]=l.useState(null),[p,f]=l.useState(null),v=(0,s.s)(t,e=>f(e)),h=E(r),m=l.useRef(!1),g=l.useRef(!0),{viewport:x,selectedItem:y,selectedItemText:b,focusSelectedItem:C}=u,j=l.useCallback(()=>{if(i.trigger&&i.valueNode&&d&&p&&x&&y&&b){let e=i.trigger.getBoundingClientRect(),t=p.getBoundingClientRect(),r=i.valueNode.getBoundingClientRect(),l=b.getBoundingClientRect();if("rtl"!==i.dir){let n=l.left-t.left,a=r.left-n,i=e.left-a,s=e.width+i,u=Math.max(s,t.width),c=window.innerWidth-10,p=(0,o.q)(a,[10,Math.max(10,c-u)]);d.style.minWidth=s+"px",d.style.left=p+"px"}else{let n=t.right-l.right,a=window.innerWidth-r.right-n,i=window.innerWidth-e.right-a,s=e.width+i,u=Math.max(s,t.width),c=window.innerWidth-10,p=(0,o.q)(a,[10,Math.max(10,c-u)]);d.style.minWidth=s+"px",d.style.right=p+"px"}let a=h(),s=window.innerHeight-20,u=x.scrollHeight,c=window.getComputedStyle(p),f=parseInt(c.borderTopWidth,10),v=parseInt(c.paddingTop,10),w=parseInt(c.borderBottomWidth,10),g=f+v+u+parseInt(c.paddingBottom,10)+w,S=Math.min(5*y.offsetHeight,g),C=window.getComputedStyle(x),j=parseInt(C.paddingTop,10),R=parseInt(C.paddingBottom,10),k=e.top+e.height/2-10,N=y.offsetHeight/2,T=f+v+(y.offsetTop+N);if(T<=k){let e=a.length>0&&y===a[a.length-1].ref.current;d.style.bottom="0px";let t=Math.max(s-k,N+(e?R:0)+(p.clientHeight-x.offsetTop-x.offsetHeight)+w);d.style.height=T+t+"px"}else{let e=a.length>0&&y===a[0].ref.current;d.style.top="0px";let t=Math.max(k,f+x.offsetTop+(e?j:0)+N);d.style.height=t+(g-T)+"px",x.scrollTop=T-k+x.offsetTop}d.style.margin="".concat(10,"px 0"),d.style.minHeight=S+"px",d.style.maxHeight=s+"px",null==n||n(),requestAnimationFrame(()=>m.current=!0)}},[h,i.trigger,i.valueNode,d,p,x,y,b,i.dir,n]);(0,S.N)(()=>j(),[j]);let[R,N]=l.useState();(0,S.N)(()=>{p&&N(window.getComputedStyle(p).zIndex)},[p]);let T=l.useCallback(e=>{e&&!0===g.current&&(j(),null==C||C(),g.current=!1)},[j,C]);return(0,k.jsx)(ee,{scope:r,contentWrapper:d,shouldExpandOnScrollRef:m,onScrollButtonChange:T,children:(0,k.jsx)("div",{ref:c,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:R},children:(0,k.jsx)(w.sG.div,{...a,ref:v,style:{boxSizing:"border-box",maxHeight:"100%",...a.style}})})})});Q.displayName="SelectItemAlignedPosition";var $=l.forwardRef((e,t)=>{let{__scopeSelect:r,align:l="start",collisionPadding:n=10,...o}=e,a=L(r);return(0,k.jsx)(h.UC,{...a,...o,ref:t,align:l,collisionPadding:n,style:{boxSizing:"border-box",...o.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});$.displayName="SelectPopperPosition";var[ee,et]=D(z,{}),er="SelectViewport",el=l.forwardRef((e,t)=>{let{__scopeSelect:r,nonce:n,...o}=e,i=Y(er,r),u=et(er,r),d=(0,s.s)(t,i.onViewportChange),c=l.useRef(0);return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:n}),(0,k.jsx)(I.Slot,{scope:r,children:(0,k.jsx)(w.sG.div,{"data-radix-select-viewport":"",role:"presentation",...o,ref:d,style:{position:"relative",flex:1,overflow:"hidden auto",...o.style},onScroll:(0,a.m)(o.onScroll,e=>{let t=e.currentTarget,{contentWrapper:r,shouldExpandOnScrollRef:l}=u;if((null==l?void 0:l.current)&&r){let e=Math.abs(c.current-t.scrollTop);if(e>0){let l=window.innerHeight-20,n=Math.max(parseFloat(r.style.minHeight),parseFloat(r.style.height));if(n<l){let o=n+e,a=Math.min(l,o),i=o-a;r.style.height=a+"px","0px"===r.style.bottom&&(t.scrollTop=i>0?i:0,r.style.justifyContent="flex-end")}}}c.current=t.scrollTop})})})]})});el.displayName=er;var en="SelectGroup",[eo,ea]=D(en),ei=l.forwardRef((e,t)=>{let{__scopeSelect:r,...l}=e,n=(0,v.B)();return(0,k.jsx)(eo,{scope:r,id:n,children:(0,k.jsx)(w.sG.div,{role:"group","aria-labelledby":n,...l,ref:t})})});ei.displayName=en;var es="SelectLabel",eu=l.forwardRef((e,t)=>{let{__scopeSelect:r,...l}=e,n=ea(es,r);return(0,k.jsx)(w.sG.div,{id:n.id,...l,ref:t})});eu.displayName=es;var ed="SelectItem",[ec,ep]=D(ed),ef=l.forwardRef((e,t)=>{let{__scopeSelect:r,value:n,disabled:o=!1,textValue:i,...u}=e,d=_(ed,r),c=Y(ed,r),p=d.value===n,[f,h]=l.useState(null!=i?i:""),[m,g]=l.useState(!1),x=(0,s.s)(t,e=>{var t;return null===(t=c.itemRefCallback)||void 0===t?void 0:t.call(c,e,n,o)}),y=(0,v.B)(),S=l.useRef("touch"),b=()=>{o||(d.onValueChange(n),d.onOpenChange(!1))};if(""===n)throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return(0,k.jsx)(ec,{scope:r,value:n,disabled:o,textId:y,isSelected:p,onItemTextChange:l.useCallback(e=>{h(t=>{var r;return t||(null!==(r=null==e?void 0:e.textContent)&&void 0!==r?r:"").trim()})},[]),children:(0,k.jsx)(I.ItemSlot,{scope:r,value:n,disabled:o,textValue:f,children:(0,k.jsx)(w.sG.div,{role:"option","aria-labelledby":y,"data-highlighted":m?"":void 0,"aria-selected":p&&m,"data-state":p?"checked":"unchecked","aria-disabled":o||void 0,"data-disabled":o?"":void 0,tabIndex:o?void 0:-1,...u,ref:x,onFocus:(0,a.m)(u.onFocus,()=>g(!0)),onBlur:(0,a.m)(u.onBlur,()=>g(!1)),onClick:(0,a.m)(u.onClick,()=>{"mouse"!==S.current&&b()}),onPointerUp:(0,a.m)(u.onPointerUp,()=>{"mouse"===S.current&&b()}),onPointerDown:(0,a.m)(u.onPointerDown,e=>{S.current=e.pointerType}),onPointerMove:(0,a.m)(u.onPointerMove,e=>{if(S.current=e.pointerType,o){var t;null===(t=c.onItemLeave)||void 0===t||t.call(c)}else"mouse"===S.current&&e.currentTarget.focus({preventScroll:!0})}),onPointerLeave:(0,a.m)(u.onPointerLeave,e=>{if(e.currentTarget===document.activeElement){var t;null===(t=c.onItemLeave)||void 0===t||t.call(c)}}),onKeyDown:(0,a.m)(u.onKeyDown,e=>{var t;(null===(t=c.searchRef)||void 0===t?void 0:t.current)!==""&&" "===e.key||(T.includes(e.key)&&b()," "===e.key&&e.preventDefault())})})})})});ef.displayName=ed;var ev="SelectItemText",eh=l.forwardRef((e,t)=>{let{__scopeSelect:r,className:o,style:a,...i}=e,u=_(ev,r),d=Y(ev,r),c=ep(ev,r),p=V(ev,r),[f,v]=l.useState(null),h=(0,s.s)(t,e=>v(e),c.onItemTextChange,e=>{var t;return null===(t=d.itemTextRefCallback)||void 0===t?void 0:t.call(d,e,c.value,c.disabled)}),m=null==f?void 0:f.textContent,g=l.useMemo(()=>(0,k.jsx)("option",{value:c.value,disabled:c.disabled,children:m},c.value),[c.disabled,c.value,m]),{onNativeOptionAdd:x,onNativeOptionRemove:y}=p;return(0,S.N)(()=>(x(g),()=>y(g)),[x,y,g]),(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(w.sG.span,{id:c.textId,...i,ref:h}),c.isSelected&&u.valueNode&&!u.valueNodeHasChildren?n.createPortal(i.children,u.valueNode):null]})});eh.displayName=ev;var em="SelectItemIndicator",ew=l.forwardRef((e,t)=>{let{__scopeSelect:r,...l}=e;return ep(em,r).isSelected?(0,k.jsx)(w.sG.span,{"aria-hidden":!0,...l,ref:t}):null});ew.displayName=em;var eg="SelectScrollUpButton",ex=l.forwardRef((e,t)=>{let r=Y(eg,e.__scopeSelect),n=et(eg,e.__scopeSelect),[o,a]=l.useState(!1),i=(0,s.s)(t,n.onScrollButtonChange);return(0,S.N)(()=>{if(r.viewport&&r.isPositioned){let e=function(){a(t.scrollTop>0)},t=r.viewport;return e(),t.addEventListener("scroll",e),()=>t.removeEventListener("scroll",e)}},[r.viewport,r.isPositioned]),o?(0,k.jsx)(eb,{...e,ref:i,onAutoScroll:()=>{let{viewport:e,selectedItem:t}=r;e&&t&&(e.scrollTop=e.scrollTop-t.offsetHeight)}}):null});ex.displayName=eg;var ey="SelectScrollDownButton",eS=l.forwardRef((e,t)=>{let r=Y(ey,e.__scopeSelect),n=et(ey,e.__scopeSelect),[o,a]=l.useState(!1),i=(0,s.s)(t,n.onScrollButtonChange);return(0,S.N)(()=>{if(r.viewport&&r.isPositioned){let e=function(){let e=t.scrollHeight-t.clientHeight;a(Math.ceil(t.scrollTop)<e)},t=r.viewport;return e(),t.addEventListener("scroll",e),()=>t.removeEventListener("scroll",e)}},[r.viewport,r.isPositioned]),o?(0,k.jsx)(eb,{...e,ref:i,onAutoScroll:()=>{let{viewport:e,selectedItem:t}=r;e&&t&&(e.scrollTop=e.scrollTop+t.offsetHeight)}}):null});eS.displayName=ey;var eb=l.forwardRef((e,t)=>{let{__scopeSelect:r,onAutoScroll:n,...o}=e,i=Y("SelectScrollButton",r),s=l.useRef(null),u=E(r),d=l.useCallback(()=>{null!==s.current&&(window.clearInterval(s.current),s.current=null)},[]);return l.useEffect(()=>()=>d(),[d]),(0,S.N)(()=>{var e;let t=u().find(e=>e.ref.current===document.activeElement);null==t||null===(e=t.ref.current)||void 0===e||e.scrollIntoView({block:"nearest"})},[u]),(0,k.jsx)(w.sG.div,{"aria-hidden":!0,...o,ref:t,style:{flexShrink:0,...o.style},onPointerDown:(0,a.m)(o.onPointerDown,()=>{null===s.current&&(s.current=window.setInterval(n,50))}),onPointerMove:(0,a.m)(o.onPointerMove,()=>{var e;null===(e=i.onItemLeave)||void 0===e||e.call(i),null===s.current&&(s.current=window.setInterval(n,50))}),onPointerLeave:(0,a.m)(o.onPointerLeave,()=>{d()})})}),eC=l.forwardRef((e,t)=>{let{__scopeSelect:r,...l}=e;return(0,k.jsx)(w.sG.div,{"aria-hidden":!0,...l,ref:t})});eC.displayName="SelectSeparator";var ej="SelectArrow";function eR(e){return""===e||void 0===e}l.forwardRef((e,t)=>{let{__scopeSelect:r,...l}=e,n=L(r),o=_(ej,r),a=Y(ej,r);return o.open&&"popper"===a.position?(0,k.jsx)(h.i3,{...n,...l,ref:t}):null}).displayName=ej;var ek=l.forwardRef((e,t)=>{let{value:r,...n}=e,o=l.useRef(null),a=(0,s.s)(t,o),i=(0,b.Z)(r);return l.useEffect(()=>{let e=o.current,t=Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype,"value").set;if(i!==r&&t){let l=new Event("change",{bubbles:!0});t.call(e,r),e.dispatchEvent(l)}},[i,r]),(0,k.jsx)(C.s,{asChild:!0,children:(0,k.jsx)("select",{...n,ref:a,defaultValue:r})})});function eN(e){let t=(0,x.c)(e),r=l.useRef(""),n=l.useRef(0),o=l.useCallback(e=>{let l=r.current+e;t(l),function e(t){r.current=t,window.clearTimeout(n.current),""!==t&&(n.current=window.setTimeout(()=>e(""),1e3))}(l)},[t]),a=l.useCallback(()=>{r.current="",window.clearTimeout(n.current)},[]);return l.useEffect(()=>()=>window.clearTimeout(n.current),[]),[r,o,a]}function eT(e,t,r){var l;let n=t.length>1&&Array.from(t).every(e=>e===t[0])?t[0]:t,o=(l=Math.max(r?e.indexOf(r):-1,0),e.map((t,r)=>e[(l+r)%e.length]));1===n.length&&(o=o.filter(e=>e!==r));let a=o.find(e=>e.textValue.toLowerCase().startsWith(n.toLowerCase()));return a!==r?a:void 0}ek.displayName="BubbleSelect";var eP=O,eI=F,eE=U,eM=W,eD=q,eA=X,eL=el,eH=ei,e_=eu,eB=ef,eV=eh,eO=ew,eG=ex,eF=eS,eK=eC},50858:(e,t,r)=>{r.d(t,{Z:()=>n});var l=r(12115);function n(e){let t=l.useRef({value:e,previous:e});return l.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}},63543:(e,t,r)=>{r.d(t,{b:()=>i,s:()=>a});var l=r(12115),n=r(23360),o=r(95155),a=l.forwardRef((e,t)=>(0,o.jsx)(n.sG.span,{...e,ref:t,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...e.style}}));a.displayName="VisuallyHidden";var i=a},27193:(e,t,r)=>{r.d(t,{A:()=>l});let l=(0,r(14057).A)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},32645:(e,t,r)=>{r.d(t,{A:()=>l});let l=(0,r(14057).A)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]])},52488:(e,t,r)=>{r.d(t,{A:()=>l});let l=(0,r(14057).A)("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]])}}]);
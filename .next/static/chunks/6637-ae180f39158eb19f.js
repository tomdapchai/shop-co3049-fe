"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6637],{66217:(e,t,n)=>{n.d(t,{UC:()=>et,VY:()=>er,ZL:()=>Q,bL:()=>K,bm:()=>eo,hE:()=>en,hJ:()=>ee,l9:()=>Y});var r=n(12115),o=n(93610),l=n(88068),a=n(18166),i=n(67668),s=n(1488),u=n(59674),d=n(20196),c=n(17323),p=n(17028),f=n(23360),m=n(62292),v=n(74073),g=n(15587),y=n(12317),h=n(95155),N="Dialog",[D,O]=(0,a.A)(N),[b,x]=D(N),R=e=>{let{__scopeDialog:t,children:n,open:o,defaultOpen:l,onOpenChange:a,modal:u=!0}=e,d=r.useRef(null),c=r.useRef(null),[p=!1,f]=(0,s.i)({prop:o,defaultProp:l,onChange:a});return(0,h.jsx)(b,{scope:t,triggerRef:d,contentRef:c,contentId:(0,i.B)(),titleId:(0,i.B)(),descriptionId:(0,i.B)(),open:p,onOpenChange:f,onOpenToggle:r.useCallback(()=>f(e=>!e),[f]),modal:u,children:n})};R.displayName=N;var j="DialogTrigger",w=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,a=x(j,n),i=(0,l.s)(t,a.triggerRef);return(0,h.jsx)(f.sG.button,{type:"button","aria-haspopup":"dialog","aria-expanded":a.open,"aria-controls":a.contentId,"data-state":Z(a.open),...r,ref:i,onClick:(0,o.m)(e.onClick,a.onOpenToggle)})});w.displayName=j;var A="DialogPortal",[C,I]=D(A,{forceMount:void 0}),M=e=>{let{__scopeDialog:t,forceMount:n,children:o,container:l}=e,a=x(A,t);return(0,h.jsx)(C,{scope:t,forceMount:n,children:r.Children.map(o,e=>(0,h.jsx)(p.C,{present:n||a.open,children:(0,h.jsx)(c.Z,{asChild:!0,container:l,children:e})}))})};M.displayName=A;var E="DialogOverlay",k=r.forwardRef((e,t)=>{let n=I(E,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,l=x(E,e.__scopeDialog);return l.modal?(0,h.jsx)(p.C,{present:r||l.open,children:(0,h.jsx)(T,{...o,ref:t})}):null});k.displayName=E;var T=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=x(E,n);return(0,h.jsx)(v.A,{as:y.DX,allowPinchZoom:!0,shards:[o.contentRef],children:(0,h.jsx)(f.sG.div,{"data-state":Z(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),_="DialogContent",F=r.forwardRef((e,t)=>{let n=I(_,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,l=x(_,e.__scopeDialog);return(0,h.jsx)(p.C,{present:r||l.open,children:l.modal?(0,h.jsx)(P,{...o,ref:t}):(0,h.jsx)(U,{...o,ref:t})})});F.displayName=_;var P=r.forwardRef((e,t)=>{let n=x(_,e.__scopeDialog),a=r.useRef(null),i=(0,l.s)(t,n.contentRef,a);return r.useEffect(()=>{let e=a.current;if(e)return(0,g.Eq)(e)},[]),(0,h.jsx)(L,{...e,ref:i,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,o.m)(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),null===(t=n.triggerRef.current)||void 0===t||t.focus()}),onPointerDownOutside:(0,o.m)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey;(2===t.button||n)&&e.preventDefault()}),onFocusOutside:(0,o.m)(e.onFocusOutside,e=>e.preventDefault())})}),U=r.forwardRef((e,t)=>{let n=x(_,e.__scopeDialog),o=r.useRef(!1),l=r.useRef(!1);return(0,h.jsx)(L,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var r,a;null===(r=e.onCloseAutoFocus)||void 0===r||r.call(e,t),t.defaultPrevented||(o.current||null===(a=n.triggerRef.current)||void 0===a||a.focus(),t.preventDefault()),o.current=!1,l.current=!1},onInteractOutside:t=>{var r,a;null===(r=e.onInteractOutside)||void 0===r||r.call(e,t),t.defaultPrevented||(o.current=!0,"pointerdown"!==t.detail.originalEvent.type||(l.current=!0));let i=t.target;(null===(a=n.triggerRef.current)||void 0===a?void 0:a.contains(i))&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&l.current&&t.preventDefault()}})}),L=r.forwardRef((e,t)=>{let{__scopeDialog:n,trapFocus:o,onOpenAutoFocus:a,onCloseAutoFocus:i,...s}=e,c=x(_,n),p=r.useRef(null),f=(0,l.s)(t,p);return(0,m.Oh)(),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(d.n,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:a,onUnmountAutoFocus:i,children:(0,h.jsx)(u.qW,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":Z(c.open),...s,ref:f,onDismiss:()=>c.onOpenChange(!1)})}),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{titleId:c.titleId}),(0,h.jsx)(J,{contentRef:p,descriptionId:c.descriptionId})]})]})}),W="DialogTitle",S=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=x(W,n);return(0,h.jsx)(f.sG.h2,{id:o.titleId,...r,ref:t})});S.displayName=W;var V="DialogDescription",B=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=x(V,n);return(0,h.jsx)(f.sG.p,{id:o.descriptionId,...r,ref:t})});B.displayName=V;var G="DialogClose",q=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,l=x(G,n);return(0,h.jsx)(f.sG.button,{type:"button",...r,ref:t,onClick:(0,o.m)(e.onClick,()=>l.onOpenChange(!1))})});function Z(e){return e?"open":"closed"}q.displayName=G;var z="DialogTitleWarning",[H,X]=(0,a.q)(z,{contentName:_,titleName:W,docsSlug:"dialog"}),$=e=>{let{titleId:t}=e,n=X(z),o="`".concat(n.contentName,"` requires a `").concat(n.titleName,"` for the component to be accessible for screen reader users.\n\nIf you want to hide the `").concat(n.titleName,"`, you can wrap it with our VisuallyHidden component.\n\nFor more information, see https://radix-ui.com/primitives/docs/components/").concat(n.docsSlug);return r.useEffect(()=>{t&&!document.getElementById(t)&&console.error(o)},[o,t]),null},J=e=>{let{contentRef:t,descriptionId:n}=e,o=X("DialogDescriptionWarning"),l="Warning: Missing `Description` or `aria-describedby={undefined}` for {".concat(o.contentName,"}.");return r.useEffect(()=>{var e;let r=null===(e=t.current)||void 0===e?void 0:e.getAttribute("aria-describedby");n&&r&&!document.getElementById(n)&&console.warn(l)},[l,t,n]),null},K=R,Y=w,Q=M,ee=k,et=F,en=S,er=B,eo=q},17028:(e,t,n)=>{n.d(t,{C:()=>a});var r=n(12115),o=n(88068),l=n(46611),a=e=>{let{present:t,children:n}=e,a=function(e){var t,n;let[o,a]=r.useState(),s=r.useRef({}),u=r.useRef(e),d=r.useRef("none"),[c,p]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},r.useReducer((e,t)=>{let r=n[e][t];return null!=r?r:e},t));return r.useEffect(()=>{let e=i(s.current);d.current="mounted"===c?e:"none"},[c]),(0,l.N)(()=>{let t=s.current,n=u.current;if(n!==e){let r=d.current,o=i(t);e?p("MOUNT"):"none"===o||(null==t?void 0:t.display)==="none"?p("UNMOUNT"):n&&r!==o?p("ANIMATION_OUT"):p("UNMOUNT"),u.current=e}},[e,p]),(0,l.N)(()=>{if(o){var e;let t;let n=null!==(e=o.ownerDocument.defaultView)&&void 0!==e?e:window,r=e=>{let r=i(s.current).includes(e.animationName);if(e.target===o&&r&&(p("ANIMATION_END"),!u.current)){let e=o.style.animationFillMode;o.style.animationFillMode="forwards",t=n.setTimeout(()=>{"forwards"===o.style.animationFillMode&&(o.style.animationFillMode=e)})}},l=e=>{e.target===o&&(d.current=i(s.current))};return o.addEventListener("animationstart",l),o.addEventListener("animationcancel",r),o.addEventListener("animationend",r),()=>{n.clearTimeout(t),o.removeEventListener("animationstart",l),o.removeEventListener("animationcancel",r),o.removeEventListener("animationend",r)}}p("ANIMATION_END")},[o,p]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:r.useCallback(e=>{e&&(s.current=getComputedStyle(e)),a(e)},[])}}(t),s="function"==typeof n?n({present:a.isPresent}):r.Children.only(n),u=(0,o.s)(a.ref,function(e){var t,n;let r=null===(t=Object.getOwnPropertyDescriptor(e.props,"ref"))||void 0===t?void 0:t.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?e.ref:(o=(r=null===(n=Object.getOwnPropertyDescriptor(e,"ref"))||void 0===n?void 0:n.get)&&"isReactWarning"in r&&r.isReactWarning)?e.props.ref:e.props.ref||e.ref}(s));return"function"==typeof n||a.isPresent?r.cloneElement(s,{ref:u}):null};function i(e){return(null==e?void 0:e.animationName)||"none"}a.displayName="Presence"},31027:(e,t,n)=>{n.d(t,{F:()=>a});var r=n(43463);let o=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,l=r.$,a=(e,t)=>n=>{var r;if((null==t?void 0:t.variants)==null)return l(e,null==n?void 0:n.class,null==n?void 0:n.className);let{variants:a,defaultVariants:i}=t,s=Object.keys(a).map(e=>{let t=null==n?void 0:n[e],r=null==i?void 0:i[e];if(null===t)return null;let l=o(t)||o(r);return a[e][l]}),u=n&&Object.entries(n).reduce((e,t)=>{let[n,r]=t;return void 0===r||(e[n]=r),e},{});return l(e,s,null==t?void 0:null===(r=t.compoundVariants)||void 0===r?void 0:r.reduce((e,t)=>{let{class:n,className:r,...o}=t;return Object.entries(o).every(e=>{let[t,n]=e;return Array.isArray(n)?n.includes({...i,...u}[t]):({...i,...u})[t]===n})?[...e,n,r]:e},[]),null==n?void 0:n.class,null==n?void 0:n.className)}},65686:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(14057).A)("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]])},4683:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(14057).A)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},35524:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(14057).A)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},689:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(14057).A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])}}]);
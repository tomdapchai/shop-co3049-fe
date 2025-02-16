"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1372],{76046:(e,t,n)=>{var r=n(66658);n.o(r,"useParams")&&n.d(t,{useParams:function(){return r.useParams}}),n.o(r,"usePathname")&&n.d(t,{usePathname:function(){return r.usePathname}}),n.o(r,"useRouter")&&n.d(t,{useRouter:function(){return r.useRouter}}),n.o(r,"useSearchParams")&&n.d(t,{useSearchParams:function(){return r.useSearchParams}})},22750:(e,t,n)=>{n.d(t,{A:()=>o});let r={active:!0,breakpoints:{},delay:4e3,jump:!1,playOnInit:!0,stopOnFocusIn:!0,stopOnInteraction:!0,stopOnMouseEnter:!1,stopOnLastSnap:!1,rootNode:null};function o(e={}){let t,n,i,u;let c=null,a=0,l=!1,s=!1,f=!1,d=!1;function p(){if(!i){if(h()){f=!0;return}l||n.emit("autoplay:play"),function(){let{ownerWindow:e}=n.internalEngine();e.clearTimeout(a),a=e.setTimeout(w,u[n.selectedScrollSnap()]),c=new Date().getTime(),n.emit("autoplay:timerset")}(),l=!0}}function m(){i||(l&&n.emit("autoplay:stop"),function(){let{ownerWindow:e}=n.internalEngine();e.clearTimeout(a),a=0,c=null,n.emit("autoplay:timerstopped")}(),l=!1)}function g(){if(h())return f=l,m();f&&p()}function h(){let{ownerDocument:e}=n.internalEngine();return"hidden"===e.visibilityState}function y(){s||m()}function v(){s||p()}function b(){s=!0,m()}function x(){s=!1,p()}function w(){let{index:e}=n.internalEngine(),r=e.clone().add(1).get(),o=n.scrollSnapList().length-1,i=t.stopOnLastSnap&&r===o;if(n.canScrollNext()?n.scrollNext(d):n.scrollTo(0,d),n.emit("autoplay:select"),i)return m();p()}return{name:"autoplay",options:e,init:function(c,a){n=c;let{mergeOptions:l,optionsAtMedia:s}=a,f=l(r,o.globalOptions);if(t=s(l(f,e)),n.scrollSnapList().length<=1)return;d=t.jump,i=!1,u=function(e,t){let n=e.scrollSnapList();return"number"==typeof t?n.map(()=>t):t(n,e)}(n,t.delay);let{eventStore:h,ownerDocument:w}=n.internalEngine(),S=!!n.internalEngine().options.watchDrag,O=function(e,t){let n=e.rootNode();return t&&t(n)||n}(n,t.rootNode);h.add(w,"visibilitychange",g),S&&n.on("pointerDown",y),S&&!t.stopOnInteraction&&n.on("pointerUp",v),t.stopOnMouseEnter&&h.add(O,"mouseenter",b),t.stopOnMouseEnter&&!t.stopOnInteraction&&h.add(O,"mouseleave",x),t.stopOnFocusIn&&n.on("slideFocusStart",m),t.stopOnFocusIn&&!t.stopOnInteraction&&h.add(n.containerNode(),"focusout",p),t.playOnInit&&p()},destroy:function(){n.off("pointerDown",y).off("pointerUp",v).off("slideFocusStart",m),m(),i=!0,l=!1},play:function(e){void 0!==e&&(d=e),p()},stop:function(){l&&m()},reset:function(){l&&p()},isPlaying:function(){return l},timeUntilNext:function(){return c?u[n.selectedScrollSnap()]-(new Date().getTime()-c):null}}}o.globalOptions=void 0},42576:(e,t,n)=>{n.d(t,{A:()=>k});var r=n(12115);function o(e){return"[object Object]"===Object.prototype.toString.call(e)||Array.isArray(e)}function i(e,t){let n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&JSON.stringify(Object.keys(e.breakpoints||{}))===JSON.stringify(Object.keys(t.breakpoints||{}))&&n.every(n=>{let r=e[n],u=t[n];return"function"==typeof r?`${r}`==`${u}`:o(r)&&o(u)?i(r,u):r===u})}function u(e){return e.concat().sort((e,t)=>e.name>t.name?1:-1).map(e=>e.options)}function c(e){return"number"==typeof e}function a(e){return"string"==typeof e}function l(e){return"boolean"==typeof e}function s(e){return"[object Object]"===Object.prototype.toString.call(e)}function f(e){return Math.abs(e)}function d(e){return Math.sign(e)}function p(e){return y(e).map(Number)}function m(e){return e[g(e)]}function g(e){return Math.max(0,e.length-1)}function h(e,t=0){return Array.from(Array(e),(e,n)=>t+n)}function y(e){return Object.keys(e)}function v(e,t){return void 0!==t.MouseEvent&&e instanceof t.MouseEvent}function b(){let e=[],t={add:function(n,r,o,i={passive:!0}){let u;return"addEventListener"in n?(n.addEventListener(r,o,i),u=()=>n.removeEventListener(r,o,i)):(n.addListener(o),u=()=>n.removeListener(o)),e.push(u),t},clear:function(){e=e.filter(e=>e())}};return t}function x(e=0,t=0){let n=f(e-t);function r(n){return n<e||n>t}return{length:n,max:t,min:e,constrain:function(n){return r(n)?n<e?e:t:n},reachedAny:r,reachedMax:function(e){return e>t},reachedMin:function(t){return t<e},removeOffset:function(e){return n?e-n*Math.ceil((e-t)/n):e}}}function w(e){let t=e;function n(e){return c(e)?e:e.get()}return{get:function(){return t},set:function(e){t=n(e)},add:function(e){t+=n(e)},subtract:function(e){t-=n(e)}}}function S(e,t){let n="x"===e.scroll?function(e){return`translate3d(${e}px,0px,0px)`}:function(e){return`translate3d(0px,${e}px,0px)`},r=t.style,o=null,i=!1;return{clear:function(){i||(r.transform="",t.getAttribute("style")||t.removeAttribute("style"))},to:function(t){if(i)return;let u=Math.round(100*e.direction(t))/100;u!==o&&(r.transform=n(u),o=u)},toggleActive:function(e){i=!e}}}let O={align:"center",axis:"x",container:null,slides:null,containScroll:"trimSnaps",direction:"ltr",slidesToScroll:1,inViewThreshold:0,breakpoints:{},dragFree:!1,dragThreshold:10,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0,watchFocus:!0};function E(e,t,n){let r,o,i,u,k;let A=e.ownerDocument,I=A.defaultView,D=function(e){function t(e,t){return function e(t,n){return[t,n].reduce((t,n)=>(y(n).forEach(r=>{let o=t[r],i=n[r],u=s(o)&&s(i);t[r]=u?e(o,i):i}),t),{})}(e,t||{})}return{mergeOptions:t,optionsAtMedia:function(n){let r=n.breakpoints||{},o=y(r).filter(t=>e.matchMedia(t).matches).map(e=>r[e]).reduce((e,n)=>t(e,n),{});return t(n,o)},optionsMediaQueries:function(t){return t.map(e=>y(e.breakpoints||{})).reduce((e,t)=>e.concat(t),[]).map(e.matchMedia)}}}(I),L=(k=[],{init:function(e,t){return(k=t.filter(({options:e})=>!1!==D.optionsAtMedia(e).active)).forEach(t=>t.init(e,D)),t.reduce((e,t)=>Object.assign(e,{[t.name]:t}),{})},destroy:function(){k=k.filter(e=>e.destroy())}}),F=b(),M=function(){let e,t={},n={init:function(t){e=t},emit:function(r){return(t[r]||[]).forEach(t=>t(e,r)),n},off:function(e,r){return t[e]=(t[e]||[]).filter(e=>e!==r),n},on:function(e,r){return t[e]=(t[e]||[]).concat([r]),n},clear:function(){t={}}};return n}(),{mergeOptions:N,optionsAtMedia:P,optionsMediaQueries:C}=D,{on:j,off:T,emit:R}=M,z=!1,U=N(O,E.globalOptions),B=N(U),H=[];function V(t,n){!z&&(B=P(U=N(U,t)),H=n||H,function(){let{container:t,slides:n}=B;i=(a(t)?e.querySelector(t):t)||e.children[0];let r=a(n)?i.querySelectorAll(n):n;u=[].slice.call(r||i.children)}(),r=function t(n){let r=function(e,t,n,r,o,i,u){let s,O;let{align:E,axis:k,direction:A,startIndex:I,loop:D,duration:L,dragFree:F,dragThreshold:M,inViewThreshold:N,slidesToScroll:P,skipSnaps:C,containScroll:j,watchResize:T,watchSlides:R,watchDrag:z,watchFocus:U}=i,B={measure:function(e){let{offsetTop:t,offsetLeft:n,offsetWidth:r,offsetHeight:o}=e;return{top:t,right:n+r,bottom:t+o,left:n,width:r,height:o}}},H=B.measure(t),V=n.map(B.measure),$=function(e,t){let n="rtl"===t,r="y"===e,o=!r&&n?-1:1;return{scroll:r?"y":"x",cross:r?"x":"y",startEdge:r?"top":n?"right":"left",endEdge:r?"bottom":n?"left":"right",measureSize:function(e){let{height:t,width:n}=e;return r?t:n},direction:function(e){return e*o}}}(k,A),q=$.measureSize(H),_={measure:function(e){return e/100*q}},J=function(e,t){let n={start:function(){return 0},center:function(e){return(t-e)/2},end:function(e){return t-e}};return{measure:function(r,o){return a(e)?n[e](r):e(t,r,o)}}}(E,q),W=!D&&!!j,{slideSizes:X,slideSizesWithGaps:Q,startGap:Y,endGap:Z}=function(e,t,n,r,o,i){let{measureSize:u,startEdge:c,endEdge:a}=e,l=n[0]&&o,s=function(){if(!l)return 0;let e=n[0];return f(t[c]-e[c])}(),d=l?parseFloat(i.getComputedStyle(m(r)).getPropertyValue(`margin-${a}`)):0,p=n.map(u),h=n.map((e,t,n)=>{let r=t===g(n);return t?r?p[t]+d:n[t+1][c]-e[c]:p[t]+s}).map(f);return{slideSizes:p,slideSizesWithGaps:h,startGap:s,endGap:d}}($,H,V,n,D||!!j,o),G=function(e,t,n,r,o,i,u,a,l){let{startEdge:s,endEdge:d,direction:h}=e,y=c(n);return{groupSlides:function(e){return y?p(e).filter(e=>e%n==0).map(t=>e.slice(t,t+n)):e.length?p(e).reduce((n,c,l)=>{let p=m(n)||0,y=c===g(e),v=o[s]-i[p][s],b=o[s]-i[c][d],x=r||0!==p?0:h(u),w=f(b-(!r&&y?h(a):0)-(v+x));return l&&w>t+2&&n.push(c),y&&n.push(e.length),n},[]).map((t,n,r)=>{let o=Math.max(r[n-1]||0);return e.slice(o,t)}):[]}}}($,q,P,D,H,V,Y,Z,0),{snaps:K,snapsAligned:ee}=function(e,t,n,r,o){let{startEdge:i,endEdge:u}=e,{groupSlides:c}=o,a=c(r).map(e=>m(e)[u]-e[0][i]).map(f).map(t.measure),l=r.map(e=>n[i]-e[i]).map(e=>-f(e)),s=c(l).map(e=>e[0]).map((e,t)=>e+a[t]);return{snaps:l,snapsAligned:s}}($,J,H,V,G),et=-m(K)+m(Q),{snapsContained:en,scrollContainLimit:er}=function(e,t,n,r,o){let i=x(-t+e,0),u=n.map((e,t)=>{let{min:r,max:o}=i,u=i.constrain(e),c=t===g(n);return t?c||1>=f(r-u)?r:1>=f(o-u)?o:u:o}).map(e=>parseFloat(e.toFixed(3))),c=function(){let e=u[0],t=m(u);return x(u.lastIndexOf(e),u.indexOf(t)+1)}();return{snapsContained:function(){if(t<=e+2)return[i.max];if("keepSnaps"===r)return u;let{min:n,max:o}=c;return u.slice(n,o)}(),scrollContainLimit:c}}(q,et,ee,j,0),eo=W?en:ee,{limit:ei}=function(e,t,n){let r=t[0];return{limit:x(n?r-e:m(t),r)}}(et,eo,D),eu=function e(t,n,r){let{constrain:o}=x(0,t),i=t+1,u=c(n);function c(e){return r?f((i+e)%i):o(e)}function a(){return e(t,u,r)}let l={get:function(){return u},set:function(e){return u=c(e),l},add:function(e){return a().set(u+e)},clone:a};return l}(g(eo),I,D),ec=eu.clone(),ea=p(n),el=({dragHandler:e,scrollBody:t,scrollBounds:n,options:{loop:r}})=>{r||n.constrain(e.pointerDown()),t.seek()},es=({scrollBody:e,translate:t,location:n,offsetLocation:r,previousLocation:o,scrollLooper:i,slideLooper:u,dragHandler:c,animation:a,eventHandler:l,scrollBounds:s,options:{loop:f}},d)=>{let p=e.settled(),m=!s.shouldConstrain(),g=f?p:p&&m;g&&!c.pointerDown()&&(a.stop(),l.emit("settle")),g||l.emit("scroll");let h=n.get()*d+o.get()*(1-d);r.set(h),f&&(i.loop(e.direction()),u.loop()),t.to(r.get())},ef=function(e,t,n,r){let o=b(),i=1e3/60,u=null,c=0,a=0;function l(e){if(!a)return;u||(u=e,n(),n());let o=e-u;for(u=e,c+=o;c>=i;)n(),c-=i;r(c/i),a&&(a=t.requestAnimationFrame(l))}function s(){t.cancelAnimationFrame(a),u=null,c=0,a=0}return{init:function(){o.add(e,"visibilitychange",()=>{e.hidden&&(u=null,c=0)})},destroy:function(){s(),o.clear()},start:function(){a||(a=t.requestAnimationFrame(l))},stop:s,update:n,render:r}}(r,o,()=>el(ek),e=>es(ek,e)),ed=eo[eu.get()],ep=w(ed),em=w(ed),eg=w(ed),eh=w(ed),ey=function(e,t,n,r,o,i){let u=0,c=0,a=o,l=.68,s=e.get(),p=0;function m(e){return a=e,h}function g(e){return l=e,h}let h={direction:function(){return c},duration:function(){return a},velocity:function(){return u},seek:function(){let t=r.get()-e.get(),o=0;return a?(n.set(e),u+=t/a,u*=l,s+=u,e.add(u),o=s-p):(u=0,n.set(r),e.set(r),o=t),c=d(o),p=s,h},settled:function(){return .001>f(r.get()-t.get())},useBaseFriction:function(){return g(.68)},useBaseDuration:function(){return m(o)},useFriction:g,useDuration:m};return h}(ep,eg,em,eh,L,0),ev=function(e,t,n,r,o){let{reachedAny:i,removeOffset:u,constrain:c}=r;function a(e){return e.concat().sort((e,t)=>f(e)-f(t))[0]}function l(t,r){let o=[t,t+n,t-n];if(!e)return t;if(!r)return a(o);let i=o.filter(e=>d(e)===r);return i.length?a(i):m(o)-n}return{byDistance:function(n,r){let a=o.get()+n,{index:s,distance:d}=function(n){let r=e?u(n):c(n),{index:o}=t.map((e,t)=>({diff:l(e-r,0),index:t})).sort((e,t)=>f(e.diff)-f(t.diff))[0];return{index:o,distance:r}}(a),p=!e&&i(a);if(!r||p)return{index:s,distance:n};let m=n+l(t[s]-d,0);return{index:s,distance:m}},byIndex:function(e,n){let r=l(t[e]-o.get(),n);return{index:e,distance:r}},shortcut:l}}(D,eo,et,ei,eh),eb=function(e,t,n,r,o,i,u){function c(o){let c=o.distance,a=o.index!==t.get();i.add(c),c&&(r.duration()?e.start():(e.update(),e.render(1),e.update())),a&&(n.set(t.get()),t.set(o.index),u.emit("select"))}return{distance:function(e,t){c(o.byDistance(e,t))},index:function(e,n){let r=t.clone().set(e);c(o.byIndex(r.get(),n))}}}(ef,eu,ec,ey,ev,eh,u),ex=function(e){let{max:t,length:n}=e;return{get:function(e){return n?-((e-t)/n):0}}}(ei),ew=b(),eS=function(e,t,n,r){let o;let i={},u=null,c=null,a=!1;return{init:function(){o=new IntersectionObserver(e=>{a||(e.forEach(e=>{i[t.indexOf(e.target)]=e}),u=null,c=null,n.emit("slidesInView"))},{root:e.parentElement,threshold:r}),t.forEach(e=>o.observe(e))},destroy:function(){o&&o.disconnect(),a=!0},get:function(e=!0){if(e&&u)return u;if(!e&&c)return c;let t=y(i).reduce((t,n)=>{let r=parseInt(n),{isIntersecting:o}=i[r];return(e&&o||!e&&!o)&&t.push(r),t},[]);return e&&(u=t),e||(c=t),t}}}(t,n,u,N),{slideRegistry:eO}=function(e,t,n,r,o,i){let{groupSlides:u}=o,{min:c,max:a}=r;return{slideRegistry:function(){let r=u(i);return 1===n.length?[i]:e&&"keepSnaps"!==t?r.slice(c,a).map((e,t,n)=>{let r=t===g(n);return t?r?h(g(i)-m(n)[0]+1,m(n)[0]):e:h(m(n[0])+1)}):r}()}}(W,j,eo,er,G,ea),eE=function(e,t,n,r,o,i,u,a){let s={passive:!0,capture:!0},f=0;function d(e){"Tab"===e.code&&(f=new Date().getTime())}return{init:function(p){a&&(i.add(document,"keydown",d,!1),t.forEach((t,d)=>{i.add(t,"focus",t=>{(l(a)||a(p,t))&&function(t){if(new Date().getTime()-f>10)return;u.emit("slideFocusStart"),e.scrollLeft=0;let i=n.findIndex(e=>e.includes(t));c(i)&&(o.useDuration(0),r.index(i,0),u.emit("slideFocus"))}(d)},s)}))}}}(e,n,eO,eb,ey,ew,u,U),ek={ownerDocument:r,ownerWindow:o,eventHandler:u,containerRect:H,slideRects:V,animation:ef,axis:$,dragHandler:function(e,t,n,r,o,i,u,c,a,s,p,m,g,h,y,w,S,O,E){let{cross:k,direction:A}=e,I=["INPUT","SELECT","TEXTAREA"],D={passive:!1},L=b(),F=b(),M=x(50,225).constrain(h.measure(20)),N={mouse:300,touch:400},P={mouse:500,touch:600},C=y?43:25,j=!1,T=0,R=0,z=!1,U=!1,B=!1,H=!1;function V(e){if(!v(e,r)&&e.touches.length>=2)return $(e);let t=i.readPoint(e),n=i.readPoint(e,k),u=f(t-T),a=f(n-R);if(!U&&!H&&(!e.cancelable||!(U=u>a)))return $(e);let l=i.pointerMove(e);u>w&&(B=!0),s.useFriction(.3).useDuration(.75),c.start(),o.add(A(l)),e.preventDefault()}function $(e){let t=p.byDistance(0,!1).index!==m.get(),n=i.pointerUp(e)*(y?P:N)[H?"mouse":"touch"],r=function(e,t){let n=m.add(-1*d(e)),r=p.byDistance(e,!y).distance;return y||f(e)<M?r:S&&t?.5*r:p.byIndex(n.get(),0).distance}(A(n),t),o=function(e,t){var n,r;if(0===e||0===t||f(e)<=f(t))return 0;let o=(n=f(e),r=f(t),f(n-r));return f(o/e)}(n,r);U=!1,z=!1,F.clear(),s.useDuration(C-10*o).useFriction(.68+o/50),a.distance(r,!y),H=!1,g.emit("pointerUp")}function q(e){B&&(e.stopPropagation(),e.preventDefault(),B=!1)}return{init:function(e){E&&L.add(t,"dragstart",e=>e.preventDefault(),D).add(t,"touchmove",()=>void 0,D).add(t,"touchend",()=>void 0).add(t,"touchstart",c).add(t,"mousedown",c).add(t,"touchcancel",$).add(t,"contextmenu",$).add(t,"click",q,!0);function c(c){(l(E)||E(e,c))&&function(e){let c=v(e,r);H=c,B=y&&c&&!e.buttons&&j,j=f(o.get()-u.get())>=2,c&&0!==e.button||function(e){let t=e.nodeName||"";return I.includes(t)}(e.target)||(z=!0,i.pointerDown(e),s.useFriction(0).useDuration(0),o.set(u),function(){let e=H?n:t;F.add(e,"touchmove",V,D).add(e,"touchend",$).add(e,"mousemove",V,D).add(e,"mouseup",$)}(),T=i.readPoint(e),R=i.readPoint(e,k),g.emit("pointerDown"))}(c)}},destroy:function(){L.clear(),F.clear()},pointerDown:function(){return z}}}($,e,r,o,eh,function(e,t){let n,r;function o(e){return e.timeStamp}function i(n,r){let o=r||e.scroll,i=`client${"x"===o?"X":"Y"}`;return(v(n,t)?n:n.touches[0])[i]}return{pointerDown:function(e){return n=e,r=e,i(e)},pointerMove:function(e){let t=i(e)-i(r),u=o(e)-o(n)>170;return r=e,u&&(n=e),t},pointerUp:function(e){if(!n||!r)return 0;let t=i(r)-i(n),u=o(e)-o(n),c=o(e)-o(r)>170,a=t/u;return u&&!c&&f(a)>.1?a:0},readPoint:i}}($,o),ep,ef,eb,ey,ev,eu,u,_,F,M,C,0,z),eventStore:ew,percentOfView:_,index:eu,indexPrevious:ec,limit:ei,location:ep,offsetLocation:eg,previousLocation:em,options:i,resizeHandler:function(e,t,n,r,o,i,u){let c,a;let s=[e].concat(r),d=[],p=!1;function m(e){return o.measureSize(u.measure(e))}return{init:function(o){i&&(a=m(e),d=r.map(m),c=new ResizeObserver(n=>{(l(i)||i(o,n))&&function(n){for(let i of n){if(p)return;let n=i.target===e,u=r.indexOf(i.target),c=n?a:d[u];if(f(m(n?e:r[u])-c)>=.5){o.reInit(),t.emit("resize");break}}}(n)}),n.requestAnimationFrame(()=>{s.forEach(e=>c.observe(e))}))},destroy:function(){p=!0,c&&c.disconnect()}}}(t,u,o,n,$,T,B),scrollBody:ey,scrollBounds:function(e,t,n,r,o){let i=o.measure(10),u=o.measure(50),c=x(.1,.99),a=!1;function l(){return!!(!a&&e.reachedAny(n.get())&&e.reachedAny(t.get()))}return{shouldConstrain:l,constrain:function(o){if(!l())return;let a=e.reachedMin(t.get())?"min":"max",s=f(e[a]-t.get()),d=n.get()-t.get(),p=c.constrain(s/u);n.subtract(d*p),!o&&f(d)<i&&(n.set(e.constrain(n.get())),r.useDuration(25).useBaseFriction())},toggleActive:function(e){a=!e}}}(ei,eg,eh,ey,_),scrollLooper:function(e,t,n,r){let{reachedMin:o,reachedMax:i}=x(t.min+.1,t.max+.1);return{loop:function(t){if(!(1===t?i(n.get()):-1===t&&o(n.get())))return;let u=-1*t*e;r.forEach(e=>e.add(u))}}}(et,ei,eg,[ep,eg,em,eh]),scrollProgress:ex,scrollSnapList:eo.map(ex.get),scrollSnaps:eo,scrollTarget:ev,scrollTo:eb,slideLooper:function(e,t,n,r,o,i,u,c,a){let l=p(o),s=m(d(p(o).reverse(),u[0]),n,!1).concat(m(d(l,t-u[0]-1),-n,!0));function f(e,t){return e.reduce((e,t)=>e-o[t],t)}function d(e,t){return e.reduce((e,n)=>f(e,t)>0?e.concat([n]):e,[])}function m(o,u,l){let s=i.map((e,n)=>({start:e-r[n]+.5+u,end:e+t-.5+u}));return o.map(t=>{let r=l?0:-n,o=l?n:0,i=s[t][l?"end":"start"];return{index:t,loopPoint:i,slideLocation:w(-1),translate:S(e,a[t]),target:()=>c.get()>i?r:o}})}return{canLoop:function(){return s.every(({index:e})=>.1>=f(l.filter(t=>t!==e),t))},clear:function(){s.forEach(e=>e.translate.clear())},loop:function(){s.forEach(e=>{let{target:t,translate:n,slideLocation:r}=e,o=t();o!==r.get()&&(n.to(o),r.set(o))})},loopPoints:s}}($,q,et,X,Q,K,eo,eg,n),slideFocus:eE,slidesHandler:(O=!1,{init:function(e){R&&(s=new MutationObserver(t=>{!O&&(l(R)||R(e,t))&&function(t){for(let n of t)if("childList"===n.type){e.reInit(),u.emit("slidesChanged");break}}(t)})).observe(t,{childList:!0})},destroy:function(){s&&s.disconnect(),O=!0}}),slidesInView:eS,slideIndexes:ea,slideRegistry:eO,slidesToScroll:G,target:eh,translate:S($,t)};return ek}(e,i,u,A,I,n,M);return n.loop&&!r.slideLooper.canLoop()?t(Object.assign({},n,{loop:!1})):r}(B),C([U,...H.map(({options:e})=>e)]).forEach(e=>F.add(e,"change",$)),B.active&&(r.translate.to(r.location.get()),r.animation.init(),r.slidesInView.init(),r.slideFocus.init(W),r.eventHandler.init(W),r.resizeHandler.init(W),r.slidesHandler.init(W),r.options.loop&&r.slideLooper.loop(),i.offsetParent&&u.length&&r.dragHandler.init(W),o=L.init(W,H)))}function $(e,t){let n=J();q(),V(N({startIndex:n},e),t),M.emit("reInit")}function q(){r.dragHandler.destroy(),r.eventStore.clear(),r.translate.clear(),r.slideLooper.clear(),r.resizeHandler.destroy(),r.slidesHandler.destroy(),r.slidesInView.destroy(),r.animation.destroy(),L.destroy(),F.clear()}function _(e,t,n){B.active&&!z&&(r.scrollBody.useBaseFriction().useDuration(!0===t?0:B.duration),r.scrollTo.index(e,n||0))}function J(){return r.index.get()}let W={canScrollNext:function(){return r.index.add(1).get()!==J()},canScrollPrev:function(){return r.index.add(-1).get()!==J()},containerNode:function(){return i},internalEngine:function(){return r},destroy:function(){z||(z=!0,F.clear(),q(),M.emit("destroy"),M.clear())},off:T,on:j,emit:R,plugins:function(){return o},previousScrollSnap:function(){return r.indexPrevious.get()},reInit:$,rootNode:function(){return e},scrollNext:function(e){_(r.index.add(1).get(),e,-1)},scrollPrev:function(e){_(r.index.add(-1).get(),e,1)},scrollProgress:function(){return r.scrollProgress.get(r.location.get())},scrollSnapList:function(){return r.scrollSnapList},scrollTo:_,selectedScrollSnap:J,slideNodes:function(){return u},slidesInView:function(){return r.slidesInView.get()},slidesNotInView:function(){return r.slidesInView.get(!1)}};return V(t,n),setTimeout(()=>M.emit("init"),0),W}function k(e={},t=[]){let n=(0,r.useRef)(e),o=(0,r.useRef)(t),[c,a]=(0,r.useState)(),[l,s]=(0,r.useState)(),f=(0,r.useCallback)(()=>{c&&c.reInit(n.current,o.current)},[c]);return(0,r.useEffect)(()=>{i(n.current,e)||(n.current=e,f())},[e,f]),(0,r.useEffect)(()=>{!function(e,t){if(e.length!==t.length)return!1;let n=u(e),r=u(t);return n.every((e,t)=>i(e,r[t]))}(o.current,t)&&(o.current=t,f())},[t,f]),(0,r.useEffect)(()=>{if("undefined"!=typeof window&&window.document&&window.document.createElement&&l){E.globalOptions=k.globalOptions;let e=E(l,n.current,o.current);return a(e),()=>e.destroy()}a(void 0)},[l,a]),[s,c]}E.globalOptions=void 0,k.globalOptions=void 0},89208:(e,t,n)=>{function r(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}n.d(t,{A:()=>o});var o=function e(t,n){function o(e,o,i){if("undefined"!=typeof document){"number"==typeof(i=r({},n,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var u="";for(var c in i)i[c]&&(u+="; "+c,!0!==i[c]&&(u+="="+i[c].split(";")[0]));return document.cookie=e+"="+t.write(o,e)+u}}return Object.create({set:o,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],r={},o=0;o<n.length;o++){var i=n[o].split("="),u=i.slice(1).join("=");try{var c=decodeURIComponent(i[0]);if(r[c]=t.read(u,c),e===c)break}catch(e){}}return e?r[e]:r}},remove:function(e,t){o(e,"",r({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,r({},this.attributes,t))},withConverter:function(t){return e(r({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(n)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})},14057:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(12115);let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((e,t,n)=>!!e&&""!==e.trim()&&n.indexOf(e)===t).join(" ").trim()};var u={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let c=(0,r.forwardRef)((e,t)=>{let{color:n="currentColor",size:o=24,strokeWidth:c=2,absoluteStrokeWidth:a,className:l="",children:s,iconNode:f,...d}=e;return(0,r.createElement)("svg",{ref:t,...u,width:o,height:o,stroke:n,strokeWidth:a?24*Number(c)/Number(o):c,className:i("lucide",l),...d},[...f.map(e=>{let[t,n]=e;return(0,r.createElement)(t,n)}),...Array.isArray(s)?s:[s]])}),a=(e,t)=>{let n=(0,r.forwardRef)((n,u)=>{let{className:a,...l}=n;return(0,r.createElement)(c,{ref:u,iconNode:t,className:i("lucide-".concat(o(e)),a),...l})});return n.displayName="".concat(e),n}},41598:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(14057).A)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},10503:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(14057).A)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},26039:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(14057).A)("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])}}]);
"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4066],{58441:(e,r,t)=>{t.d(r,{A:()=>i});var a=t(95155),s=t(5565),d=t(35007),o=t(39286),n=t(3392),c=t(29602),l=t(14085);function i(e){let{order:r,admin:t=!1,onComplete:i=()=>{},onCancel:u=()=>{}}=e;return(0,a.jsxs)(d.Zp,{className:"w-full max-w-4xl min-w-fit",children:[(0,a.jsxs)(d.aR,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[(0,a.jsxs)(d.ZB,{className:"text-xl font-bold",children:["Order #",r.orderId]}),(0,a.jsx)(o.E,{variant:"completed"===r.status?"default":"secondary",className:"".concat("completed"===r.status?"bg-green-500":"pending"===r.status?"bg-yellow-400":"bg-red-400"),children:r.status})]}),(0,a.jsx)(d.Wu,{children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 text-sm",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{children:["Customer: ",r.name]}),(0,a.jsxs)("p",{children:["Phone: ",r.phone_number]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"break-words",children:["Address: ",r.address]}),(0,a.jsxs)("p",{children:["Created: ",(0,c.Yq)(new Date(r.createdAt))]}),r.completedAt&&(0,a.jsxs)("p",{children:["Completed:"," ",(0,c.Yq)(new Date(r.completedAt))]})]})]}),(0,a.jsx)(n.F,{className:"min-h-[120px] max-h-[250px] w-full rounded-md border overflow-y-auto",children:(0,a.jsx)("div",{className:"flex flex-wrap max-md:flex-col gap-4 p-4",children:r.products.map((e,r)=>(0,a.jsxs)("div",{className:"flex items-center space-x-4 bg-secondary/10 p-2 rounded-md w-[calc(50%-2rem)] max-md:w-fit",children:[(0,a.jsx)("div",{className:"relative w-[60px] h-[60px] flex-shrink-0",children:(0,a.jsx)(s.default,{src:e.productImage,alt:e.productName,fill:!0,className:"object-cover rounded-md",sizes:"60px"})}),(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsx)("h3",{className:"font-semibold text-sm truncate",children:e.productName}),(0,a.jsxs)("p",{className:"text-xs text-muted-foreground",children:[e.color,", Size:"," ",e.size]}),(0,a.jsxs)("p",{className:"text-xs",children:["Qty: ",e.quantity]}),(0,a.jsx)("p",{className:"text-xs font-semibold",children:(0,c.$g)(e.productPrice*e.quantity)})]})]},r))})}),(0,a.jsxs)("div",{className:"flex justify-between items-center pt-4 border-t",children:[(0,a.jsx)("span",{className:"font-semibold",children:"Total:"}),(0,a.jsx)("span",{className:"font-semibold",children:(0,c.$g)(r.total)})]})]})}),t&&"pending"==r.status&&(0,a.jsxs)(d.wL,{className:"w-full flex justify-end items-center space-x-4",children:[(0,a.jsxs)(l.$,{className:"bg-red-400 hover:bg-red-400/90",onClick:u,children:[" ","Order cancel"]}),(0,a.jsx)(l.$,{className:"bg-sub text-main hover:bg-[#b88e2f]/90",onClick:i,children:"Order complete"})]})]})}},39286:(e,r,t)=>{t.d(r,{E:()=>n});var a=t(95155);t(12115);var s=t(31027),d=t(29602);let o=(0,s.F)("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function n(e){let{className:r,variant:t,...s}=e;return(0,a.jsx)("div",{className:(0,d.cn)(o({variant:t}),r),...s})}},14085:(e,r,t)=>{t.d(r,{$:()=>l,r:()=>c});var a=t(95155),s=t(12115),d=t(12317),o=t(31027),n=t(29602);let c=(0,o.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),l=s.forwardRef((e,r)=>{let{className:t,variant:s,size:o,asChild:l=!1,...i}=e,u=l?d.DX:"button";return(0,a.jsx)(u,{className:(0,n.cn)(c({variant:s,size:o,className:t})),ref:r,...i})});l.displayName="Button"},35007:(e,r,t)=>{t.d(r,{BT:()=>l,Wu:()=>i,ZB:()=>c,Zp:()=>o,aR:()=>n,wL:()=>u});var a=t(95155),s=t(12115),d=t(29602);let o=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,a.jsx)("div",{ref:r,className:(0,d.cn)("rounded-xl border bg-card text-card-foreground shadow",t),...s})});o.displayName="Card";let n=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,a.jsx)("div",{ref:r,className:(0,d.cn)("flex flex-col space-y-1.5 p-6",t),...s})});n.displayName="CardHeader";let c=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,a.jsx)("div",{ref:r,className:(0,d.cn)("font-semibold leading-none tracking-tight",t),...s})});c.displayName="CardTitle";let l=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,a.jsx)("div",{ref:r,className:(0,d.cn)("text-sm text-muted-foreground",t),...s})});l.displayName="CardDescription";let i=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,a.jsx)("div",{ref:r,className:(0,d.cn)("p-6 pt-0",t),...s})});i.displayName="CardContent";let u=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,a.jsx)("div",{ref:r,className:(0,d.cn)("flex items-center p-6 pt-0",t),...s})});u.displayName="CardFooter"},3392:(e,r,t)=>{t.d(r,{F:()=>n});var a=t(95155),s=t(12115),d=t(21868),o=t(29602);let n=s.forwardRef((e,r)=>{let{className:t,children:s,...n}=e;return(0,a.jsxs)(d.bL,{ref:r,className:(0,o.cn)("relative overflow-hidden",t),...n,children:[(0,a.jsx)(d.LM,{className:"h-full w-full rounded-[inherit]",children:s}),(0,a.jsx)(c,{}),(0,a.jsx)(d.OK,{})]})});n.displayName=d.bL.displayName;let c=s.forwardRef((e,r)=>{let{className:t,orientation:s="vertical",...n}=e;return(0,a.jsx)(d.VM,{ref:r,orientation:s,className:(0,o.cn)("flex touch-none select-none transition-colors","vertical"===s&&"h-full w-2.5 border-l border-l-transparent p-[1px]","horizontal"===s&&"h-2.5 flex-col border-t border-t-transparent p-[1px]",t),...n,children:(0,a.jsx)(d.lr,{className:"relative flex-1 rounded-full bg-border"})})});c.displayName=d.VM.displayName},70874:(e,r,t)=>{t.d(r,{Kv:()=>c,RL:()=>o,Vd:()=>d,fS:()=>n,xo:()=>s});var a=t(46820);let s=async e=>{try{let r=await a.A.get("api/order/routes.php?userId=".concat(e));console.log("Backend Response:",r.data);let t=[];return r.data.length>0&&(t=r.data.map(e=>({orderId:e.orderId,products:e.products.map(e=>({productId:e.productId,quantity:e.quantity,color:e.color,size:e.size,productName:e.productName,productImage:e.productImage,productPrice:e.productPrice})),status:e.status,createdAt:e.createdAt,completedAt:e.completedAt,userId:e.userId,phone_number:e.phone_number,address:e.address,total:Number(e.total),name:e.name}))),t}catch(e){return console.error("Error fetching orders:",e),{error:"Error fetching orders"}}},d=async()=>{try{let e=await a.A.get("api/order/routes.php");return console.log("Backend Response:",e.data),e.data.map(e=>({orderId:e.orderId,products:e.products.map(e=>({productId:e.productId,quantity:e.quantity,color:e.color,size:e.size,productName:e.productName,productImage:e.productImage,productPrice:e.productPrice})),status:e.status,createdAt:e.createdAt,completedAt:e.completedAt,userId:e.userId,phone_number:e.phone_number,address:e.address,total:Number(e.total),name:e.name}))}catch(e){return console.log("Error fetching orders:",e),{error:"Error fetching orders"}}},o=async e=>{try{let r=await a.A.get("api/order/routes.php?orderId=".concat(e));return console.log("Backend Response:",r.data),{orderId:r.data.orderId,products:r.data.products.map(e=>({productId:e.productId,quantity:e.quantity,color:e.color,size:e.size,productName:e.productName,productImage:e.productImage,productPrice:e.productPrice})),status:r.data.status,createdAt:r.data.createdAt,completedAt:r.data.completedAt,userId:r.data.userId,phone_number:r.data.phone_number,address:r.data.address,total:Number(r.data.total),name:r.data.name}}catch(e){return console.log("Error fetching orders:",e),{error:"Error fetching orders"}}},n=async e=>{try{let r=await a.A.post("api/order/routes.php",e);return console.log("Backend Response:",r.data),{orderId:r.data.orderId}}catch(e){return console.log("Error creating order:",e),{error:"Error creating order"}}},c=async(e,r)=>{try{let t=await a.A.put("api/order/routes.php?orderId=".concat(e,"&status=").concat(r));return console.log("Backend Response:",t.data),{message:t.data.message}}catch(e){return console.log("Error updating order status:",e),{error:"Error updating order status"}}}}}]);
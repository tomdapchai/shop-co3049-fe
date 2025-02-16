"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7872],{46820:(e,t,r)=>{r.d(t,{A:()=>a});let a=r(82651).A.create({baseURL:"http://localhost:5050",withCredentials:!0})},80839:(e,t,r)=>{r.d(t,{AuthProvider:()=>y,A:()=>d});var a=r(95155),s=r(12115),n=r(46820);let o=async(e,t)=>{let r=await n.A.post("api/auth/login.php",{username:e,password:t});return console.log("Backend Response:",r.data),{status:r.data.status,message:r.data.message,userId:r.data.userId}},l=async(e,t)=>{let r=await n.A.post("api/auth/register.php",{username:e,password:t});return console.log("Backend Response:",r.data),{status:r.data.status,message:r.data.message}};var u=r(89208),c=r(35408);let i=(0,s.createContext)(void 0),d=()=>{let e=(0,s.useContext)(i);if(!e)throw Error("useAuth must be used within an AuthProvider");return e},g="authUser",p={expires:1,secure:!0,sameSite:"strict",path:"/"},m="adminData",h={expires:1,secure:!0,sameSite:"strict",path:"/admin"},y=e=>{let{children:t}=e,[r,n]=(0,s.useState)(!1),[d,y]=(0,s.useState)("1"),[f,w]=(0,s.useState)(null),[D,A]=(0,s.useState)(!1),[b,E]=(0,s.useState)(null),[v,I]=(0,s.useState)(!1);(0,s.useEffect)(()=>{let e=u.A.get(g);u.A.get(m)&&I(!0),e&&(y(e),n(!0)),A(!0)},[]);let x=(e,t)=>{t?u.A.set(g,e,p):u.A.remove(g,{path:"/"}),y(e),n(t)};(0,s.useEffect)(()=>{r&&(0,c.kl)(d).then(e=>{"error"in e?w(e.error):(console.log("User:",e),E(e))})},[r]);let k=async(e,t)=>{let r=await o(e,t);return"error"===r.status?(w(r.message),{error:r.message}):(x(r.userId,!0),w(null),{message:r.message})},S=async()=>{x("",!1),w(null)},j=async(e,t)=>"admin"===e&&"password"===t?(I(!0),u.A.set(m,"admin",h),{message:"Admin logged in"}):(w("Invalid credentials"),{error:"Invalid credentials"}),N=async()=>{I(!1),u.A.remove(m,{path:"/admin"})},B=async(e,t)=>{let r=await l(e,t);return"error"===r.status?(w(r.message),{error:r.message}):(w(null),x(d,!0),{message:r.message})};return D?(0,a.jsx)(i.Provider,{value:{isAdmin:v,isLoggedIn:r,userId:d,error:f,user:b,loginUser:k,logoutUser:S,loginAdmin:j,logoutAdmin:N,register:B},children:t}):null}},29602:(e,t,r)=>{r.d(t,{$g:()=>o,QH:()=>u,Vi:()=>g,Yq:()=>l,cV:()=>c,cn:()=>n,dw:()=>d,gI:()=>i,oE:()=>p});var a=r(43463),s=r(69795);function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.QP)((0,a.$)(t))}let o=e=>e.toLocaleString("en-US",{style:"currency",currency:"VND",currencyDisplay:"code"});function l(e){return new Intl.DateTimeFormat("vi-VN",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}).format(e)}function u(e){let t=e;for(let e of[{regex:/HEADLINE<([^>]+)>/g,replace:'<h1 class="text-2xl font-bold mb-4">$1</h1>'},{regex:/SECTION<([^>]+)>/g,replace:'<h2 class="text-lg font-bold mb-2">$1</h2>'},{regex:/LINK<([^,]+),\s*([^>]+)>/g,replace:'<a href="$2" class="text-black hover:text-slate-500 underline">$1</a>'},{regex:/IMG<([^,]+),\s*([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g,replace:(e,t,r,a,s)=>'<div class="w-full flex justify-center items-center">\n            <Image src="'.concat(r,'" alt="').concat(t,'" ').concat(a?'width="'.concat(a,'"'):""," ").concat(s?'height="'.concat(s,'"'):"",' class="rounded-lg" /></div>')},{regex:/P<([^>]+)>/g,replace:(e,t)=>{let r=t.split(/\n/).map(e=>e.trim()).join("<br/>");return'<p class="text-base text-black">'.concat(r,"</p>")}}])t=t.replace(e.regex,e.replace);return'<div class="w-full flex flex-col justify-center items-start">'.concat(t,"</div>")}let c=async e=>{let t=new FormData;t.append("file",e),t.append("upload_preset","yxg1dfzu");try{let e=await fetch("https://api.cloudinary.com/v1_1/".concat("dgwujcdba","/image/upload"),{method:"POST",body:t}),r=await e.json();if(r.secure_url)return r.secure_url;return console.error("Cloudinary error response:",r),{error:"Invalid response from Cloudinary"}}catch(e){return console.error("Upload error:",e),{error:"Upload error"}}};function i(e,t,r){let a=new Date;if("col"===r){let r=[];for(let s=t;s>=0;s--){let t=new Date(a);t.setDate(a.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.createdAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()});r.push({date:n,total:o.length})}return r}{let r={completed:0,pending:0,cancelled:0},s=new Date(a);return s.setDate(a.getDate()-t),e.forEach(e=>{let t=new Date(e.createdAt);t>=s&&t<=a&&(r[e.status]=(r[e.status]||0)+1)}),Object.entries(r).map(e=>{let[t,r]=e;return{status:t,total:r}})}}function d(e,t){let r=new Date,a=[];for(let s=t;s>=0;s--){let t=new Date(r);t.setDate(r.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.joinAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()});a.push({date:n,total:o.length})}return a}function g(e,t){let r=new Date,a=[];for(let s=t;s>=0;s--){let t=new Date(r);t.setDate(r.getDate()-s);let n=t.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.filter(e=>{let r=new Date(e.createdAt);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).reduce((e,t)=>e+("completed"===t.status?t.total:0),0);a.push({date:n,total:o/1e3})}return a}function p(e,t,r){let a=new Date,s=[];for(let n=r;n>=0;n--){let r=new Date(a);r.setDate(a.getDate()-n);let o=r.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),l=e.filter(e=>{let t=new Date(e.createdAt);return t.getDate()===r.getDate()&&t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}),u=t.filter(e=>{let t=new Date(e.joinAt);return t.getDate()===r.getDate()&&t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}),c=l.reduce((e,t)=>e+("completed"===t.status?t.total:0),0);s.push({date:o,totalOrder:l.length,totalRevenue:c/1e7,totalUser:u.length})}return s}},35408:(e,t,r)=>{r.d(t,{CF:()=>s,bu:()=>o,ej:()=>u,iH:()=>i,kZ:()=>l,kl:()=>n,rk:()=>c});var a=r(46820);let s=async()=>{try{let e=await a.A.get("api/user/routes.php");return console.log("Backend Response:",e.data),e.data.data.map(e=>({userId:Number(e.userId),name:e.username?e.username:"",email:e.email?e.email:"",phoneNumber:e.phone_number?e.phone_number:"",address:e.street&&e.city?{street:e.street,city:e.city}:{street:"",city:""},cart:e.cart?JSON.parse(e.cart):[],status:e.status,joinAt:e.joinAt}))}catch(e){return console.log("Error fetching users:",e),{error:"Error fetching users"}}},n=async e=>{try{let t=await a.A.get("api/user/routes.php?userId=".concat(e));console.log("Backend Response:",t.data);let r=t.data.data;return{userId:Number(r.userId),username:r.username,name:r.name?r.name:"",email:r.email?r.email:"",phoneNumber:r.phone_number?r.phone_number:"",address:r.street&&r.city?{street:r.street,city:r.city}:{street:"",city:""},cart:r.cart?JSON.parse(r.cart):[],status:r.status,joinAt:r.joinAt}}catch(e){return console.log("Error fetching user:",e),{error:"Error fetching user"}}},o=async(e,t)=>{try{let r=await a.A.put("api/user/routes.php?userId=".concat(e),{email:t.email,name:t.name,phone_number:t.phoneNumber,street:t.address?t.address.street:"",city:t.address?t.address.city:""});return console.log("Backend Response:",r.data),{message:r.data.message}}catch(e){return console.log("Error updating user:",e),{error:"Error updating user"}}},l=async(e,t)=>{try{let r=await a.A.put("api/user/routes.php?updateType=username&userId=".concat(e),t);return console.log("Backend Response:",r.data),{message:r.data.message}}catch(e){return console.log("Error updating user:",e),{error:"Error updating username"}}},u=async(e,t)=>{try{let r=await a.A.put("api/user/routes.php?updateType=password&userId=".concat(e),t);return console.log("Backend Response:",r.data),{message:r.data.message}}catch(e){return console.log("Error updating user:",e),{error:"Error updating password"}}},c=async(e,t)=>{try{let r=await a.A.put("api/user/routes.php?updateType=adminPassword&userId=".concat(e),t);return console.log("Backend Response:",r.data),{message:r.data.message}}catch(e){return console.log("Error updating user:",e),{error:"Error updating password"}}},i=async(e,t)=>{try{let r=await a.A.put("api/user/routes.php?updateType=cart&userId=".concat(e),t);return console.log("Backend Response:",r.data),{message:r.data.message}}catch(e){return console.log("Error updating cart:",e),{error:"Error updating cart"}}}}}]);
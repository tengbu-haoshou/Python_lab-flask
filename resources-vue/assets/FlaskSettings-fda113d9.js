import{a as m}from"./axios-4d564c32.js";import{u as F,a as P,r as _,b as o,o as f,c as V,w as t,d as e,e as c,t as E,g as R,h as T,f as u}from"./index-ad5c40b7.js";const H=u("h3",{class:"display-1"},"lab-flask",-1),L=u("h3",{class:"display-1"},"Home",-1),O=u("h3",{class:"display-1"},"Settings",-1),U={key:0},$={__name:"FlaskSettings",setup(A){const v=F(),h=P(),r=_(!1),n=_(""),b=[{title:"Product Name",key:"PRODUCT_NAME"},{title:"Product Description",key:"PRODUCT_DESC"}],i=_([]);m.get("/info?type=settings").then(function(a){a.data.status=="action-ok"?(i.value=a.data.list,r.value=!0):n.value=a.data.message}).catch(function(){n.value="Network trouble has occurred."});function g(){const a=new FormData;m.post("/unauth",a),h.sessionId="",v.push("/")}return(a,d)=>{const k=o("v-app-bar-title"),y=o("v-btn"),x=o("v-app-bar"),C=o("v-footer"),s=o("v-col"),l=o("v-row"),p=o("v-tab"),w=o("v-tabs"),D=o("v-data-table"),N=o("v-container"),S=o("v-main"),B=o("v-app");return f(),V(B,null,{default:t(()=>[e(x,{color:"blue",app:"",dark:""},{default:t(()=>[e(k,null,{default:t(()=>[H]),_:1}),e(y,{id:"logout",variant:"outlined",color:"white",onClick:d[0]||(d[0]=I=>g()),style:{"text-transform":"none"}},{default:t(()=>[c("Logout")]),_:1})]),_:1}),e(C,{color:"blue",app:"",dark:""},{default:t(()=>[c("Copyright © Xxxx Co., Ltd.")]),_:1}),e(S,null,{default:t(()=>[e(N,{fluid:""},{default:t(()=>[e(l,{"no-gutters":""},{default:t(()=>[e(s,null,{default:t(()=>[c(E(n.value),1)]),_:1})]),_:1}),e(l,{"no-gutters":""},{default:t(()=>[e(s,{cols:"auto"},{default:t(()=>[e(w,null,{default:t(()=>[e(p,{id:"home",style:{"text-transform":"none"},to:"/FlaskHome"},{default:t(()=>[L]),_:1}),e(p,{id:"settings",style:{"text-transform":"none"},to:"/FlaskSettings"},{default:t(()=>[O]),_:1})]),_:1})]),_:1})]),_:1}),r.value?(f(),R("div",U,[e(l,null,{default:t(()=>[e(s,{cols:"auto"},{default:t(()=>[e(D,{headers:b,items:i.value},null,8,["items"])]),_:1})]),_:1})])):T("",!0)]),_:1})]),_:1})]),_:1})}}};export{$ as default};
import{o as m}from"./vendor.0f2e5442.js";const d="modulepreload",i={},f="/",l=function(n,t){return!t||t.length===0?n():Promise.all(t.map(e=>{if(e=`${f}${e}`,e in i)return;i[e]=!0;const o=e.endsWith(".css"),a=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const r=document.createElement("link");if(r.rel=o?"stylesheet":d,o||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),o)return new Promise((c,u)=>{r.addEventListener("load",c),r.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>n())};m("Z1BRI8N",{name:"Age",value:!0},async()=>{const[{default:s},{default:n}]=await Promise.all([l(()=>import("./Age.a76bae4f.js"),["assets/Age.a76bae4f.js","assets/vendor.0f2e5442.js"]),l(()=>import("./client.585653c7.js"),["assets/client.585653c7.js","assets/vendor.0f2e5442.js"])]);return(t,e)=>n(t)(s,{},e)});
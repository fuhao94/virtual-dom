(()=>{"use strict";function e(e,l,t,i,o){return{sel:e,data:l,children:t,text:i,elm:o}}function l(l,t,i){if(arguments.length<3)throw new Error("fun_h: 参数数量异常");if("string"==typeof i||"number"==typeof i)return e(l,t,void 0,i,void 0);if(Array.isArray(i)){let o=[];for(let e=0;e<i.length;e++){if("object"!=typeof i[e]||!i[e].sel)throw new Error("fun_h: 第三个参数为数组时只能传递 h() 函数");o.push(i[e])}return e(l,t,o,void 0,void 0)}return"object"==typeof i&&i.sel?e(l,t,[i],void 0,void 0):void 0}function t(e,l){return e.data?.key===l.data?.key&&e.sel===l.sel}function i(e){const l=document.createElement(e.sel);if(""===e.text||e.children&&0!==e.children.length||(l.textContent=e.text),Array.isArray(e.children)&&e.children.length>0){const t=e.children;for(let e=0;e<t.length;e++){const o=i(t[e]);l.appendChild(o)}}return e.elm=l,l}function o(e){return void 0===e}function n(e,l){if(e!==l)if(l.text&&!l.children)e.text!==l.text&&(e.elm.textContent=l.text);else{if(e.children)return void function(e,l,r){let f=0,d=0,s=l.length-1,c=r.length-1,y=l[0],k=l[s],u=r[0],h=r[c],m=null;for(;d<=c&&f<=s;)if(console.log("--------- 进入diff ---------"),console.log(u.text,h.text,y.text,k.text),o(l[f]))y=l[++f];else if(o(l[s]))k=l[--s];else if(o(r[d]))u=r[++d];else if(o(r[c]))h=r[--c];else if(t(u,y))console.log("命中1"),n(y,u),u=r[++d],y=l[++f];else if(t(h,k))console.log("命中2"),n(k,h),h=r[--c],k=l[--s];else if(t(h,y))console.log("命中3"),n(y,h),e.insertBefore(y.elm,k.elm.nextSibling),h=r[--c],y=l[++f];else if(t(h,y))console.log("命中4"),n(k,u),e.insertBefore(k.elm,y.elm),u=r[++d],k=l[--s];else{if(console.log("diff四种优化策略都没命中"),!m){m={};for(let e=f;e<s;e++){const{key:t}=l[e].data;t||(m[t]=e)}}let t=m[d.data]?m[d.data.key]:void 0;if(t){console.log("移动节点");let i=l[t];n(i,u),l[t]=void 0,e.insertBefore(i.elm,y.elm)}else console.log("添加新节点"),e.insertBefore(i(u),y.elm);u=r[++d]}if(console.log({newStartIdx:d,newEndIdx:c,oldStartIdx:f,oldEndIdx:s}),d<=c){console.log("进入添加剩余节点");let l=r[c+1]||null;for(let t=d;t<=c;t++)e.insertBefore(i(r[t]),l)}else if(f<=s){console.log("进入删除多余节点");for(let t=f;t<=s;t++)l[t].elm&&e.removeChild(l[t].elm)}}(e.elm,e.children,l.children);e.elm.innerHTML="";const r=l.children;for(let l=0;l<r.length;l++){let t=i(r[l]);e.elm.appendChild(t)}}}function r(l,o){var r;if(l.sel||(l=e((r=l).tagName.toLowerCase(),void 0,void 0,void 0,r)),t(l,o))n(l,o);else{const e=i(o);if(l.elm.parentNode){const t=l.elm.parentNode;t.insertBefore(e,l.elm),t.removeChild(l.elm)}}return o.elm=l.elm,o}let f=document.querySelector("#app"),d=l("ul",{},[l("li",{key:"A"},"A"),l("li",{key:"B"},"B"),l("li",{key:"C"},"C"),l("li",{key:"D"},"D"),l("li",{key:"E"},"E")]);r(f,d);let s=[l("ul",{},[l("li",{key:"E"},"E"),l("li",{key:"D"},"D"),l("li",{key:"C"},"C"),l("li",{key:"B"},"B"),l("li",{key:"A"},"A")]),l("ul",{},[l("li",{key:"E"},"E"),l("li",{key:"D"},"D"),l("li",{key:"C"},"C"),l("li",{key:"A"},"A"),l("li",{key:"B"},"B"),l("li",{key:"K"},"K")]),l("ul",{},[l("li",{key:"A"},"A"),l("li",{key:"B"},"B"),l("li",{key:"C"},"C")]),l("ul",{},[l("li",{key:"E"},"E"),l("li",{key:"C"},"C"),l("li",{key:"V"},"V")]),l("ul",{},[l("li",{key:"A"},"A"),l("li",{key:"B"},"B"),l("li",{key:"C"},"C"),l("li",{key:"D"},"D"),l("li",{key:"E"},l("ul",{},[l("li",{key:"A"},"A"),l("li",{key:"B"},"B"),l("li",{key:"C"},"C"),l("li",{key:"D"},"D"),l("li",{key:"E"},l("div",{key:"R"},"R"))]))])],c=document.querySelectorAll(".btn");for(let e=0;e<c.length;e++)c[e].onclick=()=>{r(d,s[e])}})();
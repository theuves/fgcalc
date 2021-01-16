var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function c(e){return"function"==typeof e}function u(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function a(e,t){e.appendChild(t)}function o(e,t,n){e.insertBefore(t,n||null)}function i(e){e.parentNode.removeChild(e)}function l(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function s(e){return document.createElement(e)}function p(e){return document.createTextNode(e)}function f(){return p(" ")}function m(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function d(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function g(e){return""===e?null:+e}function v(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function h(e,t){e.value=null==t?"":t}function $(e,t){for(let n=0;n<e.options.length;n+=1){const r=e.options[n];if(r.__value===t)return void(r.selected=!0)}}function A(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}let _;function T(e){_=e}function y(){if(!_)throw new Error("Function called outside component initialization");return _}const E=[],F=[],S=[],G=[],R=Promise.resolve();let P=!1;function b(e){S.push(e)}function x(e){G.push(e)}let O=!1;const w=new Set;function k(){if(!O){O=!0;do{for(let e=0;e<E.length;e+=1){const t=E[e];T(t),U(t.$$)}for(T(null),E.length=0;F.length;)F.pop()();for(let e=0;e<S.length;e+=1){const t=S[e];w.has(t)||(w.add(t),t())}S.length=0}while(E.length);for(;G.length;)G.pop()();P=!1,O=!1,w.clear()}}function U(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(b)}}const L=new Set;function C(e,t){e&&e.i&&(L.delete(e),e.i(t))}function j(e,t,n,r){if(e&&e.o){if(L.has(e))return;L.add(e),undefined.c.push((()=>{L.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}}function M(e,t,n){const r=e.$$.props[t];void 0!==r&&(e.$$.bound[r]=n,n(e.$$.ctx[r]))}function N(e){e&&e.c()}function D(e,n,u){const{fragment:a,on_mount:o,on_destroy:i,after_update:l}=e.$$;a&&a.m(n,u),b((()=>{const n=o.map(t).filter(c);i?i.push(...n):r(n),e.$$.on_mount=[]})),l.forEach(b)}function W(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function z(e,t){-1===e.$$.dirty[0]&&(E.push(e),P||(P=!0,R.then(k)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function B(t,c,u,a,o,l,s=[-1]){const p=_;T(t);const f=c.props||{},m=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:o,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:n(),dirty:s,skip_bound:!1};let d=!1;if(m.ctx=u?u(t,f,((e,n,...r)=>{const c=r.length?r[0]:n;return m.ctx&&o(m.ctx[e],m.ctx[e]=c)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](c),d&&z(t,e)),n})):[],m.update(),d=!0,r(m.before_update),m.fragment=!!a&&a(m.ctx),c.target){if(c.hydrate){const e=function(e){return Array.from(e.childNodes)}(c.target);m.fragment&&m.fragment.l(e),e.forEach(i)}else m.fragment&&m.fragment.c();c.intro&&C(t.$$.fragment),D(t,c.target,c.anchor),k()}T(p)}class H{$destroy(){W(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}var I=[{region:"ca-central-1",description:"Canada (Central)",prices:{FARGATE:{cpu:.04456,ram:.004865},FARGATE_SPOT:{cpu:.013368,ram:.0014595}}},{region:"eu-west-1",description:"EU (Ireland)",prices:{FARGATE:{cpu:.04048,ram:.004445},FARGATE_SPOT:{cpu:.01257825,ram:.00138118}}},{region:"eu-west-2",description:"EU (London)",prices:{FARGATE:{cpu:.04656,ram:.00511},FARGATE_SPOT:{cpu:.013968,ram:.001533}}},{region:"sa-east-1",description:"South America (Sao Paulo)",prices:{FARGATE:{cpu:.0696,ram:.0076},FARGATE_SPOT:{cpu:.0212609,ram:.00232159}}},{region:"ap-northeast-2",description:"Asia Pacific (Seoul)",prices:{FARGATE:{cpu:.04656,ram:.00511},FARGATE_SPOT:{cpu:.01422902,ram:.00156165}}},{region:"af-south-1",description:"Africa (Cape Town)",prices:{FARGATE:{cpu:.0546,ram:.006},FARGATE_SPOT:{cpu:.01638,ram:.0018}}},{region:"eu-west-3",description:"EU (Paris)",prices:{FARGATE:{cpu:.0486,ram:.0053},FARGATE_SPOT:{cpu:.01458,ram:.00159}}},{region:"us-west-2",description:"US West (Oregon)",prices:{FARGATE:{cpu:.04048,ram:.004445},FARGATE_SPOT:{cpu:.01269464,ram:.00139396}}},{region:"ap-southeast-2",description:"Asia Pacific (Sydney)",prices:{FARGATE:{cpu:.04856,ram:.00532},FARGATE_SPOT:{cpu:.014568,ram:.001596}}},{region:"ap-northeast-1",description:"Asia Pacific (Tokyo)",prices:{FARGATE:{cpu:.05056,ram:.00553},FARGATE_SPOT:{cpu:.01981009,ram:.00216673}}},{region:"us-gov-east-1",description:"AWS GovCloud (US-East)",prices:{FARGATE:{cpu:.0486,ram:.0053},FARGATE_SPOT:{cpu:.01458,ram:.00159}}},{region:"us-gov-west-1",description:"AWS GovCloud (US)",prices:{FARGATE:{cpu:.0486,ram:.0053},FARGATE_SPOT:{cpu:.01458,ram:.00159}}},{region:"eu-north-1",description:"EU (Stockholm)",prices:{FARGATE:{cpu:.0445,ram:.0049},FARGATE_SPOT:{cpu:.01335,ram:.00147}}},{region:"us-west-1",description:"US West (N. California)",prices:{FARGATE:{cpu:.04656,ram:.00511},FARGATE_SPOT:{cpu:.013968,ram:.001533}}},{region:"ap-south-1",description:"Asia Pacific (Mumbai)",prices:{FARGATE:{cpu:.04256,ram:.004655},FARGATE_SPOT:{cpu:.0133282,ram:.00145777}}},{region:"us-east-2",description:"US East (Ohio)",prices:{FARGATE:{cpu:.04048,ram:.004445},FARGATE_SPOT:{cpu:.01276353,ram:.00140153}}},{region:"ap-east-1",description:"Asia Pacific (Hong Kong)",prices:{FARGATE:{cpu:.0556,ram:.0061},FARGATE_SPOT:{cpu:.01668,ram:.00183}}},{region:"eu-south-1",description:"EU (Milan)",prices:{FARGATE:{cpu:.0486,ram:.0053},FARGATE_SPOT:{cpu:.01458,ram:.00159}}},{region:"ap-southeast-1",description:"Asia Pacific (Singapore)",prices:{FARGATE:{cpu:.05056,ram:.00553},FARGATE_SPOT:{cpu:.015168,ram:.001659}}},{region:"eu-central-1",description:"EU (Frankfurt)",prices:{FARGATE:{cpu:.04656,ram:.00511},FARGATE_SPOT:{cpu:.0140458,ram:.00154154}}},{region:"us-east-1",description:"US East (N. Virginia)",prices:{FARGATE:{cpu:.04048,ram:.004445},FARGATE_SPOT:{cpu:.01264355,ram:.00138835}}},{region:"me-south-1",description:"Middle East (Bahrain)",prices:{FARGATE:{cpu:.0526,ram:.0058},FARGATE_SPOT:{cpu:.01578,ram:.00174}}}];function q(e,t){return(e=e||0).toLocaleString("en-US",{style:"currency",currency:t,minimumFractionDigits:3})}function K(e,t,n){const r=e.slice();return r[3]=t[n],r}function V(t){let n,r,c,u=t[3].description+"";return{c(){n=s("option"),r=p(u),c=f(),n.__value=t[3].name,n.value=n.__value,d(n,"class","svelte-1kyitcs")},m(e,t){o(e,n,t),a(n,r),a(n,c)},p:e,d(e){e&&i(n)}}}function J(t){let n,r,c,u=t[1],a=[];for(let e=0;e<u.length;e+=1)a[e]=V(K(t,u,e));return{c(){n=s("select");for(let e=0;e<a.length;e+=1)a[e].c();d(n,"class","svelte-1kyitcs"),void 0===t[0]&&b((()=>t[2].call(n)))},m(e,u){o(e,n,u);for(let e=0;e<a.length;e+=1)a[e].m(n,null);$(n,t[0]),r||(c=m(n,"change",t[2]),r=!0)},p(e,[t]){if(2&t){let r;for(u=e[1],r=0;r<u.length;r+=1){const c=K(e,u,r);a[r]?a[r].p(c,t):(a[r]=V(c),a[r].c(),a[r].m(n,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=u.length}3&t&&$(n,e[0])},i:e,o:e,d(e){e&&i(n),l(a,e),r=!1,c()}}}function Q(e,t,n){let{value:r}=t;const c=I.map((e=>({name:e.region,description:e.description})));return e.$$set=e=>{"value"in e&&n(0,r=e.value)},[r,c,function(){r=A(this),n(0,r),n(1,c)}]}class X extends H{constructor(e){super(),B(this,e,Q,J,u,{value:0})}}function Y(e,t,n){const r=e.slice();return r[3]=t[n],r}function Z(e){let t,n,r,c,u=e[3]+"";return{c(){t=s("option"),n=p(u),r=f(),t.__value=c=e[3],t.value=t.__value,d(t,"class","svelte-1hfxjkb")},m(e,c){o(e,t,c),a(t,n),a(t,r)},p(e,r){2&r&&u!==(u=e[3]+"")&&v(n,u),2&r&&c!==(c=e[3])&&(t.__value=c,t.value=t.__value)},d(e){e&&i(t)}}}function ee(t){let n,r,c,u=t[1],a=[];for(let e=0;e<u.length;e+=1)a[e]=Z(Y(t,u,e));return{c(){n=s("select");for(let e=0;e<a.length;e+=1)a[e].c();d(n,"class","svelte-1hfxjkb"),void 0===t[0]&&b((()=>t[2].call(n)))},m(e,u){o(e,n,u);for(let e=0;e<a.length;e+=1)a[e].m(n,null);$(n,t[0]),r||(c=m(n,"change",t[2]),r=!0)},p(e,[t]){if(2&t){let r;for(u=e[1],r=0;r<u.length;r+=1){const c=Y(e,u,r);a[r]?a[r].p(c,t):(a[r]=Z(c),a[r].c(),a[r].m(n,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=u.length}3&t&&$(n,e[0])},i:e,o:e,d(e){e&&i(n),l(a,e),r=!1,c()}}}function te(e,t,n){let{value:r="USD"}=t,{currencyList:c=["USD"]}=t;return e.$$set=e=>{"value"in e&&n(0,r=e.value),"currencyList"in e&&n(1,c=e.currencyList)},[r,c,function(){r=A(this),n(0,r),n(1,c)}]}class ne extends H{constructor(e){super(),B(this,e,te,ee,u,{value:0,currencyList:1})}}function re(e){let t,n,r,c,u,l,p,m,g,v,h;function $(t){e[3].call(null,t)}let A={currencyList:e[2]};function _(t){e[4].call(null,t)}void 0!==e[1]&&(A.value=e[1]),l=new ne({props:A}),F.push((()=>M(l,"value",$)));let T={};return void 0!==e[0]&&(T.value=e[0]),g=new X({props:T}),F.push((()=>M(g,"value",_))),{c(){t=s("header"),n=s("div"),r=s("div"),r.innerHTML='<h1 class="title svelte-levo9p">AWS Fargate Pricing Calculator</h1>',c=f(),u=s("div"),N(l.$$.fragment),m=f(),N(g.$$.fragment),d(n,"class","container svelte-levo9p"),d(t,"class","header svelte-levo9p")},m(e,i){o(e,t,i),a(t,n),a(n,r),a(n,c),a(n,u),D(l,u,null),a(u,m),D(g,u,null),h=!0},p(e,[t]){const n={};4&t&&(n.currencyList=e[2]),!p&&2&t&&(p=!0,n.value=e[1],x((()=>p=!1))),l.$set(n);const r={};!v&&1&t&&(v=!0,r.value=e[0],x((()=>v=!1))),g.$set(r)},i(e){h||(C(l.$$.fragment,e),C(g.$$.fragment,e),h=!0)},o(e){j(l.$$.fragment,e),j(g.$$.fragment,e),h=!1},d(e){e&&i(t),W(l),W(g)}}}function ce(e,t,n){let{region:r}=t,{currency:c}=t,{currencyList:u}=t;return e.$$set=e=>{"region"in e&&n(0,r=e.region),"currency"in e&&n(1,c=e.currency),"currencyList"in e&&n(2,u=e.currencyList)},[r,c,u,function(e){c=e,n(1,c)},function(e){r=e,n(0,r)}]}class ue extends H{constructor(e){super(),B(this,e,ce,re,u,{region:0,currency:1,currencyList:2})}}function ae(t){let n,c,u,l,A,_,T,y,E,F,S,G,R,P,x,O,w,k=oe("hour",t[0])+"",U=oe("day",t[0])+"",L=oe("month",t[0])+"",C=oe("year",t[0])+"";return{c(){n=s("div"),c=s("input"),u=f(),l=s("select"),A=s("option"),_=p(k),T=f(),y=s("option"),E=p(U),F=f(),S=s("option"),G=p(L),R=f(),P=s("option"),x=p(C),d(c,"class","input svelte-150p53v"),d(c,"type","number"),d(c,"min","1"),A.__value="hour",A.value=A.__value,y.__value="day",y.value=y.__value,S.__value="month",S.value=S.__value,P.__value="year",P.value=P.__value,d(l,"class","select svelte-150p53v"),void 0===t[1]&&b((()=>t[3].call(l))),d(n,"class","container svelte-150p53v")},m(e,r){o(e,n,r),a(n,c),h(c,t[0]),a(n,u),a(n,l),a(l,A),a(A,_),a(A,T),a(l,y),a(y,E),a(y,F),a(l,S),a(S,G),a(S,R),a(l,P),a(P,x),$(l,t[1]),O||(w=[m(c,"input",t[2]),m(l,"change",t[3])],O=!0)},p(e,[t]){1&t&&g(c.value)!==e[0]&&h(c,e[0]),1&t&&k!==(k=oe("hour",e[0])+"")&&v(_,k),1&t&&U!==(U=oe("day",e[0])+"")&&v(E,U),1&t&&L!==(L=oe("month",e[0])+"")&&v(G,L),1&t&&C!==(C=oe("year",e[0])+"")&&v(x,C),2&t&&$(l,e[1])},i:e,o:e,d(e){e&&i(n),O=!1,r(w)}}}function oe(e,t){return t>1?e+"s":e}function ie(e,t,n){let{value:r}=t,{type:c}=t;return e.$$set=e=>{"value"in e&&n(0,r=e.value),"type"in e&&n(1,c=e.type)},[r,c,function(){r=g(this.value),n(0,r)},function(){c=A(this),n(1,c)}]}class le extends H{constructor(e){super(),B(this,e,ie,ae,u,{value:0,type:1})}}function se(e,t,n){const r=e.slice();return r[0]=t[n],r}function pe(t){let n,r,c,u=t[0]+"";return{c(){n=s("option"),r=p(u),c=p(" vCPU\n        "),n.__value=t[0],n.value=n.__value},m(e,t){o(e,n,t),a(n,r),a(n,c)},p:e,d(e){e&&i(n)}}}function fe(t){let n,r,c,u=t[1],a=[];for(let e=0;e<u.length;e+=1)a[e]=pe(se(t,u,e));return{c(){n=s("select");for(let e=0;e<a.length;e+=1)a[e].c();d(n,"class","select svelte-10xu5v7"),void 0===t[0]&&b((()=>t[2].call(n)))},m(e,u){o(e,n,u);for(let e=0;e<a.length;e+=1)a[e].m(n,null);$(n,t[0]),r||(c=m(n,"change",t[2]),r=!0)},p(e,[t]){if(2&t){let r;for(u=e[1],r=0;r<u.length;r+=1){const c=se(e,u,r);a[r]?a[r].p(c,t):(a[r]=pe(c),a[r].c(),a[r].m(n,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=u.length}3&t&&$(n,e[0])},i:e,o:e,d(e){e&&i(n),l(a,e),r=!1,c()}}}function me(e,t,n){let{value:r}=t;const c=[.25,.5,1,2,4];return e.$$set=e=>{"value"in e&&n(0,r=e.value)},[r,c,function(){r=A(this),n(0,r),n(1,c)}]}class de extends H{constructor(e){super(),B(this,e,me,fe,u,{value:0})}}function ge(e,t,n){const r=e.slice();return r[0]=t[n],r}function ve(e){let t,n,r,c,u=e[0]+"";return{c(){t=s("option"),n=p(u),r=p(" GiB\n        "),t.__value=c=e[0],t.value=t.__value},m(e,c){o(e,t,c),a(t,n),a(t,r)},p(e,r){2&r&&u!==(u=e[0]+"")&&v(n,u),2&r&&c!==(c=e[0])&&(t.__value=c,t.value=t.__value)},d(e){e&&i(t)}}}function he(t){let n,r,c,u=t[1],a=[];for(let e=0;e<u.length;e+=1)a[e]=ve(ge(t,u,e));return{c(){n=s("select");for(let e=0;e<a.length;e+=1)a[e].c();d(n,"class","select svelte-10xu5v7"),void 0===t[0]&&b((()=>t[3].call(n)))},m(e,u){o(e,n,u);for(let e=0;e<a.length;e+=1)a[e].m(n,null);$(n,t[0]),r||(c=m(n,"change",t[3]),r=!0)},p(e,[t]){if(2&t){let r;for(u=e[1],r=0;r<u.length;r+=1){const c=ge(e,u,r);a[r]?a[r].p(c,t):(a[r]=ve(c),a[r].c(),a[r].m(n,null))}for(;r<a.length;r+=1)a[r].d(1);a.length=u.length}3&t&&$(n,e[0])},i:e,o:e,d(e){e&&i(n),l(a,e),r=!1,c()}}}function $e(e,t){return Array(t-e+1).fill(e).map(((e,t)=>e+t))}function Ae(e,t,n){let r,{cpu:c}=t,{value:u}=t;return e.$$set=e=>{"cpu"in e&&n(2,c=e.cpu),"value"in e&&n(0,u=e.value)},e.$$.update=()=>{4&e.$$.dirty&&n(1,r=function(e){const t={.25:[.5,1,2],.5:$e(1,4),1:$e(2,8),2:$e(4,16),4:$e(8,30)};return e in t?t[e]:t[Object.keys(t)[0]]}(c))},[u,r,c,function(){u=A(this),n(0,u),n(1,r),n(2,c)}]}class _e extends H{constructor(e){super(),B(this,e,Ae,he,u,{cpu:2,value:0})}}function Te(t){let n,r,c,u,l,$,A;return{c(){n=s("div"),r=s("input"),c=f(),u=s("label"),l=p(t[1]),d(r,"id","input-"+t[2]),d(r,"class","input svelte-139dzbk"),d(r,"type","number"),d(r,"min","0"),d(u,"class","label svelte-139dzbk"),d(u,"for","input-"+t[2]),d(n,"class","container svelte-139dzbk")},m(e,i){o(e,n,i),a(n,r),h(r,t[0]),a(n,c),a(n,u),a(u,l),$||(A=m(r,"input",t[3]),$=!0)},p(e,[t]){1&t&&g(r.value)!==e[0]&&h(r,e[0]),2&t&&v(l,e[1])},i:e,o:e,d(e){e&&i(n),$=!1,A()}}}function ye(e,t,n){let{name:r}=t,{value:c}=t;const u=Math.random().toString(16).substring(2);return e.$$set=e=>{"name"in e&&n(1,r=e.name),"value"in e&&n(0,c=e.value)},[c,r,u,function(){c=g(this.value),n(0,c)}]}class Ee extends H{constructor(e){super(),B(this,e,ye,Te,u,{name:1,value:0})}}function Fe(t){let n,r,c,u,l,m,g,h,$,A,_,T,y,E,F,S,G,R,P,b,x,O,w,k,U=q(t[1],t[4])+"",L=(t[1]/t[3]*100||0).toFixed(2)+"",C=q(t[2],t[4])+"",j=(t[2]/t[3]*100||0).toFixed(2)+"";return{c(){n=s("table"),r=s("tr"),c=s("th"),u=p(t[0]),l=f(),m=s("tr"),g=s("td"),g.innerHTML="<b>vCPU</b>",h=f(),$=s("td"),A=p(U),_=f(),T=s("td"),y=p(L),E=p("%"),F=f(),S=s("tr"),G=s("td"),G.innerHTML="<b>GiB</b>",R=f(),P=s("td"),b=p(C),x=f(),O=s("td"),w=p(j),k=p("%"),d(c,"colspan","3"),d(n,"class","table svelte-11j9i6t")},m(e,t){o(e,n,t),a(n,r),a(r,c),a(c,u),a(n,l),a(n,m),a(m,g),a(m,h),a(m,$),a($,A),a(m,_),a(m,T),a(T,y),a(T,E),a(n,F),a(n,S),a(S,G),a(S,R),a(S,P),a(P,b),a(S,x),a(S,O),a(O,w),a(O,k)},p(e,[t]){1&t&&v(u,e[0]),18&t&&U!==(U=q(e[1],e[4])+"")&&v(A,U),10&t&&L!==(L=(e[1]/e[3]*100||0).toFixed(2)+"")&&v(y,L),20&t&&C!==(C=q(e[2],e[4])+"")&&v(b,C),12&t&&j!==(j=(e[2]/e[3]*100||0).toFixed(2)+"")&&v(w,j)},i:e,o:e,d(e){e&&i(n)}}}function Se(e,t,n){let{name:r}=t,{cpu:c}=t,{ram:u}=t,{total:a}=t,{currency:o}=t;return e.$$set=e=>{"name"in e&&n(0,r=e.name),"cpu"in e&&n(1,c=e.cpu),"ram"in e&&n(2,u=e.ram),"total"in e&&n(3,a=e.total),"currency"in e&&n(4,o=e.currency)},[r,c,u,a,o]}class Ge extends H{constructor(e){super(),B(this,e,Se,Fe,u,{name:0,cpu:1,ram:2,total:3,currency:4})}}function Re(e){let t,n,r,c,u,l,m,g,h,$,A,_,T,y,E,S,G,R,P,b,O,w,k,U,L,z,B,H,I,K,V,J=q(e[9].total,e[1])+"";function Q(t){e[10].call(null,t)}function X(t){e[11].call(null,t)}let Y={currencyList:Object.keys(e[8])};function Z(t){e[12].call(null,t)}function ee(t){e[13].call(null,t)}void 0!==e[0]&&(Y.region=e[0]),void 0!==e[1]&&(Y.currency=e[1]),n=new ue({props:Y}),F.push((()=>M(n,"region",Q))),F.push((()=>M(n,"currency",X)));let te={};function ne(t){e[14].call(null,t)}void 0!==e[4]&&(te.value=e[4]),void 0!==e[5]&&(te.type=e[5]),g=new le({props:te}),F.push((()=>M(g,"value",Z))),F.push((()=>M(g,"type",ee)));let re={};function ce(t){e[15].call(null,t)}void 0!==e[2]&&(re.value=e[2]),_=new de({props:re}),F.push((()=>M(_,"value",ne)));let ae={cpu:e[2]};function oe(t){e[16].call(null,t)}void 0!==e[3]&&(ae.value=e[3]),E=new _e({props:ae}),F.push((()=>M(E,"value",ce)));let ie={name:"FARGATE"};function se(t){e[17].call(null,t)}void 0!==e[6]&&(ie.value=e[6]),R=new Ee({props:ie}),F.push((()=>M(R,"value",oe)));let pe={name:"FARGATE_SPOT"};return void 0!==e[7]&&(pe.value=e[7]),O=new Ee({props:pe}),F.push((()=>M(O,"value",se))),H=new Ge({props:{name:"FARGATE",currency:e[1],cpu:e[9].fargatePrice.cpu,ram:e[9].fargatePrice.ram,total:e[9].total}}),K=new Ge({props:{name:"FARGATE_SPOT",currency:e[1],cpu:e[9].fargateSpotPrice.cpu,ram:e[9].fargateSpotPrice.ram,total:e[9].total}}),{c(){t=s("div"),N(n.$$.fragment),u=f(),l=s("main"),m=s("form"),N(g.$$.fragment),A=f(),N(_.$$.fragment),y=f(),N(E.$$.fragment),G=f(),N(R.$$.fragment),b=f(),N(O.$$.fragment),k=f(),U=s("div"),L=s("h1"),z=p(J),B=f(),N(H.$$.fragment),I=f(),N(K.$$.fragment),d(m,"class","form svelte-1id4fg5"),d(L,"class","estimate-price svelte-1id4fg5"),d(U,"class","estimate svelte-1id4fg5"),d(l,"class","main svelte-1id4fg5"),d(t,"class","container")},m(e,r){o(e,t,r),D(n,t,null),a(t,u),a(t,l),a(l,m),D(g,m,null),a(m,A),D(_,m,null),a(m,y),D(E,m,null),a(m,G),D(R,m,null),a(m,b),D(O,m,null),a(l,k),a(l,U),a(U,L),a(L,z),a(U,B),D(H,U,null),a(U,I),D(K,U,null),V=!0},p(e,[t]){const u={};256&t&&(u.currencyList=Object.keys(e[8])),!r&&1&t&&(r=!0,u.region=e[0],x((()=>r=!1))),!c&&2&t&&(c=!0,u.currency=e[1],x((()=>c=!1))),n.$set(u);const a={};!h&&16&t&&(h=!0,a.value=e[4],x((()=>h=!1))),!$&&32&t&&($=!0,a.type=e[5],x((()=>$=!1))),g.$set(a);const o={};!T&&4&t&&(T=!0,o.value=e[2],x((()=>T=!1))),_.$set(o);const i={};4&t&&(i.cpu=e[2]),!S&&8&t&&(S=!0,i.value=e[3],x((()=>S=!1))),E.$set(i);const l={};!P&&64&t&&(P=!0,l.value=e[6],x((()=>P=!1))),R.$set(l);const s={};!w&&128&t&&(w=!0,s.value=e[7],x((()=>w=!1))),O.$set(s),(!V||514&t)&&J!==(J=q(e[9].total,e[1])+"")&&v(z,J);const p={};2&t&&(p.currency=e[1]),512&t&&(p.cpu=e[9].fargatePrice.cpu),512&t&&(p.ram=e[9].fargatePrice.ram),512&t&&(p.total=e[9].total),H.$set(p);const f={};2&t&&(f.currency=e[1]),512&t&&(f.cpu=e[9].fargateSpotPrice.cpu),512&t&&(f.ram=e[9].fargateSpotPrice.ram),512&t&&(f.total=e[9].total),K.$set(f)},i(e){V||(C(n.$$.fragment,e),C(g.$$.fragment,e),C(_.$$.fragment,e),C(E.$$.fragment,e),C(R.$$.fragment,e),C(O.$$.fragment,e),C(H.$$.fragment,e),C(K.$$.fragment,e),V=!0)},o(e){j(n.$$.fragment,e),j(g.$$.fragment,e),j(_.$$.fragment,e),j(E.$$.fragment,e),j(R.$$.fragment,e),j(O.$$.fragment,e),j(H.$$.fragment,e),j(K.$$.fragment,e),V=!1},d(e){e&&i(t),W(n),W(g),W(_),W(E),W(R),W(O),W(H),W(K)}}}function Pe(e,t,n){let r="us-east-1",c="USD",u=1,a=2,o=1,i="month",l=1,s=0,p={USD:"1.0"},f={total:0,fargatePrice:{total:0,cpu:0,ram:0},fargateSpotPrice:{total:0,cpu:0,ram:0}};function m(){fetch("https://api.exchangeratesapi.io/latest?base=USD").then((e=>e.json())).then((e=>e.rates)).then((e=>{console.info("[INFO] Updated exchange rates."),n(8,p=e)}))}var d;return d=()=>{m(),setInterval(m,6e4)},y().$$.on_mount.push(d),function(e){y().$$.after_update.push(e)}((()=>{if(l<0||s<0||o<0)return;const e=(t={region:r,time:{value:o,type:i},exchangeRate:p[c],cpu:u,ram:a},(e,n)=>{const{prices:r}=I.filter((e=>e.region===t.region))[0],c=Number(t.exchangeRate),u=function(e,t){switch(t){case"hour":default:return 1*e;case"day":return 24*e;case"month":return 730*e;case"year":return 8760*e}}(t.time.value,t.time.type),{cpu:a,ram:o}=r[n],i=e*a*c*t.cpu*u,l=e*o*c*t.ram*u;return{total:i+l,cpu:i,ram:l}});var t;const m=e(l,"FARGATE"),d=e(s,"FARGATE_SPOT");n(9,f={total:m.total+d.total,fargatePrice:m,fargateSpotPrice:d})})),[r,c,u,a,o,i,l,s,p,f,function(e){r=e,n(0,r)},function(e){c=e,n(1,c)},function(e){o=e,n(4,o)},function(e){i=e,n(5,i)},function(e){u=e,n(2,u)},function(e){a=e,n(3,a)},function(e){l=e,n(6,l)},function(e){s=e,n(7,s)}]}return new class extends H{constructor(e){super(),B(this,e,Pe,Re,u,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map

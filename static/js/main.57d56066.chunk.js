(this["webpackJsonpflashcard-app"]=this["webpackJsonpflashcard-app"]||[]).push([[0],{17:function(e,t,a){e.exports=a(40)},22:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),o=a.n(c),s=a(16),i=a(2);function l(e){var t=e.flashcard,a=Object(n.useState)(!1),c=Object(i.a)(a,2),o=c[0],s=c[1],l=Object(n.useState)("initial"),u=Object(i.a)(l,2),m=u[0],f=u[1],d=Object(n.useRef)(),p=Object(n.useRef)();function h(){var e=d.current.getBoundingClientRect().height,t=p.current.getBoundingClientRect().height;f(Math.max(e,t,100))}return Object(n.useEffect)(h,[t.question,t.answer,t.options]),Object(n.useEffect)((function(){return window.addEventListener("resize",h),function(){return window.removeEventListener("resize",h)}}),[]),r.a.createElement("div",{className:"flip-card"},r.a.createElement("div",{className:"card ".concat(o?"flip":""),style:{height:m},onClick:function(){return s(!o)}},r.a.createElement("div",{className:"front",ref:d},r.a.createElement("b",null,t.question),r.a.createElement("div",{className:"flashcard-options"},t.options.map((function(e){return r.a.createElement("div",{className:"flashcard-option",key:e},r.a.createElement("span",{dangerouslySetInnerHTML:{__html:e}}))})))),r.a.createElement("div",{className:"back",ref:p},r.a.createElement("span",null,t.answer))))}function u(e){var t=e.flashcards;return r.a.createElement("div",{className:"card-grid"},t.map((function(e){return r.a.createElement(l,{flashcard:e,key:e.id})})))}a(22);var m=a(5),f=a.n(m);var d=[{id:50,question:"serpentine",answer:"sinuous",options:["On a <b>serpentine</b> road, with grand arias"]},{id:51,question:"thrall",answer:"the state of being in someones power or having great power over someone",options:["while I'm was asleep I had returned without the least effort to an earlier stage in my life, now for ever outgrown; and had come under the <b>thrall</b> of one of my childish terrors, such as that old terror of my great-uncles pulling my curls, which was effectually dispelled on the day\u2014the dawn of a new era to me-on which they were finally cropped from my head.\xa0"]}],p=function(){var e=Object(n.useState)(d),t=Object(i.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)([]),l=Object(i.a)(o,2),m=l[0],p=l[1],h=Object(n.useRef)(),b=Object(n.useRef)();function E(e){var t=document.createElement("textarea");return t.innerHTML=e,t.value}return Object(n.useEffect)((function(){f.a.get("https://opentdb.com/api_category.php").then((function(e){p(e.data.trivia_categories)}))}),[]),Object(n.useEffect)((function(){}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{className:"header",onSubmit:function(e){e.preventDefault(),f.a.get("https://opentdb.com/api.php",{params:{amount:b.current.value,category:h.current.value}}).then((function(e){c(e.data.results.map((function(e,t){var a=E(e.correct_answer),n=[].concat(Object(s.a)(e.incorrect_answers.map((function(e){return E(e)}))),[a]);return{id:"".concat(t,"-").concat(Date.now()),question:E(e.question),answer:a,options:n.sort((function(){return Math.random()-.5}))}})))}))}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"category"},"Category"),r.a.createElement("select",{id:"category",ref:h},m.map((function(e){return r.a.createElement("option",{value:e.id,key:e.id},e.name)})),r.a.createElement("option",{value:50,key:50},"Adj"))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"amount"},"Number of Questions"),r.a.createElement("input",{type:"number",id:"amount",min:"1",step:"1",defaultValue:10,ref:b})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn"},"Generate"))),r.a.createElement("div",{className:"container"},r.a.createElement(u,{flashcards:a})))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.57d56066.chunk.js.map
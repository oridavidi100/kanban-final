(()=>{function t(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var a=0,s=function(){};return{s,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){l=!0,o=t},f:function(){try{i||null==r.return||r.return()}finally{if(l)throw o}}}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var n=document.getElementById("submit-add-to-do"),r=document.getElementById("submit-add-in-progress"),a=document.getElementById("submit-add-done");function s(t){var e=t.target;if(e===n||e===r||e===a){var s=e.closest("section"),o=s.querySelector("input").value,i=document.createElement("li");if(""===o)return alert("You did not enter a task");i.textContent=o,i.setAttribute("class","task"),i.setAttribute("draggable","true"),i.setAttribute("ondragstart","drag(event)"),i.setAttribute("id",Math.random());var d=s.querySelector("ul");d.insertBefore(i,d.firstChild),function(t,e){t===n&&(l.todo.unshift(e),localStorage.setItem("tasks",JSON.stringify(l))),t===r&&(l["in-progress"].unshift(e),localStorage.setItem("tasks",JSON.stringify(l))),t===a&&(l.done.unshift(e),localStorage.setItem("tasks",JSON.stringify(l)))}(e,i.textContent),s.querySelector("input").value=""}}n.addEventListener("click",s),r.addEventListener("click",s),a.addEventListener("click",s),document.getElementsByClassName("to-do-tasks")[0],document.getElementById("add-to-do-task"),document.getElementsByClassName("in-progress-tasks")[0],document.getElementById("add-in-progress-task"),document.getElementsByClassName("done-tasks")[0],document.getElementById("add-done-tasks"),JSON.parse(localStorage.getItem("tasks"))?localStorage.getItem("tasks"):localStorage.setItem("tasks",JSON.stringify({todo:[],"in-progress":[],done:[]}));var o,l=JSON.parse(localStorage.getItem("tasks"));function d(t){var e=o.textContent,n=o.closest("section");if(null!==n){if(t.altKey&&"1"===t.key){ul=document.querySelector(".to-do-tasks"),ul.insertBefore(o,ul.firstChild),l.todo.unshift(e);var r=n.id,a=l[r].indexOf(e);l[r].splice(a,1)}if(t.altKey&&"2"===t.key){ul=document.querySelector(".in-progress-tasks"),ul.insertBefore(o,ul.firstChild),l["in-progress"].unshift(e);var s=n.id,i=l[s].indexOf(e);l[s].splice(i,1)}if(t.altKey&&"3"===t.key){ul=document.querySelector(".done-tasks"),ul.insertBefore(o,ul.firstChild),l.done.unshift(e);var d=n.id,u=l[d].indexOf(e);l[d].splice(u,1)}localStorage.setItem("tasks",JSON.stringify(l))}}(function(){var e=document.querySelectorAll("ul");console.log(e);var n,r=t(e);try{for(r.s();!(n=r.n()).done;){var a=n.value;if(a.classList.contains("to-do-tasks")){var s,o=t(JSON.parse(localStorage.getItem("tasks")).todo);try{for(o.s();!(s=o.n()).done;){var i=s.value,l=document.createElement("li");l.textContent=i,l.classList.add("task"),l.setAttribute("draggable","true"),l.setAttribute("ondragstart","drag(event)"),l.setAttribute("id",Math.random()),a.append(l)}}catch(t){o.e(t)}finally{o.f()}}if(a.classList.contains("in-progress-tasks")){var d,u=t(JSON.parse(localStorage.getItem("tasks"))["in-progress"]);try{for(u.s();!(d=u.n()).done;){var c=d.value,f=document.createElement("li");f.textContent=c,f.classList.add("task"),f.setAttribute("draggable","true"),f.setAttribute("ondragstart","drag(event)"),f.setAttribute("id",Math.random()),a.append(f)}}catch(t){u.e(t)}finally{u.f()}}if(a.classList.contains("done-tasks")){var m,g=t(JSON.parse(localStorage.getItem("tasks")).done);try{for(g.s();!(m=g.n()).done;){var y=m.value,v=document.createElement("li");v.textContent=y,v.classList.add("task"),v.setAttribute("draggable","true"),v.setAttribute("ondragstart","drag(event)"),v.setAttribute("id",Math.random()),a.append(v)}}catch(t){g.e(t)}finally{g.f()}}}}catch(t){r.e(t)}finally{r.f()}})(),document.addEventListener("dblclick",(function(t){if(t.target.classList.contains("task")){var e=t.target,n=e.textContent;e.setAttribute("contenteditable",!0),e.focus(),e.addEventListener("blur",(function(){var t=e.textContent,r=e.closest("section"),a=r.querySelector("button").id,s=r.id;if(""===e.textContent){alert("you must enter value"),e.remove();var o=l[s].indexOf(n);l[s].splice(o,1)}else!function(t,e,n,r){if("submit-add-to-do"===t||"submit-add-in-progress"===t||"submit-add-done"===t){var a=l[e].indexOf(n);l[e].splice(a,1,r)}}(a,s,n,t);localStorage.setItem("tasks",JSON.stringify(l))}))}})),document.querySelectorAll(".task").forEach((function(t){t.addEventListener("mouseover",(function(t){return function(t){o=t.target,document.addEventListener("keydown",d)}(t)}))})),document.getElementById("search").addEventListener("keyup",(function(){var t=document.getElementById("search").value;t=t.toLowerCase();var e=document.getElementsByClassName("task");for(i=0;i<e.length;i++)e[i].innerHTML.toLowerCase().includes(t)?e[i].style.display="list-item":e[i].style.display="none"}))})();
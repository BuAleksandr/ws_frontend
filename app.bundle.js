!function(){"use strict";new class{constructor(e){this.url=e,this.container=document.querySelector("body"),this.usersOnline=[],this.currentUser=null,this.ws=new WebSocket(this.url),this.ws.onopen=()=>{console.log("connected")},this.ws.onmessage=e=>{const t=JSON.parse(e.data);"error"===t.type?alert("Такой никнейм занят, необходимо выбрать другой"):"users"===t.type?(this.usersOnline=t.data,this.deleteForm(),this.showChat()):"addMes"===t.type&&this.showNewMess(t.data.data)},this.ws.onclose=e=>{console.log("connection closed",e.code)},this.ws.onerror=()=>{console.log("error")},window.addEventListener("beforeunload",(()=>{this.ws.send(JSON.stringify({type:"deleteUser",user:this.currentUser}))}))}createForm(){const e=document.createElement("form");e.classList.add("widget"),e.innerHTML=' <h2>Выберите псевдоним</h2>\n        <input class="input widget-input" type="text" name="nick" required>\n        <button type="submit" class="btn">Продолжить</button>',this.container.insertAdjacentElement("afterbegin",e),e.addEventListener("submit",(t=>{t.preventDefault();const s=e.nick.value,n={type:"addUser",user:s};this.currentUser=s,this.ws.send(JSON.stringify(n))}))}deleteForm(){this.container.removeChild(this.container.firstChild)}showChat(){if(!document.querySelector(".container")){const e=document.createElement("div");e.classList.add("container"),e.innerHTML='<section class="chat-users"></section>\n            <section class="chat">\n             <div class="chat-content"></div>\n                       <form class="chat-form">\n                    <input class="input chat-form-input" type="text" aria-label="Ваше сообщение" name="message" placeholder="Напишите сообщение" required>\n                </form>\n            </section>',this.container.appendChild(e);const t=e.querySelector(".chat-form");t.addEventListener("submit",(e=>{e.preventDefault();const s=t.message.value,n=`${(new Date).toLocaleDateString()} ${(new Date).toLocaleTimeString().slice(0,-3)}`;this.ws.send(JSON.stringify({type:"addMes",data:{name:this.currentUser,message:s,time:n}})),t.message.value=""}))}this.showUsers()}showUsers(){const e=document.querySelector(".chat-users");e.innerHTML="",this.usersOnline.forEach((t=>{const s=document.createElement("div");s.classList.add("user"),s.innerHTML="";const n=document.createElement("div");n.classList.add("user-name"),n.textContent=t.name,t.name===this.currentUser&&(n.textContent="You"),s.appendChild(n),e.appendChild(s)}))}createMessage(e){const t=document.createElement("div");t.classList.add("chat-message"),t.innerHTML=` <div class="mes-top"><span class="chat-message-name"></span>\n            <span class="chat-message-time">${e.time}</span></div>\n            <div class="chat-mes-content">${e.message}</div>`;const s=t.querySelector(".chat-message-name");return e.name===this.currentUser?(s.textContent="You",t.classList.add("you-mes")):(t.classList.remove("you-mes"),s.textContent=e.name),t}showNewMess(e){const t=this.createMessage(e);this.container.querySelector(".chat-content").appendChild(t)}}("ws://localhost:9000/ws").createForm()}();
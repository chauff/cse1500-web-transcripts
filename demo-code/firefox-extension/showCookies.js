let cookieWindow = document.createElement("div");
cookieWindow.style.position = "absolute";
cookieWindow.style.overflow = "auto";
cookieWindow.style.display = "block";
cookieWindow.style.top = "0px";
cookieWindow.style.left = "0px";
cookieWindow.style.width = "400px";
cookieWindow.style.opacity = "0.8";
cookieWindow.style.color = "navy";
cookieWindow.style.zIndex = "99999";
cookieWindow.style.backgroundColor = "gold";
cookieWindow.style.padding = "10px";
cookieWindow.style.wordWrap = "break-word";

let cookiesArray = document.cookie.split('; ');

let header = document.createElement("h2");
header.textContent = cookiesArray.length + " cookie";
if(cookiesArray.length>1){
    header.textContent += "s";
}
cookieWindow.appendChild(header);

for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].split("=");
    let para = document.createElement("p");
    para.style.padding = "5px";
    para.style.fontSize = "110%";
    if (i % 2 == 0) {
        para.style.backgroundColor = "seashell";
    }
    else {
        para.style.backgroundColor = "mistyrose";
    }
    para.textContent = cookie[0] + " \u21d2 " + cookie[1];
    cookieWindow.appendChild(para);
}

document.body.appendChild(cookieWindow);
let cookieWindow = document.createElement("div");
cookieWindow.style.position = "absolute";
cookieWindow.style.top = "0px";
cookieWindow.style.left = "0px";
cookieWindow.style.width = "400px";
cookieWindow.style.height = "100%";
cookieWindow.style.opacity = "0.8";
cookieWindow.style.color = "navy";
cookieWindow.style.zIndex = "999";
cookieWindow.style.backgroundColor = "gold";
cookieWindow.style.padding = "10px";
cookieWindow.style.wordWrap = "break-word";

let cookiesArray = document.cookie.split('; ');

let header = document.createElement("h2");
header.textContent = cookiesArray.length + " cookies";
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
    para.textContent = cookie[0] + " => " + cookie[1];
    cookieWindow.appendChild(para);
}

document.body.appendChild(cookieWindow);
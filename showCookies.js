//minimal styling of the cookie container
let cookieWindow = document.createElement("div");
cookieWindow.style.position = "absolute";
cookieWindow.style.display = "block";
cookieWindow.style.overflow = "auto";
cookieWindow.style.fontSize = "16px";
cookieWindow.style.top = "0px";
cookieWindow.style.left = "0px";
cookieWindow.style.width = "400px";
cookieWindow.style.maxHeight = "800px";
cookieWindow.style.opacity = "0.8";
cookieWindow.style.color = "navy";
cookieWindow.style.zIndex = "99999";
cookieWindow.style.backgroundColor = "gold";
cookieWindow.style.padding = "10px";
cookieWindow.style.margin = "10px";
cookieWindow.style.wordWrap = "break-word";

//cookies can be accessed via document.cookie; all cookies are returned,
//delimited from each other by a semicolon
let cookiesArray = document.cookie.split('; ');

//inform the viewer about the number of accessible cookies
let header = document.createElement("h2");
header.style.fontSize = "150%";
header.style.marginBottom = "10px";
header.textContent = cookiesArray.length + " JS accessible cookie";
if(cookiesArray.length>1){
    header.textContent += "s";
}
cookieWindow.appendChild(header);

//incorporate a "close" button for when the information becomes annoying
let close = document.createElement("button");
close.textContent = "Close";
close.style.position = "absolute";
close.style.top = "10px";
close.style.right = "10px";
close.style.border = "1px solid black";
close.style.backgroundColor = "white";
close.style.color = "navy";
close.style.padding = "5px";
cookieWindow.appendChild(close);
close.addEventListener("click", function(e){
    cookieWindow.style.display = "none";
})

//add each cookie name/value pair to our container;
//truncate the value if necessary
for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].split("=");
    let div = document.createElement("div");
    div.style.padding = "5px";
    div.style.fontSize = "110%";
    if (i % 2 == 0) {
        div.style.backgroundColor = "seashell";
    }
    else {
        div.style.backgroundColor = "mistyrose";
    }
    let partialValue = cookie[1].substr(0,15);
    if(partialValue.length < cookie[1].length)
        partialValue += '...';
    div.textContent = cookie[0] + " \u21d2 " + partialValue;
    cookieWindow.appendChild(div);
}

document.body.appendChild(cookieWindow);
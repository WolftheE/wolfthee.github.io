const iframe = document.getElementById('iframe');
const popupui = document.getElementById('popup');

const capchapopup = document.getElementById('capchapopup');
const capchaiframe = document.getElementById('capchaPage');

const capchapages = ["https://embed.neal.fun/not-a-robot/embed/10","https://embed.neal.fun/not-a-robot/embed/12","https://embed.neal.fun/not-a-robot/embed/18","https://embed.neal.fun/not-a-robot/embed/16","https://embed.neal.fun/not-a-robot/embed/31","https://embed.neal.fun/not-a-robot/embed/2"]

function popupShown(url) {
    iframe.src = url;
    popupui.classList.add('popupvisable');
}

function popuphide() {
    popupui.classList.remove('popupvisable');
}

function showcapcha() {
    let randomnum = Math.floor(Math.random() * 6)
    capchapopup.classList.add('popupvisable');
    capchaiframe.src = "pages/capcha.html" //capchapages[randomnum]
}

function hidecapcha() {
    capchapopup.classList.remove('popupvisable');
}





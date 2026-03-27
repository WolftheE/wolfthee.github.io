var wikipagefile = ''

function openwikipopup(wikifile) {
    document.getElementById('iframewiki').src = wikifile
    wikipagefile = wikifile

    document.getElementById('wikiparrent').style.display = 'block';
}

function closewikipopup() {

    document.getElementById('wikiparrent').style.display = 'none';
}

function openinnewtab() {
    window.open(wikipagefile, '_blank').focus();
}

function fullscreen() {
    document.getElementById('iframewiki').requestFullscreen()
}
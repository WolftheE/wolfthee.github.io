function showmodal(newText) {
    document.getElementById('modaltext').innerText = newText;
    document.getElementById('modal').showModal();
    document.getElementById('modal').classList.add('animated')
}

function closemodal() {
  document.getElementById('modal').close()
  document.getElementById('modal').classList.remove('animated')
}
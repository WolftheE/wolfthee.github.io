function showmodal(newText) {
    document.getElementById('modaltext').innerText = newText;
    document.getElementById('modal').showModal();
    document.getElementById('modal').classList.add('animated')
}

function closemodal() {
  document.getElementById('modal').close()
  document.getElementById('modal').classList.remove('animated')
}

function bug() {
  document.getElementById('modal').showModal();
  document.getElementById('modaltext').innerText = 'Why did you click on me? Well too late to change now, I WILL infect everything!';
  document.getElementById('blob').classList.add('blob_bug')
  document.getElementById('pfp').src = "images/null.png";
}
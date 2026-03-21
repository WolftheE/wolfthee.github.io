function showmodal() {
    document.getElementById('modal').showModal();
    document.getElementById('modal').classList.add('animated')
}

function closemodal() {
  document.getElementById('modal').close()
  document.getElementById('modal').classList.remove('animated')
}

function showabout() {
    document.getElementById('about').showModal();
    document.getElementById('about').classList.add('animated')
}

function closeabout() {
  document.getElementById('about').close()
  document.getElementById('about').classList.remove('animated')
}

function showpayment() {
    document.getElementById('payment').showModal();
    document.getElementById('payment').classList.add('animated')
}

function closepayment() {
    document.getElementById('payment').close();
    document.getElementById('payment').classList.remove('animated')
}

function closeadblocker() {
      document.getElementById('adblocker').close();
    document.getElementById('adblocker').classList.remove('animated')
}

function closebutton(numbers) {
    document.getElementById(numbers).style.display = "none";

    const randomInteger = Math.floor(Math.random() * (50 - 20 + 1)) + 1;
    let randomIntegerTime = randomInteger * 1000;

    setTimeout(() => {
        document.getElementById(numbers).style.display = "unset";
    }, randomIntegerTime);

}



function checkAdBlock() {
  setTimeout(function() {
  fetch('https://www3.doubleclick.net', {
  method: "HEAD",
  mode: "no-cors",
  cache: "no-store",
  }).catch(()=>{
    document.getElementById('adblocker').showModal();
    document.getElementsByClassName('ad').style.display = "none";
  });
  }, 1000);
  }
window.onload = checkAdBlock;
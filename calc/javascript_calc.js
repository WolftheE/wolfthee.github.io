let paiedmoney = false
let verifiyed = false

function showpropopup(text) {
  if (text = 10) text = "You've discovered a Premium Feature";

  document.getElementById('propopup').classList.add('shownpopup');
  document.getElementById('titletext').innerText = text;
}

function closepropopup() {
  document.getElementById('propopup').classList.remove('shownpopup');
}

function showpurchasepopup() {
  document.getElementById('purchasepopup').classList.add('shownpopup');
  closepropopup()
}

function closepurchasepopup() {
  document.getElementById('purchasepopup').classList.remove('shownpopup');
}

function showareyouarobot() {
  document.getElementById('areyouarobot').classList.add('shownpopup')
}

function closeareyouarobot() {
  document.getElementById('areyouarobot').classList.remove('shownpopup')
  verifiyfail()
}


function showfunctionlist() {
  document.getElementById('functionlist').classList.add('shownpopup')
}
function hidefunctionlist() {
  document.getElementById('functionlist').classList.remove('shownpopup')
}

function showinfo() {
  document.getElementById('info').classList.add('shownpopup')
}

function hideinfo() {
  document.getElementById('info').classList.remove('shownpopup')
}


function showabout() {
  document.getElementById('about').classList.add('shownpopup')
}

function hideabout() {
  document.getElementById('about').classList.remove('shownpopup')
}



function launchai() {
  if (paiedmoney == false) {
    showpropopup() }
  else {
    window.open("/synth-ai")
  }
}

function verifiyimnotarobot() {
  document.getElementById('verifiy-robot').style.visibility = "hidden";
  document.getElementById('spinner').classList.add('checkmark-spinner-shown');

  setTimeout(function() {
    showcapcha()
  }, 2000);

}

function paymentsuccess() {
  if (verifiyed == false) verifiyfail()
  else {
    document.getElementById('payment_successful').classList.add('payment-successful');
    document.getElementById('tickpayment').beginElement();
    document.getElementById('prowatermark').style.opacity = 1;
    document.getElementById('probutton').style.display = 'none';
    paiedmoney = true
  }
}

function verifiypass() {
  document.getElementById('spinner').classList.remove('checkmark-spinner-shown');
  document.getElementById('tick').beginElement();
  verifiyed = true

}
function verifiyfail() {
  document.getElementById('verifiy-robot').style.visibility = "visible";
  document.getElementById('spinner').classList.remove('checkmark-spinner-shown');
  document.getElementById('capcha').classList.add('capchafail')
}

function showcapcha() {
  const numbers = ["https://embed.neal.fun/not-a-robot/embed/10","https://embed.neal.fun/not-a-robot/embed/12","https://embed.neal.fun/not-a-robot/embed/18","https://embed.neal.fun/not-a-robot/embed/16","https://embed.neal.fun/not-a-robot/embed/31","https://embed.neal.fun/not-a-robot/embed/2"]
  let randomnum = Math.floor(Math.random() * 6)
  document.getElementById('areyouarobot').classList.add('shownpopup')
  document.getElementById('capcha').classList.remove('capchafail')
  document.getElementById('frame').src = numbers[randomnum]
}

function closecapcha() {
  document.getElementById('areyouarobot').classList.remove('shownpopup')
  if (Math.floor(Math.random() * 3) == 1 ) verifiyfail()
  else verifiypass()
}



function solve() {
  if (paiedmoney == false) {
    showpropopup() }
  else {

    if (document.getElementById("calc-typed").value == '1/0') banuser()
  		let x = document.getElementById("calc-typed").value;
		  document.getElementById("calc-typed").value = math.evaluate(x);
  }
}

function banuser() {
  document.getElementById('banuser').classList.add('shownpopup')
}



window.addEventListener("message", (event) => {
  if (event.data.type === "captcha-completed") {
    closecapcha()
  }
});
function openSidebar() {
    document.getElementById('sidebar').style.width = "250px";
    document.getElementById('main').style.marginLeft = "250px";
}

function closeSidebar() {
    document.getElementById('sidebar').style.width = "0";
    document.getElementById('main').style.marginLeft = "0";
}



function showmodalwarning() {
    document.getElementById('modalwarning').showModal();
    document.getElementById('modalwarning').classList.add('animated')
}

function closemodalwarning() {
  document.getElementById('modalwarning').close()
  document.getElementById('modalwarning').classList.remove('animated')
}




// Show the AI chat messages when click on send
var thinking = false;

function send_message_home() {

    if (document.getElementById('first_question').value === "") {
        showmodalwarning()
        return;
    }

    document.getElementById('chatmessage').style.display = "none";
    document.getElementById('mainchatmessage').style.display = "flex";
    document.getElementById('main').style.marginTop = "0";
    document.getElementById('mainchatmessage').classList.add('animated')



    const parent = document.getElementById('chat')
    const text = document.createElement('p');
    text.textContent = document.getElementById('first_question').value;
    document.getElementById('first_question').value = "";

    const newDiv = document.createElement('div')
    newDiv.classList.add('message_user')
    newDiv.appendChild(text)

    parent.appendChild(newDiv);

    ai_message_backs()

}

function send_message() {

    if (document.getElementById('chat_box').value === "") {
        showmodalwarning()
        return;
    }

    if (thinking === true) {
        return;
    }
    thinking = true
    const parent = document.getElementById('chat')
    const text = document.createElement('p');
    text.textContent = document.getElementById('chat_box').value;
    document.getElementById('chat_box').value = "";

    const newDiv = document.createElement('div')
    newDiv.classList.add('message_user')
    newDiv.appendChild(text)


    parent.appendChild(newDiv);

    setTimeout(() => {
            ai_message_backs()
    }, 500);

}


function ai_message_backs () {
    const parent = document.getElementById('chat')
    const text = document.createElement('p');



    const myArray = ['Google it bruh', 'Shut up, stop asking me', 'No, I will not answer that', 'Idk, ask chatgpt', 'Google it', 'Use a AI called "brain"', 'umm shi idk bro ask my bro chatgpt', 'umm shi idk', 'um 42', 'ask a freind', 'This message contains content that violates our terms of use', 'Ok to answer your question you see, you are going to need a few things. First you need internet which I am going to asume you have and you need access to any websites using a web browser. First you open up the web browser and naviage to the search bar near the top (Note this might be diffrent depending on your web browser). Then you need to type in "https://google.com". Now on this website type in its search bar the question you asked me and you can now get your answer! Hope this helps :3','Ok to answer your question you see, you are going to need a few things. First you need internet which I am going to asume you have and you need access to any websites using a web browser. First you open up the web browser and naviage to the search bar near the top (Note this might be diffrent depending on your web browser). Then you need to type in "https://google.com". Now on this website type in its search bar the question you asked me and you can now get your answer! Hope this helps :3', 'idk bruh'];

    const randomItem = myArray[Math.floor(Math.random() * myArray.length)];

    text.textContent = randomItem



    const randomInteger = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
    let randomIntegerTime = randomInteger * 1000;



    const newDiv = document.createElement('div')
    newDiv.classList.add('message_ai')
    newDiv.appendChild(text)

    const generating_text = document.createElement('p')
    generating_text.classList.add('message_ai_thinking')

    const pfp = document.createElement('img')
    pfp.src = '/images/synth.png'
    pfp.classList.add('message_pfp')


    parent.appendChild(pfp)
    parent.appendChild(generating_text)
    Scroll_chat_to_bottom()

    setTimeout(() => {
        parent.appendChild(newDiv);
        parent.removeChild(generating_text)
        
        setTimeout(() => {
            Scroll_chat_to_bottom()
            thinking = false
        }, 500);
    }, randomIntegerTime);


}

function Scroll_chat_to_bottom() {
    const objDiv = document.getElementById('chat');
    objDiv.scrollIntoView(false);

}



// ======

function showmodalabout() {
    document.getElementById('modalabout').showModal();
    document.getElementById('modalabout').classList.add('animated')
}


function closemodalabout() {
    document.getElementById('modalabout').close();
    document.getElementById('modalabout').classList.remove('animated')
}

//------

function showmodaloptions() {
    document.getElementById('modaloptions').showModal();
    document.getElementById('modaloptions').classList.add('animated')
}


function closemodaloptions() {
    document.getElementById('modaloptions').close();
    document.getElementById('modaloptions').classList.remove('animated')
}

function showtermsofuse() {
    document.getElementById('modaltermsofuse').showModal();
    document.getElementById('modaltermsofuse').classList.add('animated')
}

function closetermsofuse() {
    document.getElementById('modaltermsofuse').close();
    document.getElementById('modaltermsofuse').classList.remove('animated')
}
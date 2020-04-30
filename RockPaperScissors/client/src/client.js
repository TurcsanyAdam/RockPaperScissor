src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";

const writeEvent = (text) => {
    // <ul> element
    const parent = document.querySelector('#events');

    // <li> element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};


const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
    
};

const addButtonListeners = () => {
    ['rock', 'paper', 'scissors'].forEach((id) => {
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            sock.emit('turn', id);
            button.value = 'true';
            ButtonValue(id);
        });

        
    });
};

function ButtonValue(id){
    
    const button = document.getElementById(id);
    if (button.value == "true") {
        $('button[id^="rock"]').prop('disabled', true);
        $('button[id^="paper"]').prop('disabled', true);
        $('button[id^="scissors"]').prop('disabled', true);
    }
    
};



writeEvent('Welcome to RPS');

const sock = io();
sock.on('message', writeEvent);

document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

addButtonListeners();
RemoveDisable();


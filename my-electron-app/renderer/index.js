const electron = require('electron');
const ipc = electron.ipcRenderer;

const messageIn = document.getElementById('message');
//call main thread message
messageIn.addEventListener('click', function () {
    ipc.send('open-message');
})
//Send message from render to main
ipc.send('Msg', 'Message from render to main');

ipc.on('open-message', function (event, arg) {
    console.log(arg);
});
//HTMl button variables
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];
let button = document.getElementById('myBtn');

button.addEventListener('click', () => {
    modal.style.display = "block";
});

span.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


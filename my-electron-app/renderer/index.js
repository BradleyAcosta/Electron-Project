const electron = require('electron');
const ipc = electron.ipcRenderer;


const messageIn = document.getElementById('message');

messageIn.addEventListener('click', function () {
    ipc.send('open-message');
})
ipc.on('open-message', function (event, arg) {
    console.log(arg);
})


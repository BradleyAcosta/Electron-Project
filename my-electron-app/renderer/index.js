const electron = require('electron')
const ipc = electron.ipcMain

const messageIn = document.getElementById('message');

messageIn.addEventListener('click', function (channel, listener){
    ipc.handle('open-message', listener);
})
ipc.on('open-message', function (event, arg) {
    console.log(arg);
})

const {ipcMain} = require('electron')
const messageIn = document.getElementById('message');

messageIn.addEventListener('click', function (channel, listener) {
    ipcMain.on('open-message', listener);
})
ipcMain.on('open-message', function (event, arg) {
    console.log(arg);
})

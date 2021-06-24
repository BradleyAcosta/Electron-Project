const electron = require('electron');
const ipc = electron.ipcMain;
const dialog = electron.dialog;



ipc.on('open-message', function (event) {
    dialog.showMessageBox('Message', 'Render sender')
    event.sender.send('open-message', 'Bradley Electron app');
});


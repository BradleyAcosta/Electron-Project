const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const ipc = electron.ipcRenderer;

const renderPath = path.join(app.getAppPath(), 'renderer');


//function that loads index.html into a new BrowserWindow instance
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });


    const promise = win.loadFile(path.join(renderPath, 'index.html'));
    process.on('unhandledRejection', err => {
        console.log(`ERROR: ${err.message}`);
        console.log('Shutting down the server duo to Unhandled Promise rejection');
        server.close(() => {
            process.exit(1)
        });

        if (process.env.NODE_ENV === 'development') {
            promise.then(() => {
                win.webContents.openDevTools();
            });
        }
        ;
    });
};

// call this createWindow() function to open your window.
app.whenReady().then(() => {
    createWindow();
//Do this by attaching your event listener from within your existing whenReady() callback.
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});
//Listen for app to be ready
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

const messageIn = document.getElementById('message');

messageIn.addEventListener('click', function () {
    ipc.send('open-message');
})
const messageIn = document.getElementById('message');

messageIn.addEventListener('click', function () {
    ipc.send('open-message');
})
ipc.on('open-message', function (event, arg) {
    console.log(arg);
})
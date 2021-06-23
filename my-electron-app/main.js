const {app, ipcRenderer, BrowserWindow} = require('electron')
const path = require('path');
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

    });
    if (process.env.NODE_ENV === 'development') {
        promise.then(() => {
            win.webContents.openDevTools();
        });
    }


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
}

ipcRenderer.on('open-message', function (event) {
    event.sender.send('Here is the message', 'Bradley Electron app');
})


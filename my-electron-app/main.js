const electron = require('electron');
const {BrowserWindow, ipcMain, app} = require('electron');
const path = require('path');
const renderPath = path.join(app.getAppPath(), 'renderer');
const dialog = electron.dialog;

//function that loads index.html into a new BrowserWindow instance
function createWindow() {
    const win = new BrowserWindow({
        backgroundColor: 'aquamarine',
        width: 700,
        height: 600,
        titleBarStyle: "hidden",
        frame: false,
        show: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    win.webContents.once('did-finish-load', () => {
        win.webContents.send('user-config-loaded');
        win.show();
    });

    // Allow the app to fail gracefully and provide some debug info.
    // profileSelectorWindow.webContents.once('did-fail-load', (e, code, desc) => {
    win.webContents.once('did-fail-load', (evt, code, desc, url) => {
        console.error(desc);
        console.error(url);
        dialog.showErrorBox('Window failed to load!', desc);
        app.quit();
    });

    let promise = win.loadFile(path.join(renderPath, 'index.html'));
    promise.then(() => {
        console.log("ProfileSelectorWindow loaded!");

        if (process.env.NODE_ENV === 'development') {
            promise.then(() => {
                win.webContents.openDevTools();
            });
            return win;
        };
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

ipcMain.on('open-message', function (event) {
    event.sender.send('open-message', 'From main to renderer');
});
//call rendered thread
ipcMain.on('Msg', (event, data) => {
    console.log(data)
});
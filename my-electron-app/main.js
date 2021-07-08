const electron = require('electron');
const axios = require('axios').default;
const express = require('express');
const {BrowserWindow, ipcMain, app} = require('electron');
const path = require('path');
const renderPath = path.join(app.getAppPath(), 'renderer');
const dialog = electron.dialog;
const PORT = 3000;

//function that loads index.html into a new BrowserWindow instance
function createWindow() {
    const win = new BrowserWindow({
        width: 700,
        height: 600,
        resizable: true,
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
        console.log("App is running correclty!");
        if (process.env.NODE_ENV === 'development') {
            promise.then(() => {
                win.webContents.openDevTools();
            });
        };
    });

}

// call this createWindow() function to open your window.
app.whenReady().then(() => {
    createWindow();
//Do this by attaching your event listener from within your existing whenReady() callback.
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
//Listen for app to be ready
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('open-message', async (event) => {
    console.log('From Renderer to Main');
    event.sender.send('open-message');
    axios.post
    (`http://localhost:${PORT}/message`, {
        name: 'Bradley'
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error(error);
    });
});

app.getAppPath(`http://localhost:${PORT}/message`, (req, res) => {
    console.log(res);
})
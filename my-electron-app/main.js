const electron = require('electron');
const url = require('url');
const path = require('path');
//Function that loads index.html into a new BrowserWindow instance
const {app, BrowserWindow} = electron;

let mainWindow;

//Listen for app to be ready
app.on('ready', function () {
    mainWindow = new BrowserWindow({});
//This code is passing this path file://dirname/index.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
});


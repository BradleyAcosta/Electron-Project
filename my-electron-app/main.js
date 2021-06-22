const {app, BrowserWindow} = require('electron')
//const path = require('path');


//function that loads index.html into a new BrowserWindow instance
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.loadFile('index.html')
}

// call this createWindow() function to open your window.
app.whenReady().then(() => {
    createWindow()
//Do this by attaching your event listener from within your existing whenReady() callback.
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
//Listen for app to be ready
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
//

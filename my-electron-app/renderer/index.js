const electron = require('electron');
const express = require('express');
const axios = require('axios').default;
const PORT = 3000;
const ipc = electron.ipcRenderer;

const messageIn = document.getElementById('message');
//call main thread message
messageIn.addEventListener('click', function () {
    console.log('From render to main.')
    const data = {name: 'Bradley', source: 'electron render'};
    console.log(data);
    ipc.send('open-message', data);

});

ipc.on('open-message', (event, args) => {
    console.log('Main : Received from Main to renderer');
    console.log(args);
});

ipc.on('open-message', (event, message) => {
    document.getElementById("myHeader").innerHTML = message.source;
});

//HTMl button variables
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];
let button = document.getElementById('myBtn');

button.addEventListener('click', () => {
    modal.style.display = "block";
});

span.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});



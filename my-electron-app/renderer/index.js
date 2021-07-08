const electron = require('electron');
const express = require('express');
const ipc = electron.ipcRenderer;

const messageIn = document.getElementById('message');
//call main thread message
messageIn.addEventListener('click', function () {
    ipc.send('open-message');
});

ipc.on('open-message', (event) => {
    console.log('Main : Received from Main to renderer');
});


//document.getElementById("myHeader").innerHTML = ;


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



const socket = io();

// Swal.fire({
//     title: 'saludos',
//     text: 'mensaje inicial',
//     icon: 'success'
// });

let user;
const chatbox = document.getElementById('chatBox');

Swal.fire({
    title: 'Identifiquese',
    input: 'text',
    text: 'Igresa tu nombre de usuario para ingresar al chat',
    inputValidator: (value) =>{
        return !value && 'Nesecitas un nombre de usuario para ingresar al chat'
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
}).then(result =>{
    user = result.value;
    socket.emit('authenticated', user)
});

chatbox.addEventListener('keyup', evt=>{
    if(evt.key === 'Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message', {user, message: chatbox.value});
            chatbox.value = '';
        }
    }
});

socket.on('messageLogs', data=>{
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message =>{
        messages += `<p>${message.user} dice: ${message.message}</p> <br/>`;
    });
    log.innerHTML = messages;
});

socket.on('newUserConnected', data=>{
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer:3000,
        title: 'Nuevo usuario conectado',
        text: `El usuario ${data.user} se ha conectado`,
        icon: 'success'
    });
});
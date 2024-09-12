let correctNumber = Math.ceil(Math.random()*100)
console.log(correctNumber);
let intentos = 1;
let maxIntentos;
let juego = document.getElementById('game');
let resultados = [];

const difBtns = document.querySelectorAll('.difBtn');

difBtns.forEach(function(difBtn) {
    difBtn.addEventListener('click', function() {
        // Establecer el valor máximo de intentos
        maxIntentos = parseInt(difBtn.value);
        
        // Mostrar el juego
        juego.classList.remove('hidden');
        
        // Primero eliminar la clase `bg-blue-500` de todos los botones
        difBtns.forEach(function(btn) {
            btn.classList.remove('bg-blue-500');
        });
        
        // Luego, agregar la clase `bg-blue-500` solo al botón clicado
        difBtn.classList.add('bg-blue-500');
    });
});

document.getElementById('guessBtn').addEventListener('click', function () {
    let userNumber = document.getElementById('userNumber').value
    
    function final(){
        document.getElementById('guessBtn').setAttribute('disabled', true)
        document.getElementById('guessBtn').classList.remove('hover:bg-blue-500')
        document.getElementById('guessBtn').classList.add('cursor-none')
        document.getElementById('restardBtn').classList.remove('hidden');
    }

    function mensaje(mensaje, color) { 
        let message = document.createElement('P');
        let messageDiv = document.getElementById('mensajes');    
        messageDiv.innerHTML = '';   
        message.textContent = mensaje
        message.classList.add(color);
        messageDiv.appendChild(message)

        if(mensaje === 'felicidades'){
            return;
        }
        setTimeout(() => {
            message.classList.add('hidden')
        }, 3000);
        
    }

    if (userNumber === '') {
        mensaje('debes elegir un numero', 'text-red-500')
        return;
    }
    parseInt(userNumber);
    if (userNumber > 100 || userNumber < 1) {
        mensaje('debes elegir un numero entre 1 y 100', 'text-red-500')
    }
    else if (userNumber == correctNumber) {
       mensaje('felicidades', 'text-green-500');
       final();
    }else if(intentos === maxIntentos){
        mensaje('intentos finalizados', 'text-red-500')
        final();

    } else if (userNumber > correctNumber) {
       mensaje('lo siento, ese no es, el numero es menor', 'text-red-500');
       intentos++
    } else if (userNumber < correctNumber) {
       mensaje('lo siento, ese no es, el numero es mayor', 'text-red-500');
       intentos++
    }

})

document.getElementById('restardBtn').addEventListener('click', function(){
    document.getElementById('guessBtn').removeAttribute('disabled')
    document.getElementById('guessBtn').classList.add('hover:bg-blue-500')
    document.getElementById('guessBtn').classList.remove('cursor-none')
    document.getElementById('restardBtn').classList.add('hidden');
    intentos = 0;
    correctNumber = Math.ceil(Math.random()*100)
    console.log(correctNumber);
    document.querySelector('div > p').classList.add('hidden')
})

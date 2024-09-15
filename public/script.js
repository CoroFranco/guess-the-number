

let correctNumber;
console.log(correctNumber);
let intentos = 1;
let maxIntentos;
let juego = document.getElementById('game');


const difBtns = document.querySelectorAll('.difBtn');

const sections=document.querySelectorAll('.section');
const score = document.querySelector('.score')
const game = document.querySelector('.game')

sections.forEach(function(section) {
    section.addEventListener('click', function() {
        // Remover la clase de 'seleccionado' de todas las secciones
        sections.forEach(function(sec) {
            sec.classList.remove('text-amber-500');
        });

        // Mostrar el contenido adecuado basado en la sección seleccionada
        if (section.textContent === 'Score') {
            score.classList.remove('hidden');
            game.classList.add('hidden');
        } else {
            game.classList.remove('hidden');
            score.classList.add('hidden');
        }

        // Aplicar la clase a la sección seleccionada
        section.classList.add('text-amber-500');
    });
});

function guardarResultado(dificultad, intentos) {
    // Obtener resultados existentes
    let resultados = JSON.parse(localStorage.getItem('resultados')) || [];

    // Agregar el nuevo resultado
    resultados.push({ dificultad, intentos });

    // Guardar los resultados actualizados en localStorage
    localStorage.setItem('resultados', JSON.stringify(resultados));
}

difBtns.forEach(function (difBtn) {
    difBtn.addEventListener('click', function () {
        correctNumber = Math.ceil(Math.random() * 100);
        console.log(correctNumber);

        // Establecer el valor máximo de intentos
        maxIntentos = parseInt(difBtn.value);

        // Mostrar el juego
        juego.classList.remove('hidden');

        // Primero eliminar la clase `bg-blue-500` de todos los botones
        difBtns.forEach(function (btn) {
            btn.classList.remove('bg-blue-500');
        });

        // Luego, agregar la clase `bg-blue-500` solo al botón clicado
        difBtn.classList.add('bg-blue-500');
        dificultad = difBtn.textContent;

    });
});

function renderScores () {
    // Obtener los resultados guardados desde localStorage
    let resultados = JSON.parse(localStorage.getItem('resultados')) || [];

    // Obtener el contenedor de la lista
    const resultUl = document.getElementById('resultados');
    resultUl.innerHTML = '';

    // Recorrer los resultados y mostrarlos
    let i = 1;
    resultados.forEach(result => {
        // Crear un nuevo elemento <li>


        const resultados = document.createElement('li');

        resultados.classList.add('font-bold', 'text-amber-500', 'border-b-[1px]' , 'border-gray-100', 'mb-5' )

        resultados.textContent = `${i}. Dificultad: ${result.dificultad}, Intentos: ${result.intentos}`;
        resultUl.appendChild(resultados)


        i++
    });
};
setInterval(renderScores, 1000);

document.getElementById('guessBtn').addEventListener('click', function () {
    let userNumber = document.getElementById('userNumber').value

    function final() {
        document.getElementById('guessBtn').setAttribute('disabled', true)
        document.getElementById('guessBtn').classList.remove('hover:bg-blue-500')
        document.getElementById('guessBtn').classList.add('cursor-none')
        document.getElementById('restardBtn').classList.remove('hidden');


        const result = {
            dificultad: dificultad,
            intentos: intentos
        };

        guardarResultado(dificultad, intentos);

        fetch('http://localhost:3000/saveResult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        })
            .then(response => response.json())
            .then(data => {
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function mensaje(mensaje, color) {
        let message = document.createElement('P');
        let messageDiv = document.getElementById('mensajes');
        messageDiv.innerHTML = '';
        message.textContent = mensaje
        message.classList.add(color);
        messageDiv.appendChild(message)

        if (mensaje === 'felicidades') {
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
        //    resultado = {   aqui quiero guardar el resultado en el json.
        //     'dificultad': dificultad,
        //     'intentos': intentos
        //    }
        final();
    } else if (intentos === maxIntentos) {
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

document.getElementById('restardBtn').addEventListener('click', function () {
    document.getElementById('guessBtn').removeAttribute('disabled')
    document.getElementById('guessBtn').classList.add('hover:bg-blue-500')
    document.getElementById('guessBtn').classList.remove('cursor-none')
    document.getElementById('restardBtn').classList.add('hidden');
    intentos = 0;
    correctNumber = Math.ceil(Math.random() * 100)
    console.log(correctNumber);
    document.querySelector('div > p').classList.add('hidden')
})


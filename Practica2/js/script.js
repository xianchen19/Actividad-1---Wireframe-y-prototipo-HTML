document.addEventListener('DOMContentLoaded', function () {
    const contenedorJuego = document.getElementById('contenedor-juego');
    const tituloJuego = document.getElementById('titulo-juego');
    const siguienteNumeroElemento = document.getElementById('siguiente-numero');
    const numeroActualElemento = document.getElementById('numero-actual');
    const elementoTemporizador = document.getElementById('temporizador');
    const mensajeVictoria = document.getElementById('mensaje-victoria');
    const elementoTiempoTranscurrido = document.getElementById('tiempo-transcurrido');
    
    let numeros = Array.from({ length: 25 }, (_, index) => index + 1);
    let numeroActual = 1;
    let tiempoInicio;
    let intervaloTemporizador;

    function iniciarTemporizador() {
        tiempoInicio = new Date().getTime();
        intervaloTemporizador = setInterval(actualizarTemporizador, 1000);
    }

    function actualizarTemporizador() {
        const tiempoActual = new Date().getTime();
        const tiempoTranscurrido = Math.floor((tiempoActual - tiempoInicio) / 1000);
        elementoTemporizador.textContent = `Tiempo: ${tiempoTranscurrido}s`;
    }

    function barajarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function reiniciarJuego() {
        clearInterval(intervaloTemporizador);
        mensajeVictoria.style.display = 'none';
        contenedorJuego.innerHTML = '';
        numeros = Array.from({ length: 25 }, (_, index) => index + 1);
        numeroActual = 1;
        elementoTemporizador.textContent = 'Tiempo: 0s';
        iniciarJuego();
    }
    
    

    function iniciarJuego() {
        barajarArray(numeros);
        for (let i = 0; i < 25; i++) {
            const celda = document.createElement('div');
            celda.classList.add('cell', 'light-blue');
            celda.textContent = numeros[i];
            celda.addEventListener('click', () => manejarClickCelda(celda));
            contenedorJuego.appendChild(celda);
        }
        tituloJuego.style.display = 'block';
        siguienteNumeroElemento.style.display = 'block';
        numeroActualElemento.textContent = numeroActual;
        siguienteNumeroElemento.style.visibility = 'visible';
        elementoTemporizador.style.visibility = 'visible';
        contenedorJuego.style.pointerEvents = 'auto';
    }
    

    function manejarClickCelda(celdaClic) {
        const numeroClic = parseInt(celdaClic.textContent);

        if (numeroClic === numeroActual) {

            if (numeroActual === 1) {
                iniciarTemporizador();
            }

            if (numeroActual <= 25) {
                do {
                    numeros[numeroActual - 1] = Math.floor(Math.random() * 25) + 26;
                } while (numeros.indexOf(numeros[numeroActual - 1]) !== numeroActual - 1);

                celdaClic.textContent = numeros[numeroActual - 1];
                celdaClic.classList.remove('light-blue');
                celdaClic.classList.add('dark-blue');
            } else {
                celdaClic.style.visibility = 'hidden';
            }

            numeroActual++;

            numeroActualElemento.textContent = numeroActual;

            if (numeroActual > 50) {
                clearInterval(intervaloTemporizador);
                tituloJuego.style.display = 'none';
                siguienteNumeroElemento.style.display = 'none';
                elementoTemporizador.style.visibility = 'hidden';
                mensajeVictoria.style.display = 'block';
                elementoTiempoTranscurrido.textContent = elementoTemporizador.textContent;
            }
        }
    }

    iniciarJuego();

    const botonVolverAJugar = document.querySelector('button');
    botonVolverAJugar.addEventListener('click', reiniciarJuego);
});

document.addEventListener('DOMContentLoaded', function () {
    const contenedorJuego = $('#contenedor-juego');
    const siguienteNumeroElemento = $('#siguiente-numero');
    const numeroActualElemento = $('#numero-actual');
    const elementoTemporizador = $('#temporizador');
    const mensajeVictoria = $('#mensaje-victoria');
    const elementoTiempoTranscurrido = $('#tiempo-transcurrido');
    const temaSwitch = $('#temaSwitch');

    let numeros = Array.from({ length: 25 }, (_, index) => index + 1);
    let numeroActual = 1;
    let tiempoInicio;
    let intervaloTemporizador;

    function cambiarTema(tema) {
        document.body.className = tema;
    }

    temaSwitch.on('change', function () {
        cambiarTema(this.checked ? 'tema-oscuro' : 'tema-claro');
        localStorage.setItem('tema', this.checked ? 'oscuro' : 'claro');
    });

    function cargarConfiguracionTema() {
        const temaGuardado = localStorage.getItem('tema');
        if (temaGuardado === 'oscuro') {
            temaSwitch.prop('checked', true);
            cambiarTema('tema-oscuro');
        } else {
            temaSwitch.prop('checked', false);
            cambiarTema('tema-claro');
        }
    }

    cargarConfiguracionTema();

    function iniciarTemporizador() {
        tiempoInicio = new Date().getTime();
        intervaloTemporizador = setInterval(actualizarTemporizador, 1000);
    }

    function actualizarTemporizador() {
        const tiempoActual = new Date().getTime();
        const tiempoTranscurrido = Math.floor((tiempoActual - tiempoInicio) / 1000);
        elementoTemporizador.text(`Tiempo: ${tiempoTranscurrido}s`);
    }

    function barajarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function reiniciarJuego() {
        clearInterval(intervaloTemporizador);
        mensajeVictoria.hide();
        contenedorJuego.html('');
        numeros = Array.from({ length: 25 }, (_, index) => index + 1);
        numeroActual = 1;
        elementoTemporizador.text('Tiempo: 0s');
        iniciarJuego();
    }

    function iniciarJuego() {
        barajarArray(numeros);
        for (let i = 0; i < 25; i++) {
            const celda = $('<div>').addClass('cell light-blue').text(numeros[i]);
            celda.on('click', () => manejarClickCelda(celda));
            contenedorJuego.append(celda);
        }
        siguienteNumeroElemento.show();
        numeroActualElemento.text(numeroActual);
        siguienteNumeroElemento.css('visibility', 'visible');
        elementoTemporizador.css('visibility', 'visible');
        contenedorJuego.css('pointer-events', 'auto');
    }

    function manejarClickCelda(celdaClic) {
        const numeroClic = parseInt(celdaClic.text());

        if (numeroClic === numeroActual) {
            if (numeroActual === 1) {
                iniciarTemporizador();
            }

            if (numeroActual <= 25) {
                do {
                    numeros[numeroActual - 1] = Math.floor(Math.random() * 25) + 26;
                } while (numeros.indexOf(numeros[numeroActual - 1]) !== numeroActual - 1);

                celdaClic.text(numeros[numeroActual - 1]).removeClass('light-blue').addClass('dark-blue');
            } else {
                celdaClic.css('visibility', 'hidden');
            }

            numeroActual++;
            numeroActualElemento.text(numeroActual);

            if (numeroActual > 50) {
                clearInterval(intervaloTemporizador);
                mostrarMensajeVictoria();
            }
        }
    }

    function mostrarMensajeVictoria() {
        siguienteNumeroElemento.hide();
        elementoTemporizador.css('visibility', 'hidden');

        Swal.fire({
            title: '¡Felicidades!',
            text: `Has ganado en ${elementoTemporizador.text()}.`,
            icon: 'success',
            confirmButtonText: 'Volver a jugar'
        }).then(() => {
            reiniciarJuego();
        });
    }

    iniciarJuego();
});

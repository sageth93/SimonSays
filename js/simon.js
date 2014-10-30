//
// Variables globales
//
var li = document.getElementsByTagName('li');
var memory;
var userMemory;
var playable = false;
//
// Funciones de control del juego
//
window.onload = function(){
	inicializacion();
}
/*
 * Parámetros de inicialización
 */
function inicializacion() {
	document.getElementsByTagName('button')[0].addEventListener("click", empezarJuego);
	userMemory = 0;
}

/*
 * Iniciar una nueva partida
 */
function empezarJuego() {
	memory = [];
	document.getElementsByTagName('button')[0].setAttribute('disabled', 'disabled');
	document.getElementsByTagName('p')[0].style.display = "none";
	nuevaRonda();

}

/*
 * Finalizar la partida. El jugador ha perdido
 */
function finalizarJuego() {
	desactivarTableroSimon();
	document.getElementsByTagName('button')[0].removeAttribute('disabled');
	document.getElementsByTagName("p")[0].style.display = "inline";
	document.getElementsByTagName("span")[1].innerHTML = memory.length-1;
}

/*
 * Incrementar las rondas
 */
function nuevaRonda(){
	memory.push(generarNumeroAleatorio());
	document.getElementsByTagName('span')[0].innerHTML = memory.length;
	desactivarTableroSimon();
	userMemory = 0;
	animar(memory);
}

/*
 * Cuando el jugador pincha en una de las secciones de color
 * A medida que se va incrementando la secuencia, se va comprobando si se ha equivocado
 */
function registrarClick() {
	clickId = parseInt(this.id);
	iluminar(clickId);
	comprobarErrorSecuencia(clickId);
}

/*
 * El usuario pierde cuando pincha en el color equivocado.
 * Si se ha pinchado en el color correcto y se ha finalizado de procesar la secuencia, lanzar nueva ronda
 * Si se ha pinchado en el color correcto pero no se ha finalizado de procesar la secuencia, continuar registrando clicks
 */
function comprobarErrorSecuencia(clickId) {

if(clickId == memory[userMemory]){
	userMemory++;

	if (userMemory >= memory.length){
		nuevaRonda();
	}
}else{
	finalizarJuego();
	}
}

//
// Funciones auxiliares
//

/*
 * Permite al usuario interaccionar con el juego (hacer click en las secciones)
 */
 function activarTableroSimon(){
 	for(var i = 0; i<li.length; i++){
 		li[i].addEventListener('click', registrarClick, false);
 	}

}

/*
 * Inhabilita al usuario a interaccionar con el juego (hacer click en las secciones) hasta que la secuencia se haya termiado de mostrar
 */
 function desactivarTableroSimon(){
 	for(var i = 0; i<li.length; i++){
 		li[i].removeEventListener('click', registrarClick,false);
 	}
}

function animar(secuencia) {
	var count = 0;
	var interval = setInterval(function(){
		
		iluminar(secuencia[count]);
		count++;

		if(count>=secuencia.length){
			clearInterval(interval);
			activarTableroSimon();
		}

	}, 600);

}

function iluminar(tile) {
	li[tile].setAttribute("class", "tile.til "+getColor(tile));
	var original = setTimeout(function(){
		li[tile].setAttribute("class", "tile "+getColor(tile));
	} ,200);
}

function generarNumeroAleatorio() {
	return Math.floor(Math.random()*4);
}

function getColor(index){
	switch(index){
		case 0:
			return "red";
			break;
		case 1:
			return "blue";
			break;
		case 2:
			return "yellow";
			break;
		case 3:
			return "green";
			break;
		default:
			return "";
		}
	}
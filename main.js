//Jugador
const contenedorCartasJugador=document.getElementById("contenedorCartasJugador");
const contenedorPuntuacionJugador=document.getElementById("puntuacionJugador");
let valoresCartasJugador=0;
let tengoAS=0;
let plantarse=false;

//Crupier
const contenedorPuntuacionCrupier=document.getElementById("puntuacionCrupier");
const contenedorCartasCrupier=document.getElementById("contenedorCartasCrupier");
let valoresCartasCrupier=0;

//Botones
const botonNuevoJuego=document.getElementById("nuevoJuego");
const botonPedirCarta=document.getElementById("pedirCarta");
const botonPlantarse=document.getElementById("detener");
const contenedorInfo=document.getElementById("informacion")
contenedorInfo.style.display="none";

let arrayCartasRepetidas=[];

let jugadorAPerdido=false;


botonNuevoJuego.addEventListener("click",()=>{
    valoresPorDefecto();
    sacarCartaJugador();
    sacarCartaJugador();
    if(valoresCartasJugador==21){
        contenedorInfo.innerHTML="Black Jack";
        mostrarContenedorMensaje()
    }
    contenedorCartasCrupier.innerHTML+=`<img src='./cartas/grey_back.png'>`;
    contenedorCartasCrupier.innerHTML+=`<img src='./cartas/grey_back.png'>`;
   


})

botonPedirCarta.addEventListener("click",()=>{
    let jugadorAPerdido=sacarCartaJugador();
    if(valoresCartasJugador==21){ //Jugador saca máximo valor
        contenedorCartasCrupier.innerHTML=``;
        do{
            sacarCartaCrupier();
        }while(valoresCartasCrupier<17&&valoresCartasCrupier!=0)
        if(valoresCartasCrupier==21){
            contenedorInfo.innerHTML="Empate";
            mostrarContenedorMensaje()
        }else{
            contenedorInfo.innerHTML="Has ganado";
            mostrarContenedorMensaje()
        }
    }

    if(jugadorAPerdido){ //Jugador se pasa
        contenedorCartasCrupier.innerHTML=``;
        sacarCartaCrupier()
        sacarCartaCrupier()
        contenedorInfo.innerHTML="Has Perdido";
        mostrarContenedorMensaje()
    }
})

botonPlantarse.addEventListener("click",()=>{
    contenedorCartasCrupier.innerHTML=``;
    do{
        sacarCartaCrupier();
    }while(17>valoresCartasCrupier)

    if(valoresCartasJugador>valoresCartasCrupier||valoresCartasCrupier>21){
        contenedorInfo.innerHTML="Has ganado";
    }else if(valoresCartasJugador==valoresCartasCrupier){
        contenedorInfo.innerHTML="Empate";
    }else{
        contenedorInfo.innerHTML="Has Perdido";
    }
    botonPedirCarta.disabled=true;
        mostrarContenedorMensaje()
        
})
function mostrarContenedorMensaje(){
        botonPedirCarta.disabled=true;
        botonPedirCarta.classList.add("botonDeshabilitado");
        botonPlantarse.disabled=true;
        botonPlantarse.classList.add("botonDeshabilitado");
        setTimeout(function(){contenedorInfo.style.display="flex"},1000);
}

function sacarCartaCrupier(){
    do{
        numeroCarta=Math.floor(Math.random()*13)+1;
        paloCarta=Math.floor(Math.random()*4)+1;
        carta=cartaSeleccionada(numeroCarta,paloCarta)
        let sumaDelAS=0;
        if(!arrayCartasRepetidas.includes(carta)){
            arrayCartasRepetidas.push(carta)


            if(devuelveValorCarta(numeroCarta)==1){
                sumaDelAS=10
                tengoAS++;
            }

            valoresCartasCrupier+=devuelveValorCarta(numeroCarta)+sumaDelAS;

    
            if(valoresCartasCrupier>21){
                if(tengoAS!=0){
                    valoresCartasCrupier+=-10
                    tengoAS--;
                    contenedorPuntuacionCrupier.innerHTML="Crupier: "+valoresCartasCrupier;
                    contenedorCartasCrupier.innerHTML+=`<img src='./cartas/${carta}.png'>`;
                    return false
                }
                contenedorPuntuacionCrupier.innerHTML="Crupier: "+valoresCartasCrupier;
                contenedorCartasCrupier.innerHTML+=`<img src='./cartas/${carta}.png'>`;
                return true
            }else{
                contenedorPuntuacionCrupier.innerHTML="Crupier: "+valoresCartasCrupier;
                contenedorCartasCrupier.innerHTML+=`<img src='./cartas/${carta}.png'>`;
                return false
            }
            
        }
    }while(!arrayCartasRepetidas.includes(carta))
}

function sacarCartaJugador(){
    do{
        numeroCarta=Math.floor(Math.random()*13)+1;
        paloCarta=Math.floor(Math.random()*4)+1;
        carta=cartaSeleccionada(numeroCarta,paloCarta)
        let sumaDelAS=0;
        if(!arrayCartasRepetidas.includes(carta)){
            arrayCartasRepetidas.push(carta)


            if(devuelveValorCarta(numeroCarta)==1){
                sumaDelAS=10
                tengoAS++;
            }

            valoresCartasJugador+=devuelveValorCarta(numeroCarta)+sumaDelAS;

    
            if(valoresCartasJugador>21){
                if(tengoAS!=0){
                    valoresCartasJugador+=-10
                    tengoAS--;
                    contenedorPuntuacionJugador.innerHTML="Jugador 1: "+valoresCartasJugador;
                    contenedorCartasJugador.innerHTML+=`<img src='./cartas/${carta}.png'>`;
                    return false
                }
                contenedorPuntuacionJugador.innerHTML="Jugador 1: "+valoresCartasJugador;
                contenedorCartasJugador.innerHTML+=`<img src='./cartas/${carta}.png'>`;
                return true
            }else{
                contenedorPuntuacionJugador.innerHTML="Jugador 1: "+valoresCartasJugador;
                contenedorCartasJugador.innerHTML+=`<img src='./cartas/${carta}.png'>`;
                return false
            }
            
        }
    }while(!arrayCartasRepetidas.includes(carta))

}

function devuelveValorCarta(numero){
    switch(numero){
        case 1:
            numero=1
            break;
        case 11:
            numero=10
            break;
        case 12:
            numero=10
            break;
        case 13:
            numero=10
            break;
        default:
            numero=numero;
            break;
    }
    return numero;
}

function cartaSeleccionada(numero,palo){
    switch(numero){
        case 1:
            numero="A"
            break;
        case 2:
            numero=2
            break;
        case 3:
            numero=3
            break;
        case 4:
            numero=4
            break;
        case 5:
            numero=5
            break;
        case 6:
            numero=6
            break;
        case 7:
            numero=7
            break;
        case 8:
            numero=8
            break;
        case 9:
            numero=9
            break;
        case 10:
            numero=10
            break;
        case 11:
            numero="J"
            break;
        case 12:
            numero="Q"
            break;
        case 13:
            numero="K"
            break;
    }
    switch(palo){
        case 1:
            palo="C"
            break;
        case 2:
            palo="D"
            break;
        case 3:
            palo="H"
            break;
        case 4:
            palo="S"
            break;
    }
    return numero+palo;
}

function valoresPorDefecto(){
    arrayCartasRepetidas=[];
    valoresCartasJugador=0;
    valoresCartasCrupier=0;
    tengoAS=0;

    contenedorCartasJugador.innerHTML="";
    contenedorCartasCrupier.innerHTML="";
    contenedorPuntuacionJugador.innerHTML="Jugador 1: "
    contenedorPuntuacionCrupier.innerHTML="Crupier: ";
    botonPedirCarta.disabled=false;
    botonPedirCarta.classList.remove("botonDeshabilitado");
    botonPlantarse.disabled=false;
    botonPlantarse.classList.remove("botonDeshabilitado");
    contenedorInfo.style.display="none";
}
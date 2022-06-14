//const canvas = document.querySelector('canvas');
const canvas = document.createElement('canvas')
const c = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 720; 
c.fillRect(0, 0, canvas.width, canvas.height);

//global variables
let gravity = 0.7;
const jumpMaxGauge = 2000;

let currentPlayers = []

//creating scene 1 and attaching a background and its platforms to it 
const scene1 = new Scene(level1,players)
const scene2 = new Scene(level2,players)
const scene3 = new Scene(level3,players);

//defaulting current scene to scene 1
let currentScene = scene1;

const fps = 90
//Handling the global updating , gets called every frame
function animate(){
    //calls animate function every window frame
    setTimeout(() => {
        window.requestAnimationFrame(animate)
        currentPlayers = getPlayers();
        //update current scene
        currentPlayers.forEach(player => {
            handleCamera(player)
            renderGame(currentScene)
            //update the player 

            keyHandlerFunc(player)
            player.update();
            //sceneHandler();
            
        })
 
    }
    ,1000/fps)
}

animate();

const menu2 = document.getElementById('main-menu')
function startGame(){
    const menu = document.getElementById('main-menu')
    menu.remove()
    const container = document.getElementById('canvas-container')
    playAudioOnce('landSfx')
    container.prepend(canvas)
    createPlayer()
}

function endGame(){
    canvas.remove();
    delete player
    const container = document.getElementById('canvas-container')
    container.prepend(menu2)
    currentScene = scene1
}

function handleCamera(player){
    let scroll = 0
    if(player.position.y < 360 && player.position.y > -461){
        scroll = player.velocity.y / 1.2
        c.translate(0,(-scroll))
    }else if(player.position.y > 360){
        c.setTransform(1, 0, 0, 1, 0, 0);
    } else if(player.position.y < -461){
        c.save();
        c.restore()
    }
    c.save();
}
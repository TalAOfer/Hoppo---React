//data for key presses
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false,
        released: false
    }
}
let keyPressed = {};
let keyReleased = {};
let lastKey;
let keyUp;


//Handle the players input when pressing down a key
window.addEventListener('keydown', (event) => {
    if(event.keyCode === 32){
        keyPressed[event.keyCode || event.which] = true;
        keyReleased[event.keyCode || event.which] = false;
    }
    keyPressed[event.keyCode || event.which] = true;
})

//Handle the players input when leaving a key
window.addEventListener('keyup', (event) => {
    switch(event.keyCode){
        case 87:
            keyPressed[event.keyCode || event.which] = false;
            keyReleased[event.keyCode || event.which] = true;
            break
        case 68:
            setTimeout(()=>{
                keyPressed[event.keyCode || event.which] = false;
                keyReleased[event.keyCode || event.which] = true;
            },100)
            break
        case 65:
            setTimeout(()=>{
                keyPressed[event.keyCode || event.which] = false;
                keyReleased[event.keyCode || event.which] = true;
            },100)
        case 32:
            setTimeout(()=>{
                keyPressed[event.keyCode || event.which] = false;
                keyReleased[event.keyCode || event.which] = true;
            },100)


    }
    //keyPressed[event.keyCode || event.which] = false;
    //keyReleased[event.keyCode || event.which] = true;
})

function keyHandlerFunc(player){
    // w press check
    if(keyPressed[87]){
        if(!player.isJumping){
            keys.w.pressed = true;
            if(player.jumpGauge < jumpMaxGauge && (player.isGrounded || player.isOnPlatform)){
                player.jumpGauge += 40
            }
       }
    }
    else {
        //player.jumpGauge = 0
    }
    // w release check
    if(keyReleased[87]){
        player.isJumping = true
    }
    console.log(player.punch.currentFrame < player.punch.frameMax)
    if(keyPressed[32]){
        lastKey = ''
        if(player.currentSprite === player.sprites.idle.right)
        player.punch.right.update(player)
        if(player.currentSprite === player.sprites.idle.left)
        player.punch.left.update(player)
    }
    if(keyReleased[32]){
        keyUp = 'space'
        player.punch.right.currentFrame = 0
        player.punch.left.currentFrame = 0
    }
    // d press check
    if(keyPressed[68]){
        lastKey = 'd'
    }
    // d release check
    if(keyReleased[68]){
        keyUp = 'd'
    }
    // a press check
    if(keyPressed[65]){
        lastKey = 'a'
    }
    // a release check
    if(keyReleased[65]){
        keyUp = 'a'
    }
}


function handleJumpInput(player) {
    /*Check if jump gauge is at max , and jump if true  */
    if (player.jumpGauge >= jumpMaxGauge) {
        player.isJumping = true;
        player.chargeBar.tick.width = 3.7
        player.jumpGauge = jumpMaxGauge;
        if (keyPressed[65] && lastKey === 'a') {
            jump(player,'left')
        } else if (keyPressed[68] && lastKey === 'd') {
            jump(player,'right')
        } else {
            jump(player,'middle')
        }
        player.jumpGauge = 0
        /*If jump Gauge is not at max , Check if player released W key and jump if true  */
    } else if (keyReleased[87]) {
        if (player.isGrounded || player.isOnPlatform) {
            player.chargeBar.tick.width = 3.7
            if (keyPressed[65] && lastKey === 'a') {
                jump(player,'left')
            } else if (keyPressed[68] && lastKey === 'd') {
                jump(player,'right')
            } else {
                jump(player,'middle')
            }

        }
        player.jumpGauge = 0
    }
}

function jump(player, direction){
    playAudioOnce('jumpSfx')
    if(direction === 'left'){
        player.currentSprite = player.sprites.idle.left
        player.velocity.x = -4 - (player.jumpGauge / 550)
    }else if(direction === 'right'){
        player.currentSprite = player.sprites.idle.right
        player.velocity.x = 4 + (player.jumpGauge / 550)
    }
    player.velocity.y = -3 - (player.jumpGauge / 100)
    player.isJumping = true;
    player.isOnPlatform = false
    player.lastJump = Date.now();
}

import { MAX_JUMP_GAUGE } from "./constants";
import { audioServices } from "../services/audio-services";

export const playerController = {
    keyHandlerFunc,
    jump
}

function keyHandlerFunc(player, keyPressed, keyReleased, keyUp, lastKey){
    // w press check
    if(keyPressed[87]){
        if(!player.isJumping){
            if(player.jumpGauge < MAX_JUMP_GAUGE && (player.isGrounded || player.isOnPlatform)){
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
    _handleJumpInput(player, keyPressed, keyReleased, keyUp, lastKey)
}


function _handleJumpInput(player, keyPressed, keyReleased, keyUp, lastKey) {
    /*Check if jump gauge is at max , and jump if true  */
    if (player.jumpGauge >= MAX_JUMP_GAUGE) {
        player.isJumping = true;
        player.chargeBar.tick.width = 3.7
        player.jumpGauge = MAX_JUMP_GAUGE;
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
    audioServices.playAudioOnce('jumpSfx')
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

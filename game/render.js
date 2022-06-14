import { Canvas } from "../cmp/canvas"

export const renderServices = {
    renderGame,
    blender
}

function blender() {
    // console.log(Canvas)
}

function renderGame(scene, c) {
    //console.log(scene)
    const background = scene.background
    const platforms = scene.platforms
    const players = scene.players

    //draw background
    c.drawImage(
        background.img,
        background.currentFrame * (background.img.width / background.frameMax),
        0,
        background.img.width / background.frameMax,
        background.img.height,
        background.position.x,
        background.position.y,
        (background.img.width / background.frameMax) * background.scale,
        background.img.height * background.scale)

    //draw background collider
    c.fillRect(background.collider.position.x,
        background.collider.position.y,
        background.collider.width,
        background.collider.height)


    //draw each platform
    platforms.forEach(platform => {
        c.drawImage(
            platform.img,
            platform.currentFrame * (platform.img.width / platform.frameMax),
            0,
            platform.img.width / platform.frameMax,
            platform.img.height,
            platform.position.x,
            platform.position.y,
            (platform.img.width / platform.frameMax) * platform.scale,
            platform.img.height * platform.scale)

        //draw each platform collider
        /*
        c.fillRect(platform.collider.position.x,
            platform.collider.position.y, 
            platform.collider.width, 
            platform.collider.height)*/
    })
    //draw players
    players.forEach(player => {
        c.drawImage(
            player.currentSprite,
            player.currentFrame * (player.img.width / player.frameMax),
            0,
            player.img.width / player.frameMax,
            player.img.height,
            player.position.x,
            player.position.y,
            (player.img.width / player.frameMax) * player.scale,
            player.img.height)


        // c.fillStyle = 'red'
        // c.fillRect(getColliderDirection() , player.colliderBox.position.y , player.colliderBox.width ,player.colliderBox.height )


        // if (keyPressed[87] && !player.isJumping) {

        //     c.fillStyle = '#433732'
        //     c.fillRect(player.currentSprite === player.sprites.idle.right ? player.position.x : player.position.x - 10,
        //         player.chargeBar.position.y - 20,
        //         player.chargeBar.width,
        //         player.chargeBar.height)

        //     c.fillStyle = '#EAA141'
        //     c.fillRect((player.currentSprite === player.sprites.idle.right ? player.position.x : player.position.x - 10) + 1,
        //         player.chargeBar.position.y - 19,
        //         player.chargeBar.tick.width,
        //         player.chargeBar.tick.height)

        //     player.chargeBar.tick.width += 0.9
        // }
    })
}


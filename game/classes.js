class Sprite {
    constructor({ position, imgSrc, width, height, borderY = 1, borderWidth = 1, isWall = false, isActive = true, scale = 1, frameMax = 1 }) {
        this.img = new Image(width, height);
        this.img.src = imgSrc;
        this.position = position
        this.height = this.img.height
        this.width = this.img.width
        this.scale = scale;
        this.frameMax = frameMax;
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.holdFrames = 3
        this.collider = {
            position: {
                x: this.position.x,
                y: borderY === 1 ? this.position.y : borderY
            },
            width: borderWidth === 1 ? this.width : borderWidth,
            height: this.height - this.height,
            isActive: isActive === true ? true : isActive,
            isWall: isWall === false ? false : isWall
        }
    }
    //render the img and animate it 
    draw(player) {
        this.collider.position.x = player.position.x
        this.collider.position.y = player.position.y
        c.drawImage(
            this.img,
            this.currentFrame * (this.img.width / this.frameMax),
            0,
            this.img.width / this.frameMax,
            this.img.height,
            this.position.x + (player.currentSprite === player.sprites.idle.left ? - 36 : 0),
            this.position.y - 25,
            (this.img.width / this.frameMax) * this.scale,
            this.img.height * this.scale)
        c.fillStyle = "black"
        c.fillRect(this.collider.position.x, this.collider.position.y, this.collider.width, this.collider.height)
    }
    //handle specific instance updating
    update(player) {
        this.draw(player);
        this.elapsedFrames++
        if (this.elapsedFrames % this.holdFrames === 0) {
            if (this.currentFrame < this.frameMax - 1) {
                this.currentFrame++
            } else {
                this.currentFrame = 0
            }
        }
    } 
}
class Character {
    constructor({ position, velocity, width, height, scale = 1, frameMax = 1 }) {
        this.img = new Image(width, height)
        this.position = position
        this.velocity = velocity
        this.height = height
        this.width = width
        this.isGrounded = false
        this.isOnPlatform = false
        this.currentFrame = 0
        this.frameMax = frameMax
        this.scale = scale

        this.sprites = {
            idle: {
                right: new Image(50, 71),
                left: new Image(50, 71)
            }
        }
        this.punch = {
            right: new Sprite({
                position: this.position,
                width: 2016,
                height: 96,
                imgSrc: './img/Background/hoppo-punch-animation-right.png',
                borderY: 1,
                borderWidth: 1,
                isWall: false,
                isActive: false,
                scale: 1,
                frameMax: 21
            }),
            left:  new Sprite({
                position: this.position,
                width: 2016,
                height: 96,
                imgSrc: './img/Background/hoppo-punch-animation-left.png',
                borderY: 1,
                borderWidth: 1,
                isWall: false,
                isActive: false,
                scale: 1,
                frameMax: 21
            })
        }
        this.isAttacking = false

        this
        this.sprites.idle.right.src = './img/Background/kangorooright.png'
        this.sprites.idle.left.src = './img/Background/kangorooleft.png'
        this.currentSprite = this.sprites.idle.right

        this.colliderBox = {
            position: this.position,
            width: 32,
            height: this.height
        },

            this.chargeBar = {
                position: this.colliderBox.position,
                width: 53,
                height: 10,
                tick: {
                    width: 3.7,
                    height: 8
                }
            },

            this.force = 0;
        this.lastJump = Date.now(),
            this.jumpGauge = 0,
            this.isJumping = true,
            this.canJump = false
        this.isShovedX = false
        this.isShovedY = false
    }
    //render the player
    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentFrame * (this.img.width / this.frameMax),
            0,
            this.img.width / this.frameMax,
            this.img.height,
            this.position.x,
            this.position.y,
            (this.img.width / this.frameMax) * this.scale,
            this.img.height)

        /*
        c.fillStyle = 'red'
        c.fillRect(getColliderDirection() , this.colliderBox.position.y , this.colliderBox.width ,this.colliderBox.height )
        */

        if (keyPressed[87] && !this.isJumping) {

            c.fillStyle = '#433732'
            c.fillRect(this.currentSprite === this.sprites.idle.right ? this.position.x : this.position.x - 10,
                this.chargeBar.position.y - 20,
                this.chargeBar.width,
                this.chargeBar.height)

            c.fillStyle = '#EAA141'
            c.fillRect((this.currentSprite === this.sprites.idle.right ? this.position.x : this.position.x - 10) + 1,
                this.chargeBar.position.y - 19,
                this.chargeBar.tick.width,
                this.chargeBar.tick.height)

            this.chargeBar.tick.width += 0.9
        }
    }
    //handle specific instance updating for player
    update() {
        applyVelocity(this)
        checkBorderBounce(this)
        /*check collision for walls and headbutt*/
        currentScene.platforms.forEach(platform => {
            if (platform.collider.isWall) {
                checkWallHeadbutt(this, platform)
            }
        })
        //check wall collision and bounce off thier x
        currentScene.platforms.forEach(platform => {
            if (platform.collider.isWall) {
                checkWallCollide(this, platform)
            }
        })
        //detect floor collision and apply gravity
        applyGravity(this)
        handleJumpInput(this)
        checkPlatformCollision(this)
    }
}
class Level {
    constructor(obj) {
        this.background = obj.background
        this.platforms = obj.platforms
    }
}
class Scene {
    constructor(level, players) {
        this.background = level.background
        this.platforms = level.platforms
        this.players = players
    }
    draw() {
        //draw background
        c.drawImage(
            this.background.img,
            this.background.currentFrame * (this.background.img.width / this.background.frameMax),
            0,
            this.background.img.width / this.background.frameMax,
            this.background.img.height,
            this.background.position.x,
            this.background.position.y,
            (this.background.img.width / this.background.frameMax) * this.background.scale,
            this.background.img.height * this.background.scale)

        //draw background collider
        c.fillRect(this.background.collider.position.x,
            this.background.collider.position.y,
            this.background.collider.width,
            this.background.collider.height)

        //draw players
        this.players.forEach(player => {
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

            /*
            c.fillStyle = 'red'
            c.fillRect(getColliderDirection() , this.colliderBox.position.y , this.colliderBox.width ,this.colliderBox.height )
            */

            if (keyPressed[87] && !player.isJumping) {

                c.fillStyle = '#433732'
                c.fillRect(player.currentSprite === player.sprites.idle.right ? player.position.x : player.position.x - 10,
                    player.chargeBar.position.y - 20,
                    player.chargeBar.width,
                    player.chargeBar.height)

                c.fillStyle = '#EAA141'
                c.fillRect((player.currentSprite === player.sprites.idle.right ? player.position.x : player.position.x - 10) + 1,
                    player.chargeBar.position.y - 19,
                    player.chargeBar.tick.width,
                    player.chargeBar.tick.height)

                player.chargeBar.tick.width += 0.9
            }
        })
        //draw each platform
        this.platforms.forEach(platform => {
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
    }
    update() {
        this.draw();
    }
}

function renderGame(scene) {
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


        if (keyPressed[87] && !player.isJumping) {

            c.fillStyle = '#433732'
            c.fillRect(player.currentSprite === player.sprites.idle.right ? player.position.x : player.position.x - 10,
                player.chargeBar.position.y - 20,
                player.chargeBar.width,
                player.chargeBar.height)

            c.fillStyle = '#EAA141'
            c.fillRect((player.currentSprite === player.sprites.idle.right ? player.position.x : player.position.x - 10) + 1,
                player.chargeBar.position.y - 19,
                player.chargeBar.tick.width,
                player.chargeBar.tick.height)

            player.chargeBar.tick.width += 0.9
        }
    })
}
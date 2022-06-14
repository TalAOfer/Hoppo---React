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
    draw(player, c) {
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
    update(player, c) {
        this.draw(player, c);
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
}

export const classes = {
    Sprite,
    Character,
    Level,
    Scene
}

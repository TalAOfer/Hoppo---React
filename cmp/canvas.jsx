
import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import { FPS } from '../game/constants'
import { levelServices } from '../services/level-services'
import { playerServices } from '../services/player-services'


export function Canvas({ props }) {

    const canvasRef = useRef(null)

    const animate = () => {
        //calls animate function every window frame
        setTimeout(() => { 
            window.requestAnimationFrame(animate)
            
            const currentPlayers = playerServices.getPlayers()
            // //update current scene
            renderGame(currentScene)
            // currentPlayers.forEach(player => {
            //     handleCamera(player)
            //     renderGame(currentScene)
            //     //update the player 
    
            //     keyHandlerFunc(player)
            //     player.update();
                
        //     })
     
        // }
    }
        ,1000/FPS)
    }


    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas.getContext('2d')
        canvas.width = 480;
        canvas.height = 720;
        c.fillRect(0, 0, canvas.width, canvas.height);

        let level = levelServices.getLevel()
        playerServices.createPlayer()
        animate(level, c)
    }, [])



    return <canvas className='canvas' ref={canvasRef} {...props} />

}


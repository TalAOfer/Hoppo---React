
import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import { FPS } from '../game/constants'
import { renderServices } from '../game/render'
import { levelServices } from '../services/level-services'
import { playerServices } from '../services/player-services'


export function Canvas({ props }) {

    const canvasRef = useRef(null)
    const cRef = useRef(null)
    const sceneRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas.getContext('2d')
        cRef.current = c
        canvas.width = 480;
        canvas.height = 720;
        c.fillRect(0, 0, canvas.width, canvas.height);
        const currentScene = levelServices.getScene()
        // console.log(currentScene)
        
        sceneRef.current = currentScene
        playerServices.createPlayer()
        animate()
    }, [])


    const animate = () => {
        //calls animate function every window frame
        setTimeout(() => {
            window.requestAnimationFrame(animate)

            const currentPlayers = playerServices.getPlayers()

            // console.log(sceneRef.current, cRef.current)

            renderServices.renderGame(sceneRef.current, cRef.current)
            // currentPlayers.forEach(player => {
            //     handleCamera(player)
            //     renderGame(currentScene)
            //     //update the player 

            //     keyHandlerFunc(player)
            //     player.update();

            //     })

            // }
        }
            , 1000 / FPS)
    }






    return <canvas className='canvas' ref={canvasRef} {...props} />

}



import React, { useRef, useEffect } from 'react'


export function Canvas({ props }) {

    const jumpMaxGauge = 2000;

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas.getContext('2d')
        // const player = playerServices.getPlayer()
        // const currentScene = gameServices.getCurrScene()

        canvas.width = 480;
        canvas.height = 720;
        c.fillRect(0, 0, canvas.width, canvas.height);

        // gameServices.update(c, )
    }, [])



    return <canvas className='canvas' ref={canvasRef} {...props} />

}


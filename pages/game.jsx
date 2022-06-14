import  React, { useState } from "react";
import { Canvas } from "../cmp/canvas";
import { MainMenu } from "../cmp/main-menu";

export function Game() {
    const [isGameOn, setIsGameOn] = useState(false)



    return <section className="game-container">
     {!isGameOn && <MainMenu setIsGameOn={setIsGameOn}/>}   
    {isGameOn && <Canvas/>}
    </section>
}
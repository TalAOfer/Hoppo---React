import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";

export function MainMenu({setIsGameOn}) {

    const startGame = () => {
        setIsGameOn(true)
    }

    return <section className="main-menu">
            <button className="button-19" onClick={startGame}>Play</button>
    </section>
}
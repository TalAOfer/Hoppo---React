import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import { MainMenu } from './cmp/main-menu';
import { Game } from './pages/game';
import './assets/style/main.scss'


export function RootCmp() {
  return (
    <main className="root-cmp">
      <Routes>
        <Route path="/" element={<Game />} />
        {/* <Route path="/play" element={<Game />} /> */}
      </Routes>
    </main>
  );
}


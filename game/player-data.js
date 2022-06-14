const players = []

function createPlayer(){
    const player = new Character({
        position: {
        x: getRandomInt(100,450),
        y: 600},
        velocity: {
        x: 0,
        y: 0
        },
        width: 50,
        height: 71
    })
    players.push(player)
}

function getPlayers(){
    return players
}

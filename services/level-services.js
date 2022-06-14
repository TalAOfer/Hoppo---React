import { levelData } from "../game/level-data";
import { playerServices } from "./player-services";
import { classes } from "../game/classes";
import { utils } from "../game/utils";

export const levelServices = {
    getScene
}

function getScene () {
    const players = playerServices.getPlayers()
    const scene = new classes.Scene(levelData.level1, players)
    return scene
}
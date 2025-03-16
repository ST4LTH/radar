import { createStore } from "solid-js/store";

interface radarState {
    open: boolean,
    menu: boolean,
    settings: settingsType,
    front: radarType | null,
    back: radarType | null,
}

export type radarType = {
    speed: number,
    plateId: number,
    plate: string,
    vehicle: vehicleType,
}

export type vehicleType = {
    owner: string,
    ownerWanted: boolean,
    maxSpeed: number,
    wanted: boolean,
    model: string,
}

export type settingsType = {
    coords: number[];
    scale: number[];
}

const [radarState, setRadarState] = createStore<radarState>({
    open: true,
    menu: false,
    settings: {
        coords: [0,0],
        scale: [1.0]
    },
    front: null,
    back: null,
})

export { 
    radarState, 
    setRadarState
}
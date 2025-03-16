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
    speedAlarm: number[];
}

const [radarState, setRadarState] = createStore<radarState>({
    open: false,
    menu: false,
    settings: {
        coords: [0,0],
        scale: [1.0],
        speedAlarm: [0.0]
    },
    front: null/* {
        speed: 20,
        plateId: 1,
        plate: 'ABC 123',
        vehicle: {
            owner: 'John Doe',
            ownerWanted: false,
            maxSpeed: 100,
            wanted: false,
            model: 'Sentinel'
        },
    } */,
    back: null,
})

export { 
    radarState, 
    setRadarState
}
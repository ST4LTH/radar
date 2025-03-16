import { Component } from "solid-js"
import { Slider, SliderFill, SliderThumb, SliderTrack } from "../ui/slider"
import { radarState, setRadarState, settingsType } from "../../store/radar"
import { post } from "@/misc"
const RadarSettings: Component = () => {
    const handleChange = (key: keyof settingsType, value: number[]) => {
        setRadarState('settings', key, value)
    }

    const saveState = () => {
        post('radar:saveState', radarState.settings)
        post('radar:closeMenu')
        setRadarState('menu', false)
    }

    const resetState = () => {
        post('radar:resetState', undefined, (data: settingsType) => {
            setRadarState('settings', data)
        })
    }

    return <div class="absolute flex gap-3 items-center justify-center h-full right-0 left-0 top-0 bottom-0 m-auto rounded">
        <div class="select-none text-white p-8 h-fit w-[35vh] bg-neutral-900 rounded">
            <p class="text-white font-semibold text-xl pb-2">Radar inställningar</p>
            <p class="text-sm pb-3 font-semibold text-neutral-400">
                Justera hastighet och position
            </p>
            <div class="w-full h-[1px] bg-yellow-500" />
            <div class="px-2 py-5">
                <div class="text-base flex font-semibold pb-3">
                    <p>Storlek</p>
                    <div class="flex-grow" />
                    <p class="text-neutral-400">{ Math.floor(radarState.settings.scale[0]*100) }%</p>
                </div>
                <Slider
                    value={radarState.settings.scale} 
                    onChange={(value: number[]) => {
                        handleChange('scale', value)
                    }}
                    minValue={0.25}
                    maxValue={2}
                    step={0.05}
                >
                    <SliderTrack class="h-3 bg-neutral-800">
                        <SliderFill class="h-3 bg-white"/>
                        <SliderThumb class="h-7 w-7" />
                    </SliderTrack>
                </Slider>
                <div class="text-base flex font-semibold pt-3">
                    <p class="text-neutral-400">Liten</p>
                    <div class="flex-grow" />
                    <p class="text-neutral-400">Stor</p>
                </div>
            </div>
            <div class="pb-5 px-2 pt-3">
                <div class="text-base flex font-semibold pb-3">
                    <p>Hastighets varning</p>
                    <div class="flex-grow" />
                    <p class="text-neutral-400">{ Math.floor(radarState.settings.speedAlarm[0]) } km/h</p>
                </div>
                <Slider
                    value={radarState.settings.speedAlarm} 
                    onChange={(value: number[]) => {
                        handleChange('speedAlarm', value)
                    }}
                    minValue={0}
                    maxValue={220}    // Changed from 5 to 220
                    step={1}
                >
                    <SliderTrack class="h-3 bg-neutral-800">
                        <SliderFill class="h-3 bg-white"/>
                        <SliderThumb class="h-7 w-7" />
                    </SliderTrack>
                </Slider>
                <div class="text-base flex font-semibold pt-3">
                    <p class="text-neutral-400">0</p>
                    <div class="flex-grow" />
                    <p class="text-neutral-400">220</p>
                </div>
            </div>
            <div class="flex gap-2 pt-4">
                <button onClick={resetState} class="bg-neutral-700 text-white text-sm font-bold rounded px-5 py-3">
                    ÅTERSTÄLL
                </button>
                <button onClick={saveState} class="bg-neutral-300 w-full text-black text-sm font-bold rounded px-5 py-3">
                    SPARA
                </button>
            </div>
        </div>
        <div class="absolute translate-x-[30vh] bg-neutral-900 text-base font-semibold px-6 py-5 rounded text-white">
            <p class="font-bold text-lg">Keybinds</p>
            <p class="text-sm pb-3 pt-1 font-semibold text-neutral-400">
                Kan ändras genom keybinds/fivem
            </p>
            <div class="w-full h-[1px] bg-yellow-500" />
            <p class="pt-3">
                <span class="font-bold">F6</span> - Radar inställningar
            </p>
            <p>
                <span class="font-bold">F5</span> - Toggla Radarn
            </p>
            <p>
                <span class="font-bold">F4</span> - Markera fordon framför
            </p>
        </div>
    </div>
}

export default RadarSettings
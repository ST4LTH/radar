import { Component, createMemo, createSignal, onCleanup } from "solid-js";
import { radarState, radarType, setRadarState, vehicleType } from "../../store/radar";
import { post } from "@/misc";
import { cn } from "@/lib/utils";
import { useNuiEvent } from "@/hooks/useNuiEvent";

const PoliceRadar: Component = () => {
    const [offset, setOffset] = createSignal({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = createSignal(false)

    const state = createMemo(() => radarState.settings)

    const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true)
        setOffset({
            x: e.clientX - radarState.settings.coords[0],
            y: e.clientY - radarState.settings.coords[1],
        })

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging()) return
        requestAnimationFrame(() => {
            setRadarState('settings', 'coords', [e.clientX - offset().x, e.clientY - offset().y])
        })
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)

        post('radar:saveState', radarState.settings)
    }

    useNuiEvent('radar:updateData', ({ front, back }: {
        front: radarType,
        back: radarType,
    }) => {
        setRadarState('front', front)
        setRadarState('back', back)
    })

    onCleanup(() => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    })

    return <div 
        onMouseDown={handleMouseDown}
        class="select-none absolute font-semibold flex flex-col p-6 pt-5 bg-neutral-950 text-white w-[45vh] h-[20vh] rounded"
        style={{
            top: `${state().coords[1]}px`,
            left: `${state().coords[0]}px`,
            transform: `scale(${state().scale[0]})`,
        }}
    >
        <div class="grid grid-cols-2 gap-3">
            <div class="flex gap-3 items-center h-9">
                <div class="border-yellow-500/60 border-l border-t rounded-tl-sm flex-grow h-4" />
                <p class="text-xs text-center self-start leading-1 text-yellow-400">Fram</p>
                <div class="border-yellow-500/60 border-r border-t rounded-tr-sm flex-grow h-4" />
            </div>
            <div class="flex gap-3 items-center h-9">
                <div class="border-yellow-500/60 border-l border-t rounded-tl-sm flex-grow h-4" />
                <p class="text-xs text-center self-start leading-1 text-yellow-400">Bak</p>
                <div class="border-yellow-500/60 border-r border-t rounded-tr-sm flex-grow h-4" />
            </div>
        </div>
        <div class="grid grid-cols-[1fr_1.2fr_1fr_1.2fr] gap-3 w-full mb-3">
            <div class="relative overflow-hidden rounded-sm bg-black h-[5.5vh] w-full">
                <p class="bg-neutral-800 text-xs py-0.5 text-center">Hastighet</p>
                <p class="text-xl pt-2 font-bold text-center">
                    { Math.floor(radarState.front?.speed || 0) }
                </p>
                <p class="text-[0.7vh] text-neutral-400 absolute right-2 bottom-1">
                    KM/H
                </p>
            </div>
            {
                radarState.front ?
                <div 
                    style={{ 'background-image': `url(images/plates/${radarState.front?.plateId}.png)` }}
                    class="rounded bg-center bg-cover h-[5.5vh] w-full"
                >
                    <p class="text-xl pt-8 text-neutral-800 font-bold text-center">
                        { radarState.front?.plate }
                    </p>
                </div>
                    :
                <div class="relative h-[5.5vh] w-full">
                    <div class="absolute rounded-tl-sm w-5 h-5 top-0 left-0 border-t-2 border-l-2 border-yellow-500/50" />
                    <div class="absolute rounded-bl-sm w-5 h-5 bottom-0 left-0 border-b-2 border-l-2 border-yellow-500/50" />
                    <div class="absolute rounded-tr-sm w-5 h-5 top-0 right-0 border-t-2 border-r-2 border-yellow-500/50" />
                    <div class="absolute rounded-br-sm w-5 h-5 bottom-0 right-0 border-b-2 border-r-2 border-yellow-500/50" />
                    <p class="absolute right-0 left-0 top-0 bottom-0 m-auto w-fit h-fit font-bold text-xl text-yellow-500">REG</p>
                </div>
            }
            <div class="relative overflow-hidden rounded-sm bg-black h-[5.5vh] w-full">
                <p class="bg-neutral-800 text-xs py-0.5 text-center">Hastighet</p>
                <p class="text-xl pt-2 font-bold text-center">
                    { Math.floor(radarState.back?.speed || 0) }
                </p>
                <p class="text-[0.7vh] text-neutral-400 absolute right-2 bottom-1">
                    KM/H
                </p>
            </div>
            {
                radarState.back ?
                <div 
                    style={{ 'background-image': `url(images/plates/${radarState.back?.plateId}.png)` }}
                    class="rounded bg-center bg-cover h-[5.5vh] w-full"
                >
                    <p class="text-xl pt-8 text-neutral-800 font-bold text-center">
                        { radarState.back?.plate }
                    </p>
                </div>
                    :
                <div class="relative h-[5.5vh] w-full">
                    <div class="absolute rounded-tl-sm w-5 h-5 top-0 left-0 border-t-2 border-l-2 border-yellow-500/50" />
                    <div class="absolute rounded-bl-sm w-5 h-5 bottom-0 left-0 border-b-2 border-l-2 border-yellow-500/50" />
                    <div class="absolute rounded-tr-sm w-5 h-5 top-0 right-0 border-t-2 border-r-2 border-yellow-500/50" />
                    <div class="absolute rounded-br-sm w-5 h-5 bottom-0 right-0 border-b-2 border-r-2 border-yellow-500/50" />
                    <p class="absolute right-0 left-0 top-0 bottom-0 m-auto w-fit h-fit font-bold text-xl text-yellow-500">REG</p>
                </div>
            }
        </div>
        <div class="grid grid-cols-2 gap-2 h-full">
            <div class="relative overflow-hidden rounded-sm bg-black w-full">
                {
                    radarState.front ?
                    <>
                        <p 
                            class={
                                cn(
                                    "text-xs py-0.5 text-center", 
                                    (radarState.front.vehicle.wanted ? 'bg-red-500/40' : 'bg-neutral-600' )
                                )
                            }
                        >
                            {radarState.front.vehicle.wanted ? 'Fordon Efterlyst' : 'Info'}
                        </p>
                        <div class="pt-3 px-3 flex flex-col gap-2">
                            <p class="text-sm">
                                Ägare: <span 
                                    class={
                                        cn(
                                            "font-bold px-2 py-0.5 rounded",
                                            (radarState.front.vehicle.ownerWanted ? 'bg-red-700/30' : 'bg-transparent' )
                                        )
                                    }
                                >
                                    { radarState.front.vehicle.owner }
                                </span>
                            </p>
                            <p class="text-sm">
                                Model: 
                                <span 
                                    class="font-bold px-2 py-0.5"
                                >
                                    { radarState.front.vehicle.model }
                                </span>
                            </p>
                            <p class="text-sm">
                                Högsta hastighet: 
                                <span 
                                    class="font-bold px-2 py-0.5"
                                >
                                    { Math.floor(radarState.front.vehicle.maxSpeed || 0) }
                                </span>
                                <span class="italic text-xs text-neutral-400"> KM/H</span>
                            </p>
                        </div>
                    </>
                        :
                    <p 
                        class={
                            cn(
                                "text-xs py-0.5 text-center bg-neutral-600"
                            )
                        }
                    >
                        Info
                    </p>
                }
            </div>
            <div class="relative overflow-hidden rounded-sm bg-black w-full">
                {
                    radarState.back ?
                    <>
                        <p 
                            class={
                                cn(
                                    "text-xs py-0.5 text-center", 
                                    (radarState.back.vehicle.wanted ? 'bg-red-500/40' : 'bg-neutral-600' )
                                )
                            }
                        >
                            {radarState.back.vehicle.wanted ? 'Fordon Efterlyst' : 'Info'}
                        </p>
                        <div class="pt-3 px-3 flex flex-col gap-2">
                            <p class="text-sm">
                                Ägare: <span 
                                    class={
                                        cn(
                                            "font-bold px-2 py-0.5 rounded",
                                            (radarState.back.vehicle.ownerWanted ? 'bg-red-700/30' : 'bg-transparent' )
                                        )
                                    }
                                >
                                    { radarState.back.vehicle.owner }
                                </span>
                            </p>
                            <p class="text-sm">
                                Model: 
                                <span 
                                    class="font-bold px-2 py-0.5"
                                >
                                    { radarState.back.vehicle.model }
                                </span>
                            </p>
                            <p class="text-sm">
                                Högsta hastighet: 
                                <span 
                                    class="font-bold px-2 py-0.5"
                                >
                                    { Math.floor(radarState.back.vehicle.maxSpeed) }
                                </span>
                                <span class="italic text-xs text-neutral-400"> KM/H</span>
                            </p>
                        </div>
                    </>
                        :
                    <p 
                        class={
                            cn(
                                "text-xs py-0.5 text-center bg-neutral-600"
                            )
                        }
                    >
                        Info
                    </p>
                }
            </div>
        </div>
    </div>
}

export default PoliceRadar
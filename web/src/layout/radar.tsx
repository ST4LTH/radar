import { Show, type Component } from 'solid-js';
import PoliceRadar from '../components/radar/policeRadar';
import RadarSettings from '../components/radar/radarSettings';
import { radarState, setRadarState, settingsType } from '@/store/radar';
import { useNuiEvent } from '@/hooks/useNuiEvent';

const Radar: Component = () => {
    useNuiEvent('radar:toggleRadar', (toggle: boolean) => {
        setRadarState('open', toggle)
    })

    useNuiEvent('radar:toggleSettings', (toggle: boolean) => {
        setRadarState('menu', toggle)
    })

    useNuiEvent('radar:setSettings', (data: settingsType) => {
        setRadarState('settings', data)
    })

    return <>
        <Show when={radarState.menu}>
            <RadarSettings />
        </Show>
        <Show when={radarState.open}>
            <PoliceRadar />
        </Show>
    </>
}

export default Radar
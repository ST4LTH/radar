local open = false
local lastFront = nil
local lastBack = nil
local vehicleCache = {}

local getVehicleData = function (vehicle)
    local plate = GetVehicleNumberPlateText(vehicle)
    local plateId = GetVehicleNumberPlateTextIndex(vehicle)
    local speed = GetEntitySpeed(vehicle) * 3.6

    if not vehicleCache[plate] then
        print(plate)
        local data = lib.callback.await('radar:getVehicleData', false, plate)
        if data then
            print('data received')
            vehicleCache[plate] = data
        end
    end

    if vehicleCache[plate].maxSpeed and speed > vehicleCache[plate].maxSpeed then
        vehicleCache[plate].maxSpeed = speed
    end
--[[ 
    vehicleData = {
        owner = vehicleCache[plate].owner,
        ownerWanted = false,
        maxSpeed = vehicleCache[plate].maxSpeed or 0,
        wanted = true,
        model = GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)),
    }
 ]]

    return {
        speed = speed,
        plateId = plateId,
        plate = plate,
        vehicle = vehicleCache[plate]
    }
end

local radar = function ()
    local visible = false

    while open do
        local waitThread = 200
        local playerPed = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(playerPed, false)

        if vehicle == 0 and visible then
            visible = false
            SendNUIMessage({
                type = 'radar:toggleRadar',
                data = false
            })
        elseif vehicle ~= 0 and not visible then
            visible = true
            SendNUIMessage({
                type = 'radar:toggleRadar',
                data = true
            })
        end

        if not visible then
            waitThread = 1000
            goto continue
        end

        if vehicle then
            local front = getVehicleInDirection('front')
            if front ~= nil then
                lastFront = getVehicleData(front)
            end

            local back = getVehicleInDirection('back')
            if back ~= nil then
                lastBack = getVehicleData(back)
            end

            if (front or back) then
                SendNUIMessage({
                    type = 'radar:updateData',
                    data = {
                        front = lastFront,
                        back = lastBack
                    }
                })
            end
        end

        ::continue::

        Wait(waitThread)
    end
end

local toggleSettings = function (toggle)
    SendNUIMessage({
        type = 'radar:toggleSettings',
        data = toggle
    })

    if toggle then
        SetNuiFocus(true, true)
    end
end

local toggleRadar = function (toggle)
    open = toggle

    SendNUIMessage({
        type = 'radar:toggleRadar',
        data = toggle
    })
    
    if toggle then
        lastFront = nil
        lastBack = nil

        SendNUIMessage({
            type = 'radar:updateData',
            data = {
                front = lastFront,
                back = lastBack
            }
        })

        CreateThread(radar)
        return
    end
end

RegisterNetEvent('radar:setVehicleWanted', function(plate, toggle)
    if vehicleCache[plate] then
        vehicleCache[plate].wanted = toggle
    end
end)

RegisterNuiCallback('radar:saveState', function (data, cb)
    setKvp('radarSettings', data)

    cb({})
end)

RegisterNuiCallback('radar:resetState', function (_, cb)
    local data = {
        coords = {0,0},
        scale = {1.0},
        speedAlarm = {0.0}
    }

    setKvp('radarSettings', data)

    cb(data)
end)

RegisterNuiCallback('radar:closeMenu', function (data, cb)
    SetNuiFocus(false, false)

    cb({})
end)

RegisterCommand('radarConfig', function ()
    toggleSettings(true)
end, false) RegisterKeyMapping('radarConfig', 'Radar: Inställningar', 'keyboard', 'F6')

RegisterCommand('radar', function ()
    toggleRadar(not open)

    if open then
        SendNUIMessage({
            type = 'radar:setSettings',
            data = getDecodedKvp('radarSettings')
        })
    end
end, false) RegisterKeyMapping('radar', 'Radar: Toggle', 'keyboard', 'F5')

RegisterCommand('radarSelect', function ()
    local front = getVehicleInDirection('front')
    if not front then return end

    local plate = GetVehicleNumberPlateText(front)
    if not vehicleCache[plate] then return end

    vehicleCache[plate].wanted = not vehicleCache[plate].wanted
    lib.callback('radar:toggleVehicleWanted', false, function() end, plate, vehicleCache[plate].wanted)
end, false) RegisterKeyMapping('radarSelect', 'Radar: Markera fordon', 'keyboard', 'F4')
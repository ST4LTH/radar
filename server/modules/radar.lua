local Vehicles = {}

local getVehicleData = function (plate)
    Vehicles[plate] = {
        owner = randomName(),
        ownerWanted = false,
        maxSpeed = 0,
        wanted = false,
        model = "Karin Sultan",
    }

    return Vehicles[plate]
end

local setVehicleWanted = function (plate, toggle)
    if not Vehicles[plate] then
        Vehicles[plate] = getVehicleData(plate)
    end

    Vehicles[plate].wanted = toggle

    TriggerClientEvent('radar:setVehicleWanted', -1, plate, toggle)
end exports('setVehicleWanted', setVehicleWanted)

lib.callback.register('radar:getVehicleData', function(source, plate)
    if Vehicles[plate] then
        return Vehicles[plate]
    end

    return getVehicleData(plate)
end)

lib.callback.register('radar:toggleVehicleWanted', function(_, plate, toggle)
    return setVehicleWanted(plate, toggle)
end)
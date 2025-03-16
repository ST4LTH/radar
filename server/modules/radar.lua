local Vehicles = {}

local getVehicleData = function (plate)
    Vehicles[plate] = {
        owner = randomName(),
        ownerWanted = true,
        maxSpeed = 0,
        wanted = false,
        model = "Karin Sultan",
    }

    return Vehicles[plate]
end

lib.callback.register('radar:getVehicleData', function(source, plate)
    if Vehicles[plate] then
        return Vehicles[plate]
    end

    return getVehicleData(plate)
end)
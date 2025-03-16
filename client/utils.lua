local heightOffset = 0.2
local angles = {
    0,
    3.0,
    -3.0
}

getVehicleInDirection = function(direction)
    local vehicle = GetVehiclePedIsIn(PlayerPedId(), false) 

    if not vehicle then
        return nil
    end

    for i = 1, #angles do
        local coords = GetEntityCoords(vehicle)
        local offset = GetOffsetFromEntityInWorldCoords(vehicle, angles[i], direction == 'front' and 20.0 or -20.0, 0.0)
    
        local rayHandle = StartShapeTestRay(coords.x, coords.y, coords.z+heightOffset, offset.x, offset.y, offset.z+heightOffset, 10, vehicle, 0)
        local _, hit, _, _, detectedVehicle = GetShapeTestResult(rayHandle)

        DrawLine(coords.x, coords.y, coords.z+heightOffset, offset.x, offset.y, offset.z+heightOffset, 255, 255, 255, 255)
    
        if hit == 1 and IsEntityAVehicle(detectedVehicle) then
            return detectedVehicle
        end
    end

    return nil
end

getDecodedKvp = function (string)
    local data = {
        coords = {0,0},
        scale = 1.0
    }

    local resourceKvp = GetResourceKvpString(string)
    if resourceKvp then
        data = json.decode(resourceKvp)
    end

    return data
end

setKvp = function (string, data)
    if not data then return end

    SetResourceKvp(string, json.encode(data))
end
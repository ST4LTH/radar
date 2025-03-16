
randomName = function ()
    local fnIndex = math.random(1, #Config.name)
    local enIndex = math.random(1, #Config.lastName)
    
    return Config.name[fnIndex] .. " " .. Config.lastName[enIndex]
end

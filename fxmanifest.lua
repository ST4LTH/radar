fx_version 'cerulean'
game 'gta5'
lua54 'yes'

auther 'Edvin'
description 'Radar'

client_scripts {
    'client/*.lua',
    'client/modules/*.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua',
    'server/modules/*.lua',
}

shared_scripts {
    'config.lua',
    '@ox_lib/init.lua'
}

ui_page 'web/build/index.html'
--ui_page 'http://localhost:5173/' -- Dev

files {
    'web/build/index.html',
    'web/build/**/*',
}

# node-red-contrib-milight

A Node Red nodes to control White and Color Milight LED bulbs and OEM equivalents such as Rocket LED, Limitless LED Applamp, Easybulb, s'luce, iLight, iBulb, and Kreuzer. 

## Install

```npm i node-red-contrib-milight```

## Example Flow

    [{"id":"6fa076.ff905f88","type":"MiLight","z":"a83f67b9.57c098","name":"White Bulb","bulbtype":"white","zone":"0","ip":"255.255.255.255","broadcast":true,"x":546.5,"y":293,"wires":[]},{"id":"b848c10d.47b74","type":"inject","z":"a83f67b9.57c098","name":"","topic":"","payload":"off","payloadType":"str","repeat":"","crontab":"","once":false,"x":286.5,"y":266,"wires":[["6fa076.ff905f88"]]},{"id":"402a11fe.bfd5f","type":"inject","z":"a83f67b9.57c098","name":"","topic":"","payload":"on","payloadType":"str","repeat":"","crontab":"","once":false,"x":286,"y":316,"wires":[["6fa076.ff905f88"]]},{"id":"2aec605d.d513a","type":"MiLight","z":"a83f67b9.57c098","name":"Color Bulb","bulbtype":"rgbw","zone":"0","ip":"255.255.255.255","broadcast":true,"x":547,"y":481,"wires":[]},{"id":"56e161f6.a91ea","type":"inject","z":"a83f67b9.57c098","name":"","topic":"","payload":"off","payloadType":"str","repeat":"","crontab":"","once":false,"x":286,"y":540,"wires":[["2aec605d.d513a"]]},{"id":"981895f1.67e768","type":"inject","z":"a83f67b9.57c098","name":"","topic":"","payload":"on","payloadType":"str","repeat":"","crontab":"","once":false,"x":285.5,"y":589,"wires":[["2aec605d.d513a"]]},{"id":"33d27595.cc2d8a","type":"inject","z":"a83f67b9.57c098","name":"","topic":"","payload":"disco","payloadType":"str","repeat":"","crontab":"","once":false,"x":286,"y":493,"wires":[["2aec605d.d513a"]]},{"id":"1ffd648b.e0029b","type":"inject","z":"a83f67b9.57c098","name":"","topic":"","payload":"200","payloadType":"num","repeat":"","crontab":"","once":false,"x":285,"y":445,"wires":[["2aec605d.d513a"]]},{"id":"569d15af.a962ec","type":"inject","z":"a83f67b9.57c098","name":"","topic":"","payload":"white","payloadType":"str","repeat":"","crontab":"","once":false,"x":284,"y":395,"wires":[["2aec605d.d513a"]]}]


Forked from https://github.com/stephenkeep/node-red-contrib-milight

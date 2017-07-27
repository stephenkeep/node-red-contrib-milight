# node-red-contrib-milight

A Node Red nodes to control all bulb types Milight LED bulbs and OEM equivalents such as Rocket LED, Limitless LED Applamp, Easybulb, s'luce, iLight, iBulb, and Kreuzer. 

## Install

```npm i node-red-contrib-milight```

## Example Flow

    [{"id":"b5ab74d6.08edc8","type":"MiLight","z":"44cc4fb7.965b3","name":"White Bulb / Legacy Bridge","bridgetype":"legacy","bulbtype":"white","zone":1,"ip":"255.255.255.255","broadcast":true,"x":1035.765625,"y":297,"wires":[]},{"id":"51aa22c0.74d05c","type":"MiLight","z":"44cc4fb7.965b3","name":"Color Bulb / Legacy Bridge","bridgetype":"legacy","bulbtype":"rgbw","zone":1,"ip":"255.255.255.255","broadcast":true,"x":1036.7656211853027,"y":619.0000314712524,"wires":[]},{"id":"26ce02ea.cd2e6e","type":"inject","z":"44cc4fb7.965b3","name":"Off","topic":"","payload":"off","payloadType":"str","repeat":"","crontab":"","once":false,"x":534.7656402587891,"y":553.0000228881836,"wires":[["51aa22c0.74d05c"]]},{"id":"17bef0b.fe9ce0f","type":"inject","z":"44cc4fb7.965b3","name":"On","topic":"","payload":"on","payloadType":"str","repeat":"","crontab":"","once":false,"x":534.7656555175781,"y":607.0000152587891,"wires":[["51aa22c0.74d05c"]]},{"id":"44e9d122.6a83b","type":"inject","z":"44cc4fb7.965b3","name":"white","topic":"","payload":"white","payloadType":"str","repeat":"","crontab":"","once":false,"x":536.765625,"y":662.9999933242798,"wires":[["51aa22c0.74d05c"]]},{"id":"b477791.b31d088","type":"inject","z":"44cc4fb7.965b3","name":"Brightness 10%","topic":"","payload":"10","payloadType":"num","repeat":"","crontab":"","once":false,"x":568.765625,"y":732,"wires":[["e01cd3d0.06b27"]]},{"id":"e01cd3d0.06b27","type":"function","z":"44cc4fb7.965b3","name":"","func":"msg.command = 'brightness';\nreturn msg;","outputs":1,"noerr":0,"x":741.7656478881836,"y":757.0000553131104,"wires":[["51aa22c0.74d05c"]]},{"id":"865a0a9b.be0848","type":"inject","z":"44cc4fb7.965b3","name":"Color","topic":"","payload":"20","payloadType":"num","repeat":"","crontab":"","once":false,"x":536.7656307220459,"y":843.0000419616699,"wires":[["f578b6a1.3d7948"]]},{"id":"f578b6a1.3d7948","type":"function","z":"44cc4fb7.965b3","name":"","func":"msg.command = 'color';\nreturn msg;","outputs":1,"noerr":0,"x":738.7657089233398,"y":845.000057220459,"wires":[["51aa22c0.74d05c"]]},{"id":"2cc2747e.452f4c","type":"inject","z":"44cc4fb7.965b3","name":"On","topic":"","payload":"on","payloadType":"str","repeat":"","crontab":"","once":false,"x":540.7656326293945,"y":168.00000381469727,"wires":[["b5ab74d6.08edc8"]]},{"id":"c8b4fa4d.e53078","type":"inject","z":"44cc4fb7.965b3","name":"Off","topic":"","payload":"off","payloadType":"str","repeat":"","crontab":"","once":false,"x":540.2656383514404,"y":215.00000190734863,"wires":[["b5ab74d6.08edc8"]]},{"id":"9fb07ff8.51bba","type":"inject","z":"44cc4fb7.965b3","name":"Warmer","topic":"","payload":"warmer","payloadType":"str","repeat":"","crontab":"","once":false,"x":538.7656211853027,"y":258.00000381469727,"wires":[["b5ab74d6.08edc8"]]},{"id":"38e7a6b0.c484ca","type":"inject","z":"44cc4fb7.965b3","name":"Cooler","topic":"","payload":"cooler","payloadType":"str","repeat":"","crontab":"","once":false,"x":542.2656402587891,"y":303.00001525878906,"wires":[["b5ab74d6.08edc8"]]},{"id":"287ae328.5c945c","type":"inject","z":"44cc4fb7.965b3","name":"Bright Up","topic":"","payload":"bright_up","payloadType":"str","repeat":"","crontab":"","once":false,"x":548.7656555175781,"y":346.00002670288086,"wires":[["b5ab74d6.08edc8"]]},{"id":"268eff9f.0e175","type":"inject","z":"44cc4fb7.965b3","name":"Bright Down","topic":"","payload":"bright_down","payloadType":"str","repeat":"","crontab":"","once":false,"x":557.7656326293945,"y":392.99999809265137,"wires":[["b5ab74d6.08edc8"]]},{"id":"7f19fef2.a20dc","type":"inject","z":"44cc4fb7.965b3","name":"Bright Max","topic":"","payload":"bright_max","payloadType":"str","repeat":"","crontab":"","once":false,"x":547.7656383514404,"y":438.0000286102295,"wires":[["b5ab74d6.08edc8"]]},{"id":"afe72b66.8856e8","type":"inject","z":"44cc4fb7.965b3","name":"Night","topic":"","payload":"night","payloadType":"str","repeat":"","crontab":"","once":false,"x":539.7656536102295,"y":485.00002098083496,"wires":[["b5ab74d6.08edc8"]]},{"id":"1c0123a9.9f827c","type":"inject","z":"44cc4fb7.965b3","name":"Brightness 100%","topic":"","payload":"100","payloadType":"num","repeat":"","crontab":"","once":false,"x":568.7656555175781,"y":778.750057220459,"wires":[["e01cd3d0.06b27"]]}]

The following bulb types are supported:
 - WW/CW, aka. "white"
 - RGB WW, aka. "color"
 - RGB WW/CW, aka. "full color" (iBox1/iBox2 bridges)
 - RGB CW bridge light (iBox1 bridge) 

To control the bulb pass the command to `msg.payload` as follows:
   
 - 'on' - Turns the bulb on (all bulb types)
 - 'off' - Turns the bulb off (all bulb types)
 - 'night' - Turn the night mode (all bulb types)
 - 'white' - Sets a color bulb to white (color bulb types only)
 - 'disco' - Cycles a bulb through all the colors (color bulb types, only)
 - 'mode' - Cycles through the effect modes (color bulb types only)
 - 'speed_up' - Increase the speed of effect mode (color bulb types, only)
 - 'speed_down' - Decrease the speed of effect mode (color bulb types, only)
 - 'bright_up' - Increase the brightness of the bulb (white bulb, only)
 - 'bright_down' - Decrease the brightness of the bulb (white bulb, only)
 - 'cooler' - Make the bulb cooler (white bulb, only)
 - 'warmer' - Make the bulb warmer (white bulb, only)
 - 'bright_max' - Make the bulb brightness maximum (white bulb, only)
 - *Number* - If a number is provided the brightness, color, or saturation value of the color bulb can be controlled
    by assigning a command verb to `msg.command` or `msg.topic` as follows
     - 'brightness' - Set brightness, `msg.payload` must contain a number in 0 - 100
     - 'color' - Set color, `msg.payload` must contain a number in 0 - 255
     - 'saturation' - Set color saturation (full color bulb type, only), `msg.payload` must contain a number in 0 - 100
 - *Color String* - If a color string, e.g. "blue" or "rgb(255, 128, 128)" is provided and the command verb "rgb" is 
    assigned to `msg.command` or `msg.topic` the RGB color can be set. Note, however, for "color" and "bridge" type
    bulbs the Milight hue will be set, only. For "full color" bulbs the saturation and brightness will be also set.

